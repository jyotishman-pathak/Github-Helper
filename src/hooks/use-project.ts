import React from 'react'
import { api } from '~/trpc/react'
import {useLocalStorage} from "usehooks-ts"
export default function () {
const {data : projects} = api.project.getProjects.useQuery()
const [projectId , setProjectId] = useLocalStorage("pr-Id", " ")

const project = projects?.find(project => project.id === projectId)


return {
 projects,
 project,
 projectId,
setProjectId
}
}
