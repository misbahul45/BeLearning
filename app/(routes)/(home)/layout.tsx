import BottomHome from '@/components/layout/BottomHome'
import HeaderHome from '@/components/layout/HeaderHome'
import SidenavHome from '@/components/layout/SidenavHome'
import React from 'react'

const HomeLayout =async({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen relative'>
      <SidenavHome />
      <div className="flex-1 overflow-y-auto">
        <HeaderHome />
        {children}
      </div>
      <BottomHome />
    </div>
  )
}

export default HomeLayout