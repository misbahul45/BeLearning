import ListArticle from '@/components/article/show/ListArticle'
import React, { Suspense } from 'react'

const page = async() => {


  return (
    <div className='pt-20'>
      <Suspense fallback={<div>Loading...</div>}>
        <ListArticle />
      </Suspense>
    </div>
  )
}

export default page