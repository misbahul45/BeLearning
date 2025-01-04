import FormArticle from '@/components/article/create/FormArticle'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async() => {
    const session=await auth()
    const author=await prisma.user.findUnique({
        where:{
           email:session?.user.email
        },
        select:{
            id:true
        }
    })
  return (
    <div className='w-full py-20 md:px-4'>
        <div className='w-full max-w-6xl relative mx-auto h-full flex-1 rounded md:p-8 p-2'>
            <div className="flex justify-start items-center md:gap-6 gap-3">
                <Link href='/article'>
                    <Button size={'icon'} variant={'outline'}>
                        <ArrowLeft className='md:size-12 size-8' />
                    </Button>
                </Link>
                <h1 className='font-bold md:text-3xl text-2xl'>Create Article</h1>
            </div>
            <FormArticle authorId={author?.id || ''} />
        </div>
    </div>
  )
}

export default page