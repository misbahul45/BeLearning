import { auth } from '@/lib/auth'
import React from 'react'

const page = async() => {
  const session=await auth()
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
}

export default page