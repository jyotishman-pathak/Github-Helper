import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github"
import {Document} from "@langchain/core/documents"
import { generateEmbedding, summariseCode } from "./gemini"
import { db } from "~/server/db"

export const loadGithubRepo = async (githubUrl :string, githubToken? :string) =>{
const loader = new GithubRepoLoader(githubUrl,{
    accessToken: githubToken || "",
    branch : "main",
    ignoreFiles: ['package-lock.json','yarn.lock', 'pnpm-lock.yaml' , 'bun.lockb'],
    recursive : true,
    unknown:"warn",
    maxConcurrency: 5
})
const docs = await loader.load()
return docs
}



export const indexGihubRepo = async (projectId: string, githubUrl : string , githubToken? : string)=>{
    const docs = await loadGithubRepo(githubUrl,githubToken)
    const allEmbedings = await generateEmbedings(docs)
    await Promise.allSettled(allEmbedings.map(async (embedding , index)=>{
        console.log(`PROCESSING ${index} of ${allEmbedings.length}`)

        if(!embedding)return

        const sourceCodeEmbeding = await db.sourceCodeEmbedding.create({
            data : {
                summary :embedding.summary,
                sourceCode:embedding.sourceCode,
                fileName:embedding.fileName,
                projectId
            }
        })

        await db.$executeRaw `
        UPDATE "SourceCodeEmbedding"
        SET "summaryEmbedding" = ${embedding.embedding}::vector
        WHERE "id" = ${sourceCodeEmbeding.id}
        `
        
    }))
}

const generateEmbedings = async  (docs: Document[])=>{
    return await Promise.all(docs.map(async doc=> {
        const summary = await summariseCode(doc)
        const embedding = await generateEmbedding(summary)
return {
    summary, 
    embedding,
    sourceCode : JSON.parse(JSON.stringify(doc.pageContent)),
    fileName : doc.metadata.source
}
    }))

}