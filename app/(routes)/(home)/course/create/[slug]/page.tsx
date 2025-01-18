import DialogResource from '@/components/course/create/DialogResources'
import ItemResouce from '@/components/course/create/ItemResouce'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { ArrowLeft, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type PageProps={
    params:{
        slug:string
    }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  return {
    title: `Be learning create course | ${slug}`,
  }
}

const page = async({params}:PageProps) => {
    const {slug }=await params;
    const course=await prisma.course.findUnique({
      where:{
        slug
      },
      include:{
        cover:true,
        resources:true,
        chapters:true
      }
    })
  return (
    <div className='p-4 w-full max-w-5xl mx-auto'>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link href={`/course/create?update=${slug}`}>
            <ArrowLeft />
          </Link>
          <h1 className='font-bold md:text-3xl text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-violet-600 to-blue-600'>Course Setup</h1>
        </div>
        <form action="">
          <Button disabled={course?.chapters.length===0} type='submit' variant={course?.isPublished ? 'outline' : 'default'}>
            {course?.isPublished ? 'Unpublish' : 'Publish'}
          </Button>
        </form>
      </div>
      <p className='text-xs text-gray-400'>Completed all fields</p>
      <div className="space-y-4 my-5">
        <h2 className='text-3xl text-center font-semibold'>{course?.title}</h2>
        <Image src={course?.cover?.url||''} width={350} height={300} alt={'image-'+course?.title} className='w-full rounded-lg shadow-lg object-cover' />
       <div dangerouslySetInnerHTML={{ __html: course?.description || '' }} />
        <Separator className='border-2' />
        <div className="flex gap-2">
          <div className="flex-1 px-2">
            <div className="flex justify-between">
             <h3>Chapters</h3>
             <Link href={`/course/create/${slug}/upload`}>
              <Button size={'icon'} variant={'outline'}>
                <Plus className='size-6' />
              </Button>
             </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
             <h3>Resources</h3>
             <DialogResource courseId={course?.id || ''} slug={course?.slug || ''} />
            </div>
            <div className='space-y-1 w-full border-2 p-2'>
              {course?.resources.map((item)=>(
                <ItemResouce key={item.id} id={item.id} title={item.title??''} url={item.url??""} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page