import { getArticlesAction } from '@/actions/article.action'
import { getUserAction } from '@/actions/user.action'
import { USER } from '@/types/user.types'
import { auth } from '@/lib/auth'
import React from 'react'
import ListItemArticle from './ListItemArticle'
import ArticlePagination from './ArticlePagination'
import Link from 'next/link'

interface Props {
  page: number
  search: string
  tag: string
}

export const revalidate = 60

const ListArticle = async ({ page, search, tag }: Props) => {

  const articles=await getArticlesAction({
    slug: true,
    title: true,
    content: true,
    author: true,
    cover: true,
    tags: true,
    createdAt: false,
    updatedAt: true,
    save: true,
    like: true,
    by: 'VIEWS',
    status: 'PUBLISHED',
    take: 6,
    skip: 6 * (page - 1),
    search,
    tag
  })
  
 const session=await auth()
   
  const user = session?.user? 
    await getUserAction(session.user.email as string, {
      image: true,
      username: true,
      id: true,
      email: true,
    }) : null

  const userSaves = new Set(
    articles
      .filter(article => article.saves.some(save => save.userId === user?.id))
      .map(article => article.slug)
  )
  
  const userLikes = new Set(
    articles
      .filter(article => article.likes.some(like => like.likedBy === user?.id))
      .map(article => article.slug)
  )

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No Articles Found
        </h2>
        <p className="text-gray-600 text-center mb-6">
          There are currently no articles available. Check back later or start exploring other sections!
        </p>
        <Link 
        href={'/article'}
          className="px-6 py-2 text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-all duration-150"
        >
          Explore More
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-3 gap-1.5'>
        {articles.map((article) => (
          <ListItemArticle
            key={article.slug}
            isSaved={userSaves.has(article.slug)}
            isLoved={userLikes.has(article.slug)}
            user={user as USER}
            title={article.title}
            slug={article.slug}
            viewCount={article.viewCount}
            cover={article.cover?.url as string}
            tags={article.tags}
            author={article.author.username}
            createdAt={article.updatedAt} />
        ))}
      </div>
      <ArticlePagination search={search} tag={tag} />
    </>
  )
}

export default ListArticle