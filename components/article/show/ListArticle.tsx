import { getArticlesAction } from '@/actions/article.action'
import { getUserAction } from '@/actions/user.action'
import { USER } from '@/types/user.types'
import { auth } from '@/lib/auth'
import React from 'react'
import ListItemArticle from './ListItemArticle'
import ArticlePagination from './ArticlePagination'

interface Props {
  page: number
  search: string
  tag: string
}

export const revalidate = 60

const ListArticle = async ({ page, search, tag }: Props) => {

  const [articles, session] = await Promise.all([
    getArticlesAction({
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
    }),
    auth()
  ])

  const user = session?.user ? 
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