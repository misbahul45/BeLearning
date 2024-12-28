import React from 'react'
import { createSearchParamsCache, parseAsString, type SearchParams } from 'nuqs/server'
import ListCategory from '@/components/browse/ListCategory'

type PageProps = {
  searchParams: Promise<SearchParams>
}

const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
})

const Page = async ({ searchParams }: PageProps) => {
  const { search, category } = await searchParamsCache.parse(await searchParams)
  return (
    <div className='lg:p-8 p-4 space-y-4'>
      <ListCategory searchCategory={category || 'all'} />
      <div>{search+category}</div>
    </div>
  )
}

export default Page
