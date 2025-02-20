import {Octokit} from "octokit"
import { db } from "~/server/db"
import axios from "axios"
import { AisummarizeCommit } from "./gemini"
export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})


const githubUrl = "https://github.com/jyotishman-pathak/Github-Helper"

type Response  = {
    commitHash: string,
    commitMessage :string,
    commitAuthorName : string,
    commitAuthorAvatar : string,
    commitDate : string,
}



export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
   const splitted =githubUrl.split("/")
   
    if (!splitted) {
        throw new Error("Invalid GitHub URL");
    }

    

    const { data } = await octokit.rest.repos.listCommits({
        owner : splitted[3]!,
        repo:splitted[4]!
    });




const sortedCommits = data.sort((a:any, b:any)=> new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()) as any []

return sortedCommits.slice(0,15).map((commit:any)=>({
    commitHash : commit.sha as string,
    commitMessage : commit.commit.message ?? "" ,
    commitAuthorAvatar : commit.author?.avatar_url ?? "",
    commitAuthorName : commit?.commit?.author?.name ?? " ",
    commitDate : commit?.commit.author.date ?? "",
})) 


}

export const PollCommits  = async (projectId : string) => {
const {project , githubUrl} = await fetchProjectGithubUrl(projectId)
const commitHashes = await getCommitHashes(githubUrl)
const unProcessedCommits = await filterUnprocessedCommits(projectId, commitHashes)
const SummaryResponses = await Promise.allSettled(unProcessedCommits.map(commit =>{
    return summarizeCommit(githubUrl, commit.commitHash)
}))

const summaries = SummaryResponses.map((response)=> {
   if(response.status === "fulfilled"){
    return response.value as string
   }
   return ""
})

const commits = await db.aiCommit.createMany({
    data: summaries.map((summary, index)=>{
        return {
            projectId: projectId,
            commitHash:unProcessedCommits[index]!.commitHash,

            commitMessage:unProcessedCommits[index]!.commitMessage,
            commitAuthorName:unProcessedCommits[index]!.commitAuthorName,
            commitAuthorAvatar:unProcessedCommits[index]!.commitAuthorAvatar,
            commitDate : unProcessedCommits[index]!.commitDate,
            summary 
        }
    })
})
console.log(commits)
console.log(unProcessedCommits)
return unProcessedCommits 
}



export async function summarizeCommit(githubUrl: string, commitHash: string){
const {data} = await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
    headers : {
        Accept: `application/vnd.github.v3.diff`
    }
})

return await AisummarizeCommit(data) || " "

}




async function fetchProjectGithubUrl(projectId: string) {
    console.log("Fetching GitHub URL for project ID:", projectId);

    const project = await db.project.findUnique({
        where: { id: projectId },
        select: { githubUrl: true, deletedAt: true },
    });

    console.log("Database query result:", project);

    if (!project) {
        throw new Error("Project not found");
    }
    if (project.deletedAt) {
        throw new Error("Project has been deleted");
    }
    if (!project.githubUrl) {
        throw new Error("Project has no GitHub URL");
    }

    return { project, githubUrl: project.githubUrl };
}

async function filterUnprocessedCommits(projectId: string, commitHashes : Response[]){
    const processedCommit = await db.aiCommit.findMany({
        where : {projectId}
    })

    const unProcessedCommits = commitHashes.filter((commit)=> !processedCommit.some((processedCommit)=> processedCommit.commitHash === commit.commitHash))

    return unProcessedCommits
}


// PollCommits('cm7dmna750000nqv1bgpbob6r').then(console.log)