"use server";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createStreamableValue } from "ai/rsc";
import { generateEmbedding } from "../gemini";
import { db } from "~/server/db";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askQuestion = async (question: string, projectId: string) => {
  const stream = createStreamableValue();

  try {
    const queryVector = await generateEmbedding(question);
    const vectorQuery = `${queryVector.join(",")}`;

    const result =
      (await db.$queryRaw`
        SELECT "fileName", "sourceCode", "summary",
               1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
        FROM "SourceCodeEmbedding"
        WHERE (1 - ("summaryEmbedding" <=> ${vectorQuery}::vector)) > 0.5
          AND "projectId" = ${projectId}
        ORDER BY similarity DESC
        LIMIT 10
      `) as { fileName: string; sourceCode: string; summary: string }[];

    let context = "";
    for (const doc of result) {
      context += `source: ${doc.fileName}\ncode content:\n${doc.sourceCode}\nsummary of file:\n${doc.summary}\n\n`;
    }

    const textStream = await streamText({
      model: google("gemini-1.5-flash"),
      prompt: `
        You are an expert software engineer assisting developers with understanding a codebase.
        Use the provided source code and its summary to generate an accurate and well-structured response.
        
        **Context from the Codebase:**  
        ${context}
        
        **User's Question:**  
        ${question}
        
        **Instructions:**  
        - Answer based only on the provided context.  
        - If the context does not contain relevant information, say: "I couldn't find relevant details in the provided code."  
        - Keep explanations concise and clear.  
        - Provide code snippets when necessary.  

        Respond accurately:
      `,
    });

    (async () => {
        for await (const delta of textStream.textStream) {
          stream.update(delta);
        }
        stream.done();
      })();
  
      return {
        output: stream.value,
        fileReferences: result
      };
      
    } catch (error) {
      stream.error(error);
      return {
        output: stream.value,
        fileReferences: []
      };
    }
  };