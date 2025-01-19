import { getUserAction } from '@/actions/user.action'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const layout =async({ children }:{ children: React.ReactNode}) => {
    const session=await auth()
    const user=await getUserAction(session?.user.email as string,{role:true})

    if(user?.profile?.role !=="TEACHER"){
        redirect('/browse')
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default layout