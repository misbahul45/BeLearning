import ListArticle from '@/components/article/show/ListArticle'
import PostersArticle from '@/components/article/show/PostersArticle'
import ShowRecomTags from '@/components/article/show/ShowRecomTags'
import ArticleLoader from '@/components/Loaders/ArticleLoader'
import PosterLoader from '@/components/Loaders/PosterLoader'
import RecomTagsLoader from '@/components/Loaders/RecomTagsLoader'
import { searchParamsCache } from '@/lib/nuqs'
import { type SearchParams } from 'nuqs'
import React, { Suspense } from 'react'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export async function generateMetadata({ searchParams }: PageProps) {
  const { tag } = await searchParamsCache.parse(searchParams)
  return {
    title: `Be Learning Blog | ${tag ? `Articles tagged with ${tag}` : 'Articles'}`,
  }
}

export const revalidate = 60

const page = async ({ searchParams }: PageProps) => {
  const { page, tag, search } = await searchParamsCache.parse(searchParams)
  const isTagOrSearchPresent = (tag && tag.trim() !== '') || (search && search.trim() !== '')

  return (
<<<<<<< HEAD
    <div className='w-full max-w-6xl mx-auto ms:px-0 px-2 py-2'>
      {(isTagOrSearchPresent || page > 1) && (
          <p className='mb-4 md:text-2xl text-lg font-semibold text-gray-400'>
            Result for <span className='text-gray-800'>
              {(tag && search) ? `${tag} & ${search}` : tag || search}
            </span>
            {page > 1 && (
              <>
                {isTagOrSearchPresent && <span className='text-gray-800'> & </span>}
                Page <span className='text-gray-800'>{page}</span>
              </>
            )}
          </p>
        )}
=======
    <div className="w-full max-w-6xl mx-auto ms:px-0 px-2 py-2">
      {(isTagOrSearchPresent || page > 1) && (
        <p className="mb-4 md:text-2xl text-lg font-semibold text-gray-400">
          Result for{' '}
          <span className="text-gray-800">
            {(tag && search) ? `${tag} & ${search}` : tag || search}
          </span>
          {page > 1 && (
            <>
              {isTagOrSearchPresent && <span className="text-gray-800"> & </span>}
              Page <span className="text-gray-800">{page}</span>
            </>
          )}
        </p>
      )}
>>>>>>> master

      {!isTagOrSearchPresent && (
        <>
          <Suspense fallback={<PosterLoader />}>
            <PostersArticle page={page} />
          </Suspense>
          <Suspense fallback={<RecomTagsLoader />}>
            <ShowRecomTags page={page} />
          </Suspense>
        </>
      )}

      <Suspense fallback={<ArticleLoader />}>
        <ListArticle page={page} search={search} tag={tag} />
      </Suspense>
    </div>
  )
}

export default page
