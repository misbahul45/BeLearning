'use client'
import { deleteChapterAction } from '@/actions/chapter.action'
import { Button } from '@/components/ui/button'
import { Loader, Trash2, BookTextIcon, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface Props {
  id: string
  title: string,
  slug: string
}

const ItemChapter = ({ title, id, slug }: Props) => {
  const params = useParams();
  const [isPending, startTransition] = React.useTransition();
  const [isHovered, setIsHovered] = React.useState(false);

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await deleteChapterAction(id, params.slug as string);
        toast.success('Resource deleted successfully!');
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  }

  return (
    <div 
      className={`
        group relative overflow-hidden rounded-lg border-2 
        ${title ? 'border-green-400 bg-green-50' : 'border-yellow-400 bg-yellow-50'}
        transition-all duration-300 hover:shadow-lg
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between px-2 py-1">
        <Link 
          href={`/course/create/${slug}/upload?chapterId=${id}`} 
          className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-1"
        >
          <div className={`
            rounded-full p-1
            ${title ? 'bg-green-100' : 'bg-yellow-100'}
            transition-all duration-300 group-hover:shadow-md
          `}>
            <BookTextIcon className={`
              size-4
              ${title ? 'text-green-600' : 'text-yellow-600'}
              transition-all duration-300 group-hover:scale-110
            `} />
          </div>
          
          <div className="flex flex-col">
            <span className={`
              text-xs font-semibold
              ${title ? 'text-green-700' : 'text-yellow-700'}
              transition-all duration-300 group-hover:text-slate-900
            `}>
              {title || "New Chapter"}
            </span>
          </div>
          
          <ChevronRight className={`
            size-3 text-slate-400
            transition-all duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
            ${isHovered ? 'translate-x-0' : '-translate-x-2'}
          `} />
        </Link>

        <form onSubmit={handleDelete}>
          <Button 
            disabled={isPending} 
            size={'sm'} 
            variant={'ghost'} 
            type='submit'
            className={`
              group/button h-7 w-7 p-0
              ${title ? 'hover:bg-green-100' : 'hover:bg-yellow-100'}
              transition-all duration-300
            `}
          >
            {isPending ? (
              <Loader className="size-3 animate-spin text-slate-500" />
            ) : (
              <Trash2 className={`
                size-3
                ${title ? 'text-green-600' : 'text-yellow-600'}
                transition-all duration-300
                group-hover/button:scale-110
              `} />
            )}
          </Button>
        </form>
      </div>

      <div className={`
        absolute bottom-0 left-0 h-0.5 w-full
        ${title ? 'bg-green-400' : 'bg-yellow-400'}
        transition-all duration-700
        ${isHovered ? 'opacity-100' : 'opacity-0'}
        ${isHovered ? 'scale-x-100' : 'scale-x-0'}
      `} />
    </div>
  )
}

export default ItemChapter