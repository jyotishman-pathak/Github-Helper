import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AppSideBar from '~/components/app-sidebar/app-sidebar'
import { ModeToggle } from '~/components/theme/mode-toggle'
import { Card } from '~/components/ui/card'
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSideBar />
        <div className="mt-3">
        <SidebarTrigger />
        </div>
       
        <main className="flex-1 flex flex-col gap-4 p-4 ml-0 transition-[margin] duration-300 lg:ml-20">
       
          <div className="w-full">
            <Card className="w-full flex items-center justify-between p-4 rounded-lg shadow-sm">
              <div className="font-medium text-muted-foreground">Dashboard Overview</div>
              <div className="flex items-center gap-3">
                <ModeToggle />
                <UserButton  />
              </div>
            </Card>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-background rounded-lg border p-6 shadow-sm overflow-y-auto">
          
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default SideBarLayout