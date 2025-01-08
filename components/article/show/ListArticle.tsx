import { getArticlesAction } from '@/actions/article.action'
import React from 'react'
import ListItemArticle from './ListItemArticle'


export const revalidate = 60
const ListArticle = async() => {
    const articles=await getArticlesAction({ slug: true, title: true, content: true, author: true, cover: true, tags: true, createdAt: false, updatedAt: true });
  return (
    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
      {articles.map((item)=>(
        <ListItemArticle
          key={item.slug}
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