import Image from 'next/image';
import React from 'react'
import useProject from '~/hooks/use-project';
import { cn } from '~/lib/utils';
import { api } from '~/trpc/react';

const CommitLog = ( ) => {
    const {projectId} = useProject()
    const {data: commits} = api.project.getCommits.useQuery({projectId})
  return (
  <>
  <ul className='space-y-6'>
    {commits?.map((commit,commitIdx)=>{
        return <li key={commit.id} className='relative flex gap-x-4'>
            <div className={cn(
                commitIdx === commits.length -1 ? "h-8 " : "-bottom-8",
                'absolute left-0 top-0 flex m-6 justify-center'
            )}>

<div className="w-px translate-x-1 bg-gray-200"></div>

<>
<img src={commit.commitAuthorAvatar } alt='commitavatar' className='relative mt-4 size-8 flex-none rounded-full' />
</>
            </div>
        </li>
    })}
  </ul>
  
  </>
  )
}

export default CommitLog