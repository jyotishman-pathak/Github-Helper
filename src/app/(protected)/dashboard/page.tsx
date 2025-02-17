"use client";

import React from 'react'
import { useUser } from "@clerk/nextjs";
import { Card } from '~/components/ui/card';
const DashboardPage = () => {
  
  const {user} = useUser();
  return (
    <Card className='w-full h-screen'>
      {user?.fullName}
    </Card>
    
  )
}

export default DashboardPage;