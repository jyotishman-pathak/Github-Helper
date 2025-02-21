import {GoogleGenerativeAI} from "@google/generative-ai"
import {Document} from "@langchain/core/documents"
const genAI = new GoogleGenerativeAI(`AIzaSyDLbOVJLpH4qacEf8mueyIk4_l5prU-rvM`)

const model = genAI.getGenerativeModel({
model : "gemini-1.5-flash"

})



export const AisummarizeCommit = async (diff: string) => {
    const response = await model.generateContent([
        `You are a senior developer analyzing git commit diffs. 
        Summarize changes CONCISELY with:
        - Main purpose (1 sentence)
        - Key changes (bullet points)
        - Affected areas
        - Notable patterns/risks
        Use developer-friendly terms but avoid excessive technical jargon.
        
        Here is the diff: \n\n${diff}`
    ]);

    return response.response.text();
};



export async function summariseCode(doc: Document){
    console.log("getting summary for", doc.metadata.source);
try {
    const code = doc.pageContent.slice(0,10000)
    const response = await model.generateContent([
        `You are a Senior Software Engineer specializing in onboarding junior developers onto projects. 
    
        You are currently guiding a junior developer and explaining the purpose of the ${doc.metadata.source} file.
    
        Below is the code from this file:
        ${code}
    
        Provide a concise summary (no more than 100 words) explaining the purpose and functionality of the code above.`
    ]);
    
    return response.response.text()
    
} catch (error) {
    return ""
}



   
}

export async function generateEmbedding (summary:string){
    const model = genAI.getGenerativeModel({
        model:"text-embedding-004"
    })
    const result = await model.embedContent(summary)
    const embedding = result.embedding
    return embedding.values
}

