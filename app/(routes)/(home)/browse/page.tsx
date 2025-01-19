import React from 'react'
import { type SearchParams } from 'nuqs/server'
import ListCategory from '@/components/browse/ListCategory'
import { searchParamsCache } from '@/lib/nuqs'
import { getCategoryAction } from '@/actions/category.action'

type PageProps = {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: PageProps) => {
  const { search, category } = await searchParamsCache.parse(searchParams)
  const categories=await getCategoryAction()
  return (
    <div className='lg:p-8 p-4 space-y-4'>
      <ListCategory categories={categories} searchCategory={category || 'all'} />
      <div>{search+category}</div>
    </div>
  )
}

export default Page
