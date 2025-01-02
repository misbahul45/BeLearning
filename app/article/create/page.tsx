import FormArticle from '@/components/article/create/FormArticle'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
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
            <FormArticle />
        </div>
    </div>
  )
}

export default page