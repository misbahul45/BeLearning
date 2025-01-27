"use client"
import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { createArticleCommentAction } from "@/actions/article.comments"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import LinkModal from "./LinkModal"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import dynamic from "next/dynamic"

interface Props {
  articleId: string
  userId?: string
  parentId?: string
  setReplay?: React.Dispatch<React.SetStateAction<string>>,
  slug: string
}


const RichTextEditor = dynamic(() => import("./RichTextEditorComments"), { ssr: false })

const FormComment: React.FC<Props> = ({ articleId, userId, parentId, setReplay, slug }) => {
  const [showForm, setShowForm] = useState(!parentId)
  const [comment, setComment] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createArticleCommentAction,
    onSuccess: () => {
      toast.success("Comment sent successfully")
      setComment("")
      setShowForm(false)
      if (parentId) {
        queryClient.invalidateQueries({ queryKey: ["subComments", parentId] })
      } else {
        queryClient.invalidateQueries({ queryKey: ["articleComments", articleId] })
      }
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

  const addLink = () => {
    if (linkUrl) {
      setComment((prev) => prev + `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkUrl}</a>`)
      setLinkUrl("")
      setIsLinkModalOpen(false)
    }
  }

  if (!showForm && !parentId) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <Button
            onClick={() => setShowForm(true)}
            variant="outline"
            className="w-full justify-start text-muted-foreground"
          >
            What are your thoughts?
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <form onSubmit={handleSendComment}>
        <CardContent className="pt-6">
          <RichTextEditor content={comment} onChange={setComment} onLinkClick={() => setIsLinkModalOpen(true)} />
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
      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
        onAddLink={addLink}
      />
    </Card>
  )
}

export default FormComment

