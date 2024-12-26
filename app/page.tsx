import { Button } from '@/components/ui/button'
import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
  const session = await auth()

  const handleLogout = async () => {
    'use server'
    await signOut()
    redirect('/sign-in')
  }

  return (
    <div>
      {JSON.stringify(session)}
      <form action={handleLogout}>
        <Button variant="destructive" type="submit">Logout</Button>
      </form>
    </div>
  )
}

export default Page
