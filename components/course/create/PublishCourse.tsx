'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { publishCourseAction } from '@/actions/course.action';
import toast from 'react-hot-toast';
import Loader from '@/components/Loaders/Loader';

interface PublishCourseProps {
  slug: string;
  course: {
    chapters:number;
    isPublished?: boolean;
  };
}

const PublishCourse: React.FC<PublishCourseProps> = ({ slug, course }) => {
  const [isPending, startTransition] = React.useTransition();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
          const result=await publishCourseAction(slug, !course?.isPublished);
          toast.success(`Course ${result.isPublished ? 'published' : 'unpublished'} successfully!`);
      } catch (error) {
          toast.error((error as Error).message); 
      }
    })
  };

  return (
    <form onSubmit={onSubmit}>
      <Button
        disabled={course?.chapters === 0}
        type="submit"
        variant={course?.isPublished ? 'outline' : 'default'}
        className="min-w-28"
      >
        {isPending?
          <Loader />
          :
          course.isPublished ? 'Unpublish' : 'Publish'
        }
      </Button>
    </form>
  );
};

export default PublishCourse;
