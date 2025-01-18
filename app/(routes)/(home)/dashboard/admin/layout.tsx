import { getUserAction } from '@/actions/user.action'
import HeaderAdmin from '@/components/dashboard/admin/HeaderAdmin'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async({ children }: { children: React.ReactNode }) => {
  const session=await auth()
  const user=await getUserAction(session?.user.email as string,{role:true})
  if(user?.profile?.role !=="ADMIN"){
    redirect('/browse')
  }
  return (
    <div className='flex flex-col'>
        <HeaderAdmin />
        {children}
    </div>
  )
}

export default layout