import {GoogleGenerativeAI} from "@google/generative-ai"

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

