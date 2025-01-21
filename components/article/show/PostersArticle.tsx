import { getArticlesAction } from '@/actions/article.action';
import React from 'react'
import { Article, Cover } from '@prisma/client';
import { User } from 'next-auth';
import { Poster } from './Poster';

type ArticleWithRelations = Partial<Article & { cover: Cover; author: User }> & {
  id?: string;
};

export const revalidate = 60
const PostersArticle = async({page}:{page:number}) => {
  if(page>1){
    return null
  }
    const articles=await getArticlesAction({ slug: true, title: true, content: true, cover: true, tags: true, updatedAt: true, save:true, by:'DESC', take:6, status:"ALL" });
  return (
    <div>
        <Poster articles={articles as ArticleWithRelations[]} />
    </div>
  )
}

export default PostersArticle