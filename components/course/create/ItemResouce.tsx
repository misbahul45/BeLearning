'use client'
import { deleteResourceAction } from '@/actions/resource.action'
import { Button } from '@/components/ui/button'
import { GithubIcon, File, Loader, Trash2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'

interface Props {
  id: string
  title: string,
  url: string,
  courseSlug: string
}

const ItemResource = ({ title, url, id, courseSlug }: Props) => {
  const [isPending, startTransition] = React.useTransition();
  const [isHovered, setIsHovered] = React.useState(false);

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await deleteResourceAction(id, courseSlug);
        toast.success('Resource deleted successfully!');
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  }

  const isGithubLink = url.includes('github');

  return (
    <div 
      className="group relative overflow-hidden rounded-lg border-2 border-slate-300 bg-slate-50 transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between px-2 py-1">
        <Link 
          href={url} 
          target="_blank"
          className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-1"
        >
          <div className="rounded-full bg-slate-100 p-1 transition-all duration-300 group-hover:shadow-md">
            {isGithubLink ? (
              <GithubIcon className="size-4 text-slate-600 transition-all duration-300 group-hover:scale-110" />
            ) : (
              <File className="size-4 text-slate-600 transition-all duration-300 group-hover:scale-110" />
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 transition-all duration-300 group-hover:text-slate-900">
              {title}
            </span>
            <ChevronRight className={`
              size-3 text-slate-400
              transition-all duration-300
              ${isHovered ? 'opacity-100' : 'opacity-0'}
              ${isHovered ? 'translate-x-0' : '-translate-x-2'}
            `} />
          </div>
        </Link>

        <form onSubmit={handleDelete}>
          <Button 
            disabled={isPending} 
            size={'sm'} 
            variant={'ghost'} 
            type='submit'
            className="group/button h-7 w-7 p-0 hover:bg-slate-100 transition-all duration-300"
          >
            {isPending ? (
              <Loader className="size-3 animate-spin text-slate-500" />
            ) : (
              <Trash2 className="size-3 text-slate-600 transition-all duration-300 group-hover/button:scale-110" />
            )}
          </Button>
        </form>
      </div>

      <div className={`
        absolute bottom-0 left-0 h-0.5 w-full bg-slate-300
        transition-all duration-700
        ${isHovered ? 'opacity-100' : 'opacity-0'}
        ${isHovered ? 'scale-x-100' : 'scale-x-0'}
      `} />
    </div>
  )
}

export default ItemResource