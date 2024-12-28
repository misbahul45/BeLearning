import React, { Suspense } from 'react'
import SearchHeader from './SearchHeader'
import UserLogin from './UserLogin'
import Loader from '../ui/Loader'


const HeaderHome = () => {
  return (
    <header className='w-full pt-3 pb-1 flex justify-between items-center md:px-12 sm:px-9 px-6 '>
        <SearchHeader />
        <Suspense fallback={<Loader />}>
          <UserLogin />
        </Suspense>
    </header>
  )
}

export default HeaderHome