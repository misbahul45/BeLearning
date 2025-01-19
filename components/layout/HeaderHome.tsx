import React, { Suspense } from 'react'
import SearchHeader from './SearchHeader'
import UserLogin from './UserLogin'
import AvatarLoader from '../Loaders/AvatarLoader'


const HeaderHome = async() => {
  return (
    <header className='w-full pt-3 pb-1 flex justify-between items-center md:px-12 sm:px-9 px-6 '>
        <SearchHeader />
        <Suspense fallback={<AvatarLoader />}>
          <UserLogin />
        </Suspense>
    </header>
  )
}

export default HeaderHome