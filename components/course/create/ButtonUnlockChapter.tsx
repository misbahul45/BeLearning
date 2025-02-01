"use client"

import { getUnlockChapterAction, toggleChapterLockAction } from "@/actions/chapter.action"
import { Button } from "@/components/ui/button"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Unlock, Lock } from "lucide-react"
import type React from "react"
import { cn } from "@/lib/utils"

interface Props {
  chapterId: string
}

interface Chapter {
  isUnlocked?: boolean
}

const ButtonUnlockChapter: React.FC<Props> = ({ chapterId }) => {
  const { data: chapter, refetch } = useQuery<Chapter>({
    queryKey: ["chapter", chapterId],
    queryFn: async () => {
      const response = await getUnlockChapterAction(chapterId)
      return { isUnlocked: response?.isUnlocked }
    },
  })

  const mutation = useMutation({
    mutationFn: () => toggleChapterLockAction(chapterId),
    onSuccess: () => {
      refetch()
    },
  })

  const getButtonContent = () => {
    if (mutation.isPending) return "Unlocking..."
    if (chapter?.isUnlocked) return "Unlocked"
    return "Unlock"
  }

  return (
    <Button
      variant={chapter?.isUnlocked ? "outline" : "default"}
      onClick={() => mutation.mutate()}
      className={cn(
        "relative overflow-hidden transition-all duration-300 ease-in-out",
        chapter?.isUnlocked ? "bg-green-100 hover:bg-green-200 text-green-700" : "hover:bg-primary/90",
      )}
      disabled={mutation.isPending}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
          mutation.isPending ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="w-5 h-5 border-t-2 border-b-2 border-current rounded-full animate-spin"></div>
      </div>
      <div
        className={cn(
          "flex items-center gap-2 transition-opacity duration-300",
          mutation.isPending ? "opacity-0" : "opacity-100",
        )}
      >
        {chapter?.isUnlocked ? (
          <Unlock className="w-5 h-5 transition-transform duration-300 ease-in-out transform group-hover:rotate-12" />
        ) : (
          <Lock className="w-5 h-5 transition-transform duration-300 ease-in-out transform group-hover:-rotate-12" />
        )}
        <span>{getButtonContent()}</span>
      </div>
    </Button>
  )
}

export default ButtonUnlockChapter

