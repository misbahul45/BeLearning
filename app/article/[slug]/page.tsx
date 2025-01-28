import { getArticleAction } from '@/actions/article.action'
import { getUserAction } from '@/actions/user.action'
import BookmarkPost from '@/components/article/show/BorkmarkPost'
import ButtonTag from '@/components/article/show/ButtonTag'
import CommentSidebar from '@/components/article/show/CommentSidebar'
import LovePost from '@/components/article/show/LovePost'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { searchParamsCache } from '@/lib/nuqs'
import { readingTime } from '@/lib/utils'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { type SearchParams } from 'nuqs'
import React from 'react'
import Backroute from './_Component/Backroute'
import prisma from '@/lib/prisma'
import ListComments from '@/components/article/show/ListComments'
import FormComment from '@/components/article/create/FormComment'

interface Props {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<SearchParams>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = await prisma.article.findUnique({where:{slug},select:{title:true}})
  return {
    title: `Be Learning Blog | ${article?.title}`,
  }
}

const ArticlePage = async ({ params, searchParams }: Props) => {
  const { slug } = await params
  const session = await auth()
  
  let user;
  let article;
  
  if(session){
    try {
      user = await getUserAction(session?.user.email as string, { email: true, id: true });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  
  try {
    article = await getArticleAction(slug);
  } catch (error) {
    console.error("Error fetching article:", error);
  }
  

  const { tag } = await searchParamsCache.parse(searchParams)

  if (tag) {
    redirect(`/article?tag=${encodeURIComponent(tag)}`)
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Article not found</h2>
        <Button asChild variant="outline">
          <Link href="/article">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to articles
          </Link>
        </Button>
      </div>
    )
  }

  const isSaved = article && user? article.saves.some((save) => save.userId === user.id):false
  const isLiked = article && user? article.likes.some((like) => like.likedBy === user.id):false
  const isComment = article && user? article.comments.some((comment) => comment.userId === user.id):false

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="relative w-full max-w-4xl mx-auto px-4 py-8 space-y-4">
        <Backroute />

        <header className="space-y-8 mb-12">
          <h1 className="text-center font-bold md:text-3xl text-2xl text-gray-900 mt-12 max-w-3xl mx-auto leading-tight">
            {article.title}
          </h1>
          
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <Image
                src={article.author.profile?.image?.url || ''}
                alt={`${article.author.username}'s profile`}
                width={100}
                height={100}
                className="object-cover w-14 h-14 rounded-full ring-2 ring-gray-100"
              />
              <div className="space-y-1">
                <h2 className="font-semibold text-lg text-gray-900">
                  {article.author.username}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.updatedAt ?? '').toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-cyan-600">
                    <Clock className="h-4 w-4" />
                    {readingTime(article.content || '')} min read
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </header>

        {article.cover?.url && (
          <div className="relative aspect-video mb-12">
            <Image
              src={article.cover.url}
              alt={`Cover image for ${article.title}`}
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        )}

        <div>
          <div    
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />
        </div>
        
        <div className="flex gap-4 px-4 items-center">
          <div className="flex gap-3 items-center bg-outline runded shadow py-2 ppx-4">
            <BookmarkPost size='lg' userId={user?.id || ''} slug={slug} isSaved={isSaved} />
            <p className="text-sm text-gray-700">{article.saves.length} Users saved</p>
          </div>
          <div className="flex gap-3 items-center bg-secondary runded shadow py-2 px-4">
            <LovePost size='lg' userId={user?.id || ''} slug={slug} isLoved={isLiked} />
            <p className="text-sm text-gray-700">{article.likes.length} Users loved</p>
          </div>
          <div className="flex gap-3 items-center bg-secondary runded shadow py-2 px-4">
            <CommentSidebar slug={slug} size='lg' isComment={isComment} articleId={article.id} authorId={article.author.id} />
            <p className="text-sm text-gray-700">{article.comments.length} Comments</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h3 className="font-medium text-gray-700 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, i) => (
              <ButtonTag key={i} tag={tag.tags.tag} />
            ))}
          </div>
        </div>

        <FormComment slug={slug} articleId={article.id} userId={user?.id} />
        <ListComments slug={slug} articleId={article.id} articleAuthorId={article.author.id} userLogin={{ id: user?.id }} />
      </div>
    </article>
  )
}

export default ArticlePage