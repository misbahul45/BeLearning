import React from 'react'
import { type SearchParams } from 'nuqs/server'
import ListCategory from '@/components/browse/ListCategory'
import { searchParamsCache } from '@/lib/nuqs'

type PageProps = {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: PageProps) => {
  const { search, category } = await searchParamsCache.parse(searchParams)
  return (
    <div className='lg:p-8 p-4 space-y-4'>
      <ListCategory searchCategory={category || 'all'} />
      <div>{search+category}</div>
    </div>
  )
}

export default Page
