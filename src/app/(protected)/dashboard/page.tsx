"use client";

import React from 'react'
import { useUser } from "@clerk/nextjs";
import { Card } from '~/components/ui/card';
import useProject from '~/hooks/use-project';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import CommitLog from '~/components/app-sidebar/CommitLog';

const DashboardPage = () => {
  const { user } = useUser();
  const { project } = useProject();

  return (
    <div className="p-4">
      {/* Top Section */}
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

        <div className="flex items-center gap-4">
          {/* Team members */}
          {/* Invite */}
          {/* Archive button */}
        </div>
      </div>

      {/* Two Column Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Ask Question Card */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Ask Question</h3>
          {/* Add question form/content here */}
        </Card>

        {/* Meeting Card */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Meetings</h3>
          {/* Add meeting content here */}
        </Card>
      </div>

      {/* Commit Log at Bottom */}
      <div className="mt-8">
        <CommitLog />
      </div>
    </div>
  )
}

export default DashboardPage;