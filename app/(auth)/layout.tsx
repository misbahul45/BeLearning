import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const AuthLayout = async({ children }: { children: React.ReactNode }) => {
    const session=await auth()
    if(session){
        return redirect('/browse?category=all')
    }else{
        return (
            <>{children}</>
        )
    }
}

export default AuthLayout