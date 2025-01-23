import { getArticleAction } from '@/actions/article.action'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { readingTime } from '@/lib/utils'
import Image from 'next/image'
import { type SearchParams } from 'nuqs'
import React from 'react'
import AcceptArticle from '../../../../../../../components/dashboard/admin/AcceptArticle'
interface Props{
    params: Promise<{
      slug:string
  }>
    searchParams: Promise<SearchParams>
}

export async function generateMetadata(props: Props) {
  const slug=(await props.params).slug
  const article=await getArticleAction(slug)
  return {
    title:article?.title,
  }
}

const page = async({params}:Props) => {
    const {slug}=await params
    const article=await getArticleAction(slug) 

  return (
    <div className='relatice w-full max-w-5xl mx-auto px-4 py-8'>
      <h1 className='text-center font-bold md:text-5xl sm:text-4xl text-2xl text-primary mt-4'>{article?.title}</h1>
      <AcceptArticle slug={slug} />
      <div className="flex gap-4 items-center my-5">
        <div className='flex gap-3 items-center'>
          <Image src={article?.author.profile?.image?.url || ''} alt={article?.author.username+' profile'} width={100} height={100} className="object-cover w-12 h-12 rounded-full" />
          <div>
            <h1 className='font-semibold'>{article?.author.username}</h1>
            <div className="flex justify-between items-center gap-3">
              <p>{new Date(article?.updatedAt ?? '').toLocaleDateString('en-US',{
                day:'numeric',
                month:'long',
                year:'numeric'
              })}</p>
              <p className='text-cyan-600'>{readingTime(article?.content || '')+" min read"}</p>
            </div>
          </div>
        </div>
      </div>
        <Image src={article?.cover?.url || ''} alt={'image'+article?.title} width={200} height={200} className="object-cover w-full max-w-xl mx-auto rounded-lg shadow-md" />
        <div
          className='px-4 my-6'
            dangerouslySetInnerHTML={{ __html: article?.content || '' }}
        />
        <Separator />
        <div className='my-4 flex gap-2 items-center'>
          <p>Tags :</p>
          <div className='flex gap-2 items-center'>
            {article?.tags.map((tag,i)=>(
                <Button key={i}>{tag.tags.tag}</Button>
            ))}
          </div>
        </div>
    </div>
  )
}

export default page