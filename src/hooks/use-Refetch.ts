import { QueryClient, useQueryClient } from '@tanstack/react-query'
import React from 'react'

export default function UseRefetch() {
    const queryClient = useQueryClient()
  return  async ()=>{
    await queryClient.refetchQueries({
        type:"active"
    })
  }

}
