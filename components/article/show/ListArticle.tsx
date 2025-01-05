import { getAriclesAction } from '@/actions/article.action'
import React from 'react'

export const revalidate = 60
const ListArticle = async() => {
    const articles=await getAriclesAction();
  return (
    <div
        dangerouslySetInnerHTML={{ __html: articles[0].content }}
    >
    </div>
  )
}

export default ListArticle