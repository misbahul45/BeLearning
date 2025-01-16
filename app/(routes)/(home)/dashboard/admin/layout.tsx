import HeaderAdmin from '@/components/dashboard/admin/HeaderAdmin'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col'>
        <HeaderAdmin />
        {children}
    </div>
  )
}

export default layout