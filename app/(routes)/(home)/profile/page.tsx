import UserInformation from '@/components/profile/UserInformation'
import React from 'react'

const page = async () => {
  return (
    <div className='pt-2 overflow-y-auto h-full px-4'>
      <UserInformation />
    </div>
  )
}

export default page