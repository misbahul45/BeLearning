import { getArticleAction } from '@/actions/article.action'
import { getUserAction } from '@/actions/user.action'
import BookmarkPost from '@/components/article/show/BorkmarkPost'
import ButtonTag from '@/components/article/show/ButtonTag'
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

interface Props {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<SearchParams>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return {
    title: `Be Learning Blog | ${slug}`,
  }
}

const ArticlePage = async ({ params, searchParams }: Props) => {
  const { slug } = await params
  const session = await auth()
  
  if (!session?.user?.email) {
    return redirect('/login')
  }
  
  let user;
  let article;

  try {
    user = await getUserAction(session?.user.email as string, { email: true, id: true })
    article = await getArticleAction(slug)
  } catch{
    console.log("error")
  }
  
  if (!user) {
    return redirect('/login')
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

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          className="absolute left-4 top-8 md:left-0"
        >
          <Link href="/article">
            <ArrowLeft className="md:h-6 md:w-6 h-4 w-4" />
          </Link>
        </Button>

        {/* Article Header */}
        <header className="space-y-8 mb-12">
          <h1 className="text-center font-bold md:text-5xl text-3xl text-gray-900 mt-12 max-w-3xl mx-auto leading-tight">
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

        {/* Cover Image */}
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

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div
            className="px-4"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />
        </div>

        {/* Tags */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h3 className="font-medium text-gray-700 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, i) => (
              <ButtonTag key={i} tag={tag.tags.tag} />
            ))}
          </div>
        </div>

        {/* Interaction Buttons */}
        <div className="flex gap-4 justify-center">
          <BookmarkPost userId={user?.id || ''} slug={slug} isSaved={isSaved} />
          <LovePost userId={user?.id || ''} slug={slug} isLoved={isLiked} />
        </div>
      </div>
    </article>
  )
}

export default ArticlePage