import ButtonUnlockChapter from '@/components/course/create/ButtonUnlockChapter';
import FormChapter from '@/components/course/create/FormChapter';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/nuqs';
import prisma from '@/lib/prisma';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { type SearchParams } from 'nuqs';
import React from 'react';


type Params = Promise<{
  slug: string
}>

const Page = async(props:{ searchParams:Promise<SearchParams> ,params:Params }) => {
  const slug = (await props.params).slug ;
  const { chapterId }=await searchParamsCache.parse(props.searchParams);
  if(!chapterId){
    redirect(`/course/create/${slug}`)
  }

  const chapter=await prisma.chapter.findUnique({
    where:{
      id:chapterId
    },
    include: {
      video:{
        select:{
          name: true,
          url: true,
          fileId: true
        }
      }
    },
  })

  if(!chapter){
    redirect(`/course/create/${slug}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 w-full max-w-5xl mx-auto">
        <Link
          href={`/course/create/${slug}`}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-6 group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Course</span>
        </Link>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-1 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-5 text-blue-500" />
                  <h1 className="text-2xl font-bold text-gray-900">
                    Chapter Creation
                  </h1>
                </div>
                <div>
                  <ButtonUnlockChapter chapterId={chapterId} />
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Create a new chapter for your course. Fill in all required fields below.
              </p>
            </div>
            </div>

          <Separator className="mb-8" />

          <div className="max-w-4xl">
          <FormChapter
            slug={slug}
            id={chapterId}
            title={chapter.title}
            description={chapter.description}
            video={{
              name: chapter.video?.name || undefined,
              url: chapter.video?.url || undefined,
              fileId: chapter.video?.fileId || undefined,
            }}
          />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? Check our{' '}
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              chapter creation guide
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;