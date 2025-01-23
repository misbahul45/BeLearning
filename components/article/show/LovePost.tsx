'use client'
import React from 'react'
import { Loader2, Heart as Love } from 'lucide-react';
import { likeArticleAction } from '@/actions/article.action';
import clsx from 'clsx';

interface Props {
  userId: string;
  slug: string;
  isLoved: boolean;
  size?:'sm'|'lg'
}

const LovePost = ({ userId, slug, isLoved, size='sm' }: Props) => {
  const handleLikePost = () => {
    return likeArticleAction(slug, userId);
  }

  const [, formAction, isPending] = React.useActionState(
    handleLikePost,
    isLoved
  )

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        aria-label={isLoved ? 'Remove bookmark' : 'Add bookmark'}
        className={clsx(
          'p-2 rounded-full shadow-md transition-all duration-200 disabled:opacity-85 disabled:cursor-not-allowed',
          isLoved
            ? 'bg-rose-500 hover:bg-rose-600' 
            : 'bg-gray-100 hover:bg-gray-200' 
        )}
      >
        {isPending ? (
          <Loader2 className={`${size==='sm'?'sm:size-5 size-3':'sm:size-7 size-5'}  animate-spin text-gray-600`} />
        ) : (
          <>
            {isLoved ? (
              <Love className={`${size==='sm'?'sm:size-5 size-3':'sm:size-7 size-5'}  text-white`} />
            ) : (
              <Love className={`${size==='sm'?'sm:size-5 size-3':'sm:size-7 size-5'}  text-rose-500`} />
            )}
          </>
        )}
      </button>
    </form>
  )
}

export default LovePost