import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import useProject from '~/hooks/use-project';
import { cn } from '~/lib/utils';
import { api } from '~/trpc/react';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

const CommitLog = () => {
  const { projectId, project } = useProject();
  const { data: commits } = api.project.getCommits.useQuery({ projectId });
  const [expandedCommits, setExpandedCommits] = useState<Set<string>>(new Set());

  const toggleExpand = (commitId: string) => {
    setExpandedCommits(prev => {
      const next = new Set(prev);
      if (next.has(commitId)) {
        next.delete(commitId);
      } else {
        next.add(commitId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {commits?.map((commit, commitIdx) => {
        const isExpanded = expandedCommits.has(commit.id);
        const shouldTruncate = commit.summary.length > 200;

        return (
          <div key={commit.id} className="relative flex gap-x-4">
            <div className={cn(
              commitIdx === commits.length - 1 ? "h-6" : "-bottom-6",
              'absolute left-0 top-0 flex w-6 justify-center'
            )}>
              <div className="w-px translate-x-1 bg-gray-200" />
            </div>

            <img 
              src={commit.commitAuthorAvatar} 
              alt="commit author" 
              className="relative mt-4 size-8 flex-none rounded-full bg-gray-50" 
            />

            <Card className="flex-auto p-4">
              <div className="flex items-start justify-between">
                <div>
                  <Link
                    target="_blank"
                    href={`${project?.githubUrl}/commit/${commit.commitHash}`}
                    className="hover:underline"
                  >
                    <span className="font-medium text-primary">
                      {commit.commitAuthorName}
                    </span>
                  </Link>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-sm text-muted-foreground ml-2">
                        committed
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Commit hash: {commit.commitHash}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <ExternalLink className="size-4 text-muted-foreground" />
              </div>

              <h3 className="mt-2 font-semibold">
                {commit.commitMessage}
              </h3>

              <div className="mt-2 text-sm text-muted-foreground">
                {shouldTruncate && !isExpanded ? (
                  <>
                    {commit.summary.slice(0, 200)}...
                    <Button 
                      variant="link"
                      className="h-auto p-0 ml-2"
                      onClick={() => toggleExpand(commit.id)}
                    >
                      Read more
                    </Button>
                  </>
                ) : (
                  <>
                    {commit.summary}
                    {shouldTruncate && (
                      <Button
                        variant="link"
                        className="h-auto p-0 ml-2"
                        onClick={() => toggleExpand(commit.id)}
                      >
                        Show less
                      </Button>
                    )}
                  </>
                )}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default CommitLog;