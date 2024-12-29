import BottomHome from '@/components/layout/BottomHome'
import HeaderHome from '@/components/layout/HeaderHome'
import HomeWrapper from '@/components/layout/HomeWrapper'
import SidenavHome from '@/components/layout/SidenavHome'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import React from 'react'

const HomeLayout =async({ children }: { children: React.ReactNode }) => {
  const session=await auth()
  let user;

  if(session){
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
  }

  return (
    <div className='flex h-screen relative'>
      <SidenavHome isLogin={!!session} userRole={user?.profile?.role as 'ADMIN' | 'USER' | 'TEACHER' || 'USER'} />
      <div className="flex-1 h-screen flex flex-col">
        <HeaderHome />
        <HomeWrapper>{children}</HomeWrapper>
      </div>
      <BottomHome />
    </div>
  )
}

export default HomeLayout