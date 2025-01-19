import { getCategoryAction } from '@/actions/category.action';
import { getCourseBySlug } from '@/actions/course.action';
import { getUserAction } from '@/actions/user.action';
import FormCreate from '@/components/course/create/FormCreate';
import { auth } from '@/lib/auth';
import { searchParamsCache } from '@/lib/nuqs';
import { type SearchParams } from 'nuqs';
import React from 'react'

type PageProps={
  searchParams:Promise<SearchParams>
}

const page = async({ searchParams }:PageProps ) => {
  const categories=await getCategoryAction();
  const session=await auth();
  const user=await getUserAction(session?.user.email as string,{id:true})

  const { update }=await searchParamsCache.parse(searchParams);
  const course = (await getCourseBySlug(update as string)) || undefined;

  return (
    <div className='py-8 px-6'>
      <h1 className='text-center font-bold bg-clip-text md:text-4xl text-2xl text-transparent bg-gradient-to-r from-cyan-700 via-violet-600 to-blue-600'>{course?"Update Course":"Create New Course"}</h1>
      <FormCreate course={{
        id: course?.id || '',
        title: course?.title || '',
        slug: course?.slug || '',
        cover:{
          url: course?.cover?.url || '',
          fileId: course?.cover?.fileId || ''
        },
        description: course?.description || '',
        price: course?.price || 0,
        categoryId: course?.categoryId || '',
        category: {
          name: course?.category?.name || '',
          id: course?.category?.id || ''
        }
      }}
      categories={categories}
      authorId={user?.id || ''} />
    </div>
  )
}

export default page