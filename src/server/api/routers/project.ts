import { z } from "zod"
import {createTRPCRouter, protectedProcedure, publicProcedure} from "../trpc"
import { PollCommits } from "~/lib/github"
import { indexGihubRepo } from "~/lib/github-loader"



export const porjectRouter = createTRPCRouter({
    createProject:protectedProcedure.input(
        z.object({
            name : z.string(),
            githubUrl: z.string(),
            githubToken : z.string().optional()
        })
    ).mutation(async ({ctx,input})=>{
      const project = await ctx.db.project.create({
        data: {
            name : input.name,
            githubUrl:input.githubUrl,
            
            userToProject: {
                create:{
                    userId : ctx.user.userId!
                }
            }

        }
      })
      await indexGihubRepo(project.id, input.githubUrl, input.githubToken)
      await PollCommits(project.id)
      return project
    }),

    getProjects: protectedProcedure.query(async ({ctx})=>{
        return await ctx.db.project.findMany({
            where : {
                userToProject : {
                    some: {
                        userId : ctx.user.userId!
                    }
                },
                deletedAt: null
            }
        })
    }),

    getCommits : protectedProcedure.input(z.object({
        projectId : z.string()
    })).query(async ({ctx , input})=>{
       
       PollCommits(input.projectId).then().catch(console.error)
       
        return await ctx.db.aiCommit.findMany({
            where:{projectId: input.projectId}
        })
    })
})