import { getArticlesAction } from '@/actions/article.action'
import React from 'react'
import ListItemArticle from './ListItemArticle'
import { getUserAction } from '@/actions/user.action'
import { USER } from '@/types/user.types'
import { auth } from '@/lib/auth'


export const revalidate = 60
const ListArticle = async() => {
    const articles=await getArticlesAction({ slug: true, title: true, content: true, author: true, cover: true, tags: true, createdAt: false, updatedAt: true, save:true, by:'VIEWS', take:6 });
    const session=await auth();
    const user=await getUserAction(session?.user?.email as string, {image: true, username: true, id: true, email: true});
  return (
    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-3 gap-1.5'>
      {articles.map((item)=>(
        <ListItemArticle
          key={item.slug}
          isSaved={item.saves.find((save) => save.userId === user?.id) && true || false}
          user={user as USER}
          title={item.title}
          slug={item.slug}
          viewCount={item.viewCount}
          cover={item.cover?.url as string}
          tags={item.tags} author={item.author.username}
          createdAt={item.updatedAt}
          />
      ))}
    </div>
  )
}

export default ListArticle