'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Backroute = () => {
    const router=useRouter()
  return (
    <Button
        variant="ghost"
        className="absolute left-4 top-8 md:left-0"
        onClick={() => router.back()}
    >
      <ArrowLeft className="md:h-6 md:w-6 h-4 w-4" />
  </Button>
  )
}

export default Backroute