'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import {useRouter} from "next/navigation"
export const UserActions = () => {
    const router = useRouter()
  return (
    <div className='flex items-center'>
        <Button variant={'outline'} onClick={() => router.push('/complaints/submit')} className='cursor-pointer font-light'>Create complain</Button>
    </div>
  )
}
