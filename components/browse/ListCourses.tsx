import React from 'react';
import ItemCourse from './ItemCourse';
import { getAllCoursesAction } from '@/actions/course.action';
import { SearchX } from 'lucide-react';

interface Props {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

const ListCourses = async ({ search, category, minPrice, maxPrice }: Props) => {
  const courses = await getAllCoursesAction(search, category, minPrice, maxPrice);

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
        <SearchX className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No courses found
        </h3>
        <p className="text-gray-500 max-w-md mb-6">
          {search 
            ? `We couldn't find any courses matching "${search}"`
            : category
            ? `No courses found in the "${category}" category`
            : "No courses are available at the moment"}
        </p>
        <p className="text-gray-500">
          Try adjusting your search or browse other categories
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courses.map((course) => (
        <ItemCourse 
          key={course.slug}
          id={course.id}
          title={course.title}
          cover={course.cover ?? { url: '' }}
          slug={course.slug}
          category={course.category}
          author={{
            username: course.author.username,
            profile: {
              image: {
                url: course.author.profile?.image?.url || ''
              }
            }
          }}
          chaptersLength={course.chapters.length}
          price={course.price}
          createdAt={course.createdAt}
        />
      ))}
    </div>
  );
};

export default ListCourses;