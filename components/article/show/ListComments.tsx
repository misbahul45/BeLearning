'use client';
import React, { useEffect, useRef } from 'react';
import FormComment from '../create/FormComment';
import ItemComent from './ItemComent';

interface User {
  id?: string;
}

interface Comment {
  user: {
    id: string;
    username: string;
    profile: {
      image: {
        url: string;
      } | null;
    } | null;
  };
  message: string;
  id: string;
  userId: string;
  parentId: string | null;
  createdAt: Date;
}

interface Props {
  comments: Comment[] | null;
  articleId: string;
  user: User;
  authorId?: string;
}

const ListComments: React.FC<Props> = ({ comments, articleId, user, authorId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      containerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-5">
      <FormComment articleId={articleId} userId={user?.id || ''} />
      <div
        ref={containerRef}
        className="min-h-screen space-y-4"
        aria-label="List of comments"
      >
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <ItemComent
              key={comment.id}
              createdAt={comment.createdAt}
              isAuthor={comment.userId === authorId}
              message={comment.message}
              articleId={articleId}
              user={comment.user}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default ListComments;
