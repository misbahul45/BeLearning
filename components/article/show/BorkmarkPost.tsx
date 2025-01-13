'use client';
import React from 'react';
import { Bookmark, BookmarkPlus, Loader2 } from 'lucide-react';
import { saveArticleAction } from '@/actions/article.action';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface Props {
  userId: string;
  slug: string;
  isSaved: boolean;
}

const BookmarkPost = ({ userId, slug, isSaved }: Props) => {
  const handleSaveArticle = () =>{
    if(isSaved){
      toast.success('Article removed from bookmarks.');
    }else{
      toast.success('Article added to bookmarks.');
    }
    return saveArticleAction(slug, userId);
  }

  const [,formAction, isPending] = React.useActionState(
    handleSaveArticle,
    isSaved
  );



  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        aria-label={isSaved ? 'Remove bookmark' : 'Add bookmark'}
        className={clsx(
          'p-2 rounded-full shadow-md transition-all duration-200 disabled:opacity-85 disabled:cursor-not-allowed',
          isSaved
            ? 'bg-orange-600 hover:bg-red-700 text-white'
            : 'bg-yellow-500 hover:bg-yellow-600 text-red-600'
        )}
      >
        {isPending ? (
          <Loader2 className="sm:size-5 size-3 animate-spin text-white" />
        ) : (
          <>
            {isSaved ? (
              <Bookmark className="sm:size-5 size-3" />
            ) : (
              <BookmarkPlus className="sm:size-5 size-3" />
            )}
          </>
        )}
      </button>
    </form>
  );
};

export default BookmarkPost;
