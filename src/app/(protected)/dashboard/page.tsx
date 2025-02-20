"use client";

import React from 'react'
import { useUser } from "@clerk/nextjs";
import { Card } from '~/components/ui/card';
import useProject from '~/hooks/use-project';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
const DashboardPage = () => {
  
  const {user} = useUser();

  const {project} = useProject()

  return (
<div className="">
<div className="flex items-center justify-between flex-wrap gap-y-4">
  <div className="w-fit rounded-md bg-primary px-4 py-3">
    <div className="flex items-center">
      <Github className="size-5 text-white" />
      <div className="ml-2">
        <p className="text-sm font-medium text-white">
          This project is Linked to{" "}
          <Link
            href={project?.githubUrl ?? " "}
            className="inline-flex items-center text-white/80 hover:underline"
          >
            {project?.githubUrl ?? "Unknown Repo"}
            <ExternalLink className='ml-1 size-4'/>
          </Link>
        </p>
      </div>
    </div>
  </div>



<div className="h-4"></div>


<div className="flex items-center gap-4">
  Team members
  Invite
  arachive button
</div>


<div className="mt-4">
  <div className="grid grid-cols-1 sm:grid-cols-5">
    Ask question
    meetingg card
  </div>
</div>


<div className="mt-8">
  <div className="">
    commit log
  </div>
</div>


</div>
</div>

    
  )
}

export default DashboardPage;