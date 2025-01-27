"use client"
import { getArticleCommentsAction, getSubCommentsAction } from "@/actions/article.comments"
import { sleep } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import ItemComment from "./ItemComment"
import { MessagesSquare } from "lucide-react"
import ArticleCommentsLoader from "@/components/Loaders/ArticleCommentsLoader"

interface Props {
  articleId: string
  articleAuthorId: string
  userLogin: { id?: string }
  parentId?: string;
  slug: string
}

const ListComments = ({ articleId, articleAuthorId, userLogin, parentId, slug }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: !parentId ? ["articleComments", articleId] : ["subComments", parentId],
    queryFn: async () => {
      await sleep()
      return parentId ? await getSubCommentsAction(parentId) : await getArticleCommentsAction(articleId)
    },
  })


  if (isLoading) {
     return <ArticleCommentsLoader />
  }

  if (data?.length==0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center animate-in fade-in-50 slide-in-from-bottom-3">
        <div className="bg-primary/5 p-4 rounded-full">
          <MessagesSquare className="h-12 w-12 text-primary/70" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h3 className="font-semibold text-lg">No comments yet</h3>
          <p className="text-sm text-muted-foreground">
            Be the first to share your thoughts on this article
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      {data?.map((comment) => (
        <ItemComment
          key={comment.id}
          {...comment}
          articleAuthorId={articleAuthorId}
          userLogin={userLogin}
          articleId={articleId}
          slug={slug}
        />
      ))}
    </div>
  )
}

export default ListComments

