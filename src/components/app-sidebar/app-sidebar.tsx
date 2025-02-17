"use client"

import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar'
import { Bot, CreditCard, LayoutDashboard, Presentation } from 'lucide-react';
import Link from 'next/link';
import { cn } from '~/lib/utils';
import { usePathname } from 'next/navigation';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard, 
  },
  {
    title: 'Q&A',
    url: '/qa',
    icon: Bot,
  },
  {
    title: 'Meeting',
    url: '/meeting',
    icon: Presentation,
  },
  {
    title: 'Billing',
    url: '/billing',
    icon: CreditCard, 
  },
];
const projects = [
  { name: "DeLoan" },
  { name: "Stream-Savvy" },
  { name: "Almatrack" },

];


const AppSideBar = () => {
  const pathname = usePathname()
const {open } = useSidebar()
  return (
    
   
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarHeader className="px-4 h-16 flex items-center border-b">

       {open ?
        <h1 className="text-xl font-semibold">Diago<span className='text-primary'>Ai</span></h1>
      :
      <h1 className="text-xl font-semibold">D<span className='text-primary'>Ai</span></h1>
      }
       
      </SidebarHeader>
      
      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Application
          </SidebarGroupLabel>
          
          {/* Add list-none and p-0 to remove bullets and padding */}
          <SidebarGroupContent className="list-none p-0 mt-2 px-2 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.url
              const Icon = item.icon
              
              return (
                // Add list-none to SidebarMenuItem as well
                <SidebarMenuItem key={item.title} className="list-none">
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-md',
                        'text-sm font-medium transition-colors',
                        isActive 
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-accent hover:text-accent-foreground text-muted-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}





          </SidebarGroupContent>
        </SidebarGroup>
      
        <SidebarGroup>
  <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
    Your Projects
  </SidebarGroupLabel>
  
  <SidebarGroupContent className="mt-2 px-2 space-y-1">
    <SidebarMenu>
    {projects.map((project) => (
  <SidebarMenuItem key={project.name} className="list-none">
    <SidebarMenuButton asChild>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "rounded-sm border size-6 flex items-center justify-center text-sm",
            {
              "bg-white text-primary": true,
              "bg-primary text-white": false, // Adjust condition dynamically if needed
            }
          )}
        >
          {project.name[0]} {/* Displaying only the first letter */}
        </div>
        <span>{project.name}</span>
      </div>
    </SidebarMenuButton>
  </SidebarMenuItem>
))}
<div className="h-2"></div>
{open && (
  <SidebarMenuItem>


  <Link href="/create">
  <Button variant={'outline'} className='w-full'> Create Project</Button>
  </Link>

</SidebarMenuItem>
)}



    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
      
      
      </SidebarContent>
    </Sidebar>
   
  )
}

export default AppSideBar