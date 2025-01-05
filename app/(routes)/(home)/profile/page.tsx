import ProfileInformationLoader from '@/components/Loaders/ProfileInformationLoader'
import UserInformation from '@/components/profile/UserInformation'
import React, { Suspense } from 'react'

const page = async () => {
  return (
    <div className='pt-2 overflow-y-auto h-full px-4'>
      <Suspense fallback={<ProfileInformationLoader />}>
        <UserInformation />
      </Suspense>
    </div>
  )
}

export default page