'use client';
import React from 'react';
import { getSavedCoursesAction, saveCourseAction } from '@/actions/course.action';
import { Heart } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../Loaders/LoadingSpinner';
import useFetchQuery from '@/hooks/useFetchQuery';

interface Props {
  courseId: string;
  userId: string | null;
}



const ButtonSaveCourses: React.FC<Props> = ({ courseId, userId }) => {
  const queryClient = useQueryClient();

  const { data: savedCourse, isLoading } = useFetchQuery({
    queryKey: ['saved', courseId, userId],
    queryFn() {
      return getSavedCoursesAction(userId||"", courseId);
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: () => saveCourseAction(userId||"", courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved', courseId, userId] });
    },
  });

  return (
    <button
      className={`
        p-2 rounded-full transition-all duration-300 
        bg-gradient-to-r from-pink-500 to-rose-500 
        hover:from-pink-600 hover:to-rose-600
        transform hover:scale-110 focus:outline-none
        disabled:opacity-70 disabled:cursor-not-allowed
        disabled:hover:scale-100
        flex items-center justify-center
      `}
      onClick={() => mutate()}
      disabled={isPending || isLoading}
    >
      {isLoading || isPending ? (
        <LoadingSpinner />
      ) : (
        <Heart 
          className={`
            transition-all duration-300
            size-5
            ${savedCourse?.id 
              ? 'fill-white stroke-white' 
              : 'stroke-white hover:animate-pulse'
            }
          `}
        />
      )}
    </button>
  );
};

export default ButtonSaveCourses;