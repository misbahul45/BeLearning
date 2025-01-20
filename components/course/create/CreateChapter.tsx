'use client'
import { createChapterAction } from '@/actions/chapter.action'
import { Button } from '@/components/ui/button'
import { Plus, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import toast from 'react-hot-toast'

interface Props {
    courseId: string,
    slug: string
}

const CreateChapter = ({ courseId, slug }: Props) => {
    const [isPending, startTransition] = useTransition()
    const router=useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(async() => {
            try {
                const chapterId= await createChapterAction(courseId, slug)
                router.push(`/course/create/${slug}/upload?chapterId=`+chapterId)
            } catch (error) {
                toast.error((error as Error).message)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Button
                size="sm"
                type="submit"
                variant={!isPending ? 'outline' : 'default'}
                className={`gap-2 ${isPending ? 'opacity-70 pointer-events-none' : ''}`}
                disabled={isPending}
            >
                {isPending ? (
                    <Loader className="animate-spin size-4" />
                ) : (
                    <>
                        <Plus className="size-4" />
                        Add Chapter
                    </>
                )}
            </Button>
        </form>
    )
}

export default CreateChapter
