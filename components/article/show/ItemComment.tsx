"use client"
import React from "react"
import { Reply, MoreVertical, MessageCircle } from "lucide-react"
import FormComment from "../create/FormComment"
import ListComments from "./ListComments"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Props {
  articleAuthorId: string
  articleId: string
  userLogin: { id?: string }
  user: {
    id: string
    username: string
    profile: { image: { url: string } | null } | null
  }
  id: string
  userId: string
  parentId: string | null
  message: string
  createdAt: Date;
  slug: string;
  lengthChildren:number;
}

const ItemComment = ({ id, articleAuthorId, articleId, userLogin, user, message, createdAt, slug, lengthChildren }: Props) => {
  const [replayCommentId, setReplayCommentId] = React.useState<string>("")
  const isAuthor = articleAuthorId === user.id
  const timeSinceCreated = formatDistanceToNow(new Date(createdAt), { addSuffix: true })
  const [showReplay, setShowReplay] = React.useState(false)

  return (
    <div className={`mb-4 p-2`}>
      <div className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.profile?.image?.url || "/placeholder.svg"} alt={user.username} />
          <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs">{user.username}</span>
            {isAuthor && <Badge variant="default">Author</Badge>}
          </div>
          <span className="text-xs text-muted-foreground">{timeSinceCreated}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-auto h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: message }} className="prose prose-sm max-w-none" />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <div className="flex gap-2 items-center justify-start">
          <Button variant="ghost" size="sm" onClick={() => setReplayCommentId(id)} className="flex items-center gap-2">
            <Reply className="h-4 w-4" />
            Reply
          </Button>
          {lengthChildren>=0&&(
          <Button onClick={() => setShowReplay(!showReplay)} variant={showReplay ? "default" : "ghost"} size="sm" className="flex items-center gap-1">
            <MessageCircle className="size-2" />
            {showReplay ? "Hide" : `View`}
          </Button>
          )}
        </div>
        {replayCommentId === id && (
          <FormComment slug={slug} articleId={articleId} userId={userLogin?.id} parentId={id} setReplay={setReplayCommentId} />
        )}
      </div>
      {showReplay &&(
        <div className={'border-l-2 border-muted-foreground'}>
           <ListComments slug={slug} articleAuthorId={articleAuthorId} userLogin={userLogin} articleId={articleId} parentId={id} />
        </div>
      )}
    </div>
  )
}

export default ItemComment

