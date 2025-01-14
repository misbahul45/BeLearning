import { getArticlesAction } from '@/actions/article.action'
import React from 'react'
import ListItemArticle from './ListItemArticle'
import { getUserAction } from '@/actions/user.action'
import { USER } from '@/types/user.types'
import { auth } from '@/lib/auth'
import ScrollToFetch from './ScrollToFetch'

interface Props{
  page:number,
  search:string,
  tag:string
}

export const revalidate = 60
const ListArticle = async({ page, search, tag }:Props) => {
    const articles=await getArticlesAction({ slug: true, title: true, content: true, author: true, cover: true, tags: true, createdAt: false, updatedAt: true, save:true, like:true, by:'VIEWS', take:6*page, search, tag });
    const session=await auth();
    const user=session?.user?await getUserAction(session?.user?.email as string, {image: true, username: true, id: true, email: true}):null;

  return (
    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-3 gap-1.5'>
      {articles.map((item)=>(
        <ListItemArticle
          key={item.slug}
          isSaved={item.saves.find((save) => save.userId === user?.id) && true || false}
          isLoved={item.likes.find((like) => like.likedBy === user?.id) && true || false}
          user={user as USER}
          title={item.title}
          slug={item.slug}
          viewCount={item.viewCount}
          cover={item.cover?.url as string}
          tags={item.tags} author={item.author.username}
          createdAt={item.updatedAt}
          />
      ))}
      <ScrollToFetch search={search} tag={tag} />
    </div>
  )
}

export default ListArticle