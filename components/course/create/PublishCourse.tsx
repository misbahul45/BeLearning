'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { publishCourseAction } from '@/actions/course.action';
import toast from 'react-hot-toast';

interface PublishCourseProps {
  slug: string;
  course: {
    chapters:number;
    isPublished?: boolean;
  };
}

const PublishCourse: React.FC<PublishCourseProps> = ({ slug, course }) => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await  publishCourseAction(slug);
    } catch (error) {
        toast.error((error as Error).message); 
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Button
        disabled={course?.chapters === 0}
        type="submit"
        variant={course?.isPublished ? 'outline' : 'default'}
        className="min-w-28"
      >
        {course?.isPublished ? 'Unpublish' : 'Publish'}
      </Button>
    </form>
  );
};

export default PublishCourse;
