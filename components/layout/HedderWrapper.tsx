import React from 'react'
import Header from './Header'
import { auth } from '@/lib/auth'

const HedderWrapper = async() => {
    const session=await auth()
  return (
    <>
       <Header user={session?.user} />
    </>
  )
}

export default HedderWrapper