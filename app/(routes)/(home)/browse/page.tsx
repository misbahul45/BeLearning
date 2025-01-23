import { type SearchParams } from 'nuqs/server';
import ListCategory from '@/components/browse/ListCategory';
import { searchParamsCache } from '@/lib/nuqs';
import { getCategoryAction } from '@/actions/category.action';
import { Metadata } from 'next';
import ListCourses from '@/components/browse/ListCourses';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata: Metadata = {
  title: 'Be Learning | Courses',
  description: 'Temukan semua kursus yang Anda butuhkan di satu tempat.',
};

const Page = async ({ searchParams }: PageProps) => {
  const { search, category } = await searchParamsCache.parse(searchParams);
  const categories = await getCategoryAction();

  // Capitalize each word in the category
  const categoryCapitalized = category
    ? category
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ')
    : '';

  return (
    <div className="lg:p-8 p-4 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <ListCategory categories={categories} searchCategory={category || 'All'} />
        <div className="flex-1" />
      </div>
      <ListCourses search={search} category={category === 'all' ? '' : categoryCapitalized} />
    </div>
  );
};

export default Page;
