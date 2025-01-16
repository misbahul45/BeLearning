import { getTagsAction } from '@/actions/tags.action'
import SearchArticle from '@/components/article/show/SearchArticle'
import React from 'react'

const layout = async({ children }:{ children: React.ReactNode}) => {
    const tags=await getTagsAction({take:10, by:'ARTICLES'});
  return (
    <div>
        <SearchArticle  tags={tags} />
        {children}
    </div>
  )
}

export default layout
