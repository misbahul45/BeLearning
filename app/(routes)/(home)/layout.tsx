import HeaderHome from '@/components/layout/HeaderHome'
import SidenavHome from '@/components/layout/SidenavHome'
import Wrapper from '@/components/layout/Wrapper'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import React from 'react'

const HomeLayout =async({ children }: { children: React.ReactNode }) => {
  const session=await auth()
  let user;

  if(session){
    try {
      user=await prisma.user.findUnique({
        where:{
          email:session?.user.email
        },
    
        select:{
          profile:{
            select:{
              role:true
            }
          }
        }
      })
    } catch{
      user=null
    }
  }

  return (
    <div className='flex relative h-screen overflow-y-auto'>
      <SidenavHome isLogin={!!session} userRole={user?.profile?.role as 'ADMIN' | 'USER' | 'TEACHER' || 'USER'} />
      <div className="flex-1 h-full flex flex-col w-full">
        <HeaderHome />
        <Wrapper>{children}</Wrapper>
      </div>
    </div>
  )
}

export default HomeLayout