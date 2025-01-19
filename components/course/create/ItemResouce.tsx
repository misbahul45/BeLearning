'use client'
import { deleteResourceAction } from '@/actions/resource.action'
import { Button } from '@/components/ui/button'
import { GithubIcon, File ,Loader, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'


interface Props {
  id:string
  title:string,
  url:string,
}

const ItemResouce = ({ title, url, id}:Props) => {
  const params=useParams();
  const [isPending, startTransition] = React.useTransition();

  const handleDelete=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    startTransition(async () => {
      try {
        await deleteResourceAction(id, params.slug as string);
        toast.success('Resource deleted successfully!');
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  }

  return (
    <div className='flex justify-between items-center px-2 py-1 rounded bg-slate-200 shadow border-2 group'>
      <Link href={url} className='flex gap-2 items-center'>
        {url.includes('github')?
          <GithubIcon className='size-5' />
          :
          <File className='size-5' />
        }
        <span className='text-sm font-semibold text-slate-500 group-hover:text-black transition-all duration-300'>{title}</span>
      </Link>
      <form onSubmit={handleDelete}>
        <Button disabled={isPending} size={'icon'} variant={'destructive'} type='submit'>
          {isPending?
          <Loader className='mr-2 h-4 w-4 animate-spin' />
            :
            <Trash2 className='size-5 text-white' />  
          }
        </Button>
      </form>
    </div>
  )
}

export default ItemResouce