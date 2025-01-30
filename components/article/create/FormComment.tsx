"use client"
import type React from "react"
import { useState } from "react"
import { MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { createArticleCommentAction } from "@/actions/article.comments"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import dynamic from "next/dynamic"

interface Props {
  articleId: string
  userId?: string
  parentId?: string
  setReplay?: React.Dispatch<React.SetStateAction<string>>,
  slug: string;
}


const RichTextEditor = dynamic(() => import("./RichTextEditorComments"), { 
  ssr: false,
  loading: () => <div className="h-32 animate-pulse bg-muted" />
})

const FormComment: React.FC<Props> = ({ articleId, userId, parentId, setReplay, slug }) => {
  const [showForm, setShowForm] = useState(false)
  const [comment, setComment] = useState("")

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createArticleCommentAction,
    onSuccess: () => {
      toast.success("Comment sent successfully")
      setComment("")
      setShowForm(false)
      const queryKey = parentId 
        ? ["subComments", parentId]
        : ["articleComments", articleId]
      queryClient.invalidateQueries({ queryKey })
    },
    onError: (error: unknown) => {
      toast.error((error as Error).message)
    },
  })

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment) return
    mutation.mutate({
      message: comment,
      userId: userId || "",
      articleId,
      parentId,
      slug: slug,
    })
  }

  if (!showForm && !parentId) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <Button
            onClick={() => setShowForm(true)}
            variant="outline"
            size={"lg"}
            className="w-full text-muted-foreground flex justify-between"
          >
            What are your thoughts?

            <MessageSquare />
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <form onSubmit={handleSendComment}>
        <CardContent className="pt-6">
          <RichTextEditor content={comment} onChange={setComment} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            size="sm"
            type="button"
            variant="ghost"
            onClick={() => {
              setComment("")
              setReplay?.("")
              setShowForm(false)
            }}
          >
            Cancel
          </Button>
          <Button size="sm" disabled={mutation.isPending || comment === ""} type="submit">
            {mutation.isPending ? (
              "Sending..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Send
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default FormComment

