'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ResetQueryOnload = () => {
    const router=useRouter()
    const pathname=usePathname()
    useEffect(()=>{
        if(pathname){
            router.replace(pathname);
        }
    },[router, pathname])
  return null
}

export default ResetQueryOnload