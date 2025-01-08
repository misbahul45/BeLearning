import ListArticle from '@/components/article/show/ListArticle'
import ArticleLoader from '@/components/Loaders/ArticleLoader'
import React, { Suspense } from 'react'

const page = async() => {
  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-2'>
      <Suspense fallback={<ArticleLoader />}>
        <ListArticle />
      </Suspense>
    </div>
  )
}

export default page