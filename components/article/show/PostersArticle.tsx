import { getArticlesAction } from '@/actions/article.action';
import React from 'react'
import { Article, Cover } from '@prisma/client';
import { User } from 'next-auth';
import { Poster } from './Poster';

export const revalidate = 60

type ArticleWithRelations = Partial<Article & { cover: Cover; author: User }> & {
  id?: string;
};
const PostersArticle = async() => {
    const articles=await getArticlesAction({ slug: true, title: true, content: true, cover: true, tags: true, updatedAt: true, save:true, by:'COMMENTS', take:6 });
  return (
    <div>
        <Poster articles={articles as ArticleWithRelations[]} />
    </div>
  )
}

export default PostersArticle