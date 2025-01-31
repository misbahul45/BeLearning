import { type SearchParams } from 'nuqs/server';
import { searchParamsCache } from '@/lib/nuqs';
import { getCategoryAction } from '@/actions/category.action';
import { Metadata } from 'next';
import ListCourses from '@/components/browse/ListCourses';
import AmountSlider from '@/components/browse/AmountSlider';
import prisma from '@/lib/prisma';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata: Metadata = {
  title: 'Be Learning | Courses',
  description: 'Temukan semua kursus yang Anda butuhkan di satu tempat.',
};

const Page = async ({ searchParams }: PageProps) => {
  const { search, category, maxPrice, minPrice} = await searchParamsCache.parse(searchParams);
  const categories = await getCategoryAction();

  const categoryCapitalized = category
    ? category
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ')
    : '';

    const maxPriceAggregation = await prisma.course.aggregate({
      _max: {
        price: true,
      },
    });
    


  return (
    <div className="lg:p-8 p-4 space-y-4">
      <div className="flex flex-col items-center lg:flex-row gap-4">
        <AmountSlider categories={categories} searchCategory={category || 'All'} maxPriceCourse={maxPriceAggregation._max.price} />
      </div>
      <ListCourses search={search} category={category === 'all' ? '' : categoryCapitalized} minPrice={minPrice} maxPrice={maxPrice?maxPrice:(maxPriceAggregation._max.price?maxPriceAggregation._max.price+100:1000000)} />
    </div>
  );
};

export default Page;
