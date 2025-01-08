import { getArticleAction } from '@/actions/article.action'
import Image from 'next/image'
import React from 'react'
interface Props{
    params: Promise<{
        slug:string
    }>
}

export async function generateMetadata(props: Props) {
  const params = await props.params;

  const {
    slug
  } = params;

  return {
    title:'Be Learning Blog |'+slug,
  }
}

const page = async({params}:Props) => {
    const {slug}=await params
    const article=await getArticleAction(slug) 
  return (
    <div className='w-full max-w-5xl mx-auto px-4 py-8'>
        <Image src={article?.cover?.url || ''} alt={'image'+article?.title} width={200} height={200} className="object-cover w-full max-w-xl mx-auto rounded-lg shadow-md" />
        <h1 className='font-bold md:text-3xl sm:text-2xl text-xl text-primary mt-4'>{article?.title}</h1>
        <div
          className='space-y-3'
            dangerouslySetInnerHTML={{ __html: article?.content || '' }}
        />
    </div>
  )
}

export default page