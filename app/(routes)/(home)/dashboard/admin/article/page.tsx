import { getArticlesAction } from '@/actions/article.action';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import clsx from 'clsx';
import { BookOpenCheckIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type SearchParams } from 'nuqs';
import React from 'react';
import { searchParamsCache } from '@/lib/nuqs';
import SearchAdminArticle from '@/components/dashboard/admin/SearchAdminArticle';

const headtable = [
  { id: 1, name: 'No' },
  { id: 2, name: 'Title' },
  { id: 3, name: 'Status' },
  { id: 4, name: 'Action' },
];

const ITEMS_PER_PAGE = 20;

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: PageProps) => {
  const { page = 1, article, orderBy } = await searchParamsCache.parse(searchParams);
  const skip = (page - 1) * ITEMS_PER_PAGE;

  try {
    const articles = await getArticlesAction({
      slug: true,
      title: true,
      content: true,
      author: true,
      cover: true,
      updatedAt: true,
      by: orderBy as "ASC" | "DESC" | "COMMENTS" | "VIEWS" | "SAVES" | undefined,
      take: ITEMS_PER_PAGE,
      skip,
      status: 'ALL',
      search: article,
    });

    return (
      <div className="p-4">
        <SearchAdminArticle />
        <Table>
          <TableHeader>
            <TableRow>
              {headtable.map((item) => (
                <TableHead
                  className={clsx('text-center', item.name === 'Title' && 'text-left')}
                  key={item.id}
                >
                  {item.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article, index) => (
              <TableRow key={article.slug}>
                <TableCell className="text-center font-semibold text-sm px-3.5 py-2 rounded-md">
                  {skip + index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-2 w-full max-w-xl">
                    <Image
                      src={article.cover?.url || '/placeholder.jpg'}
                      alt={article.title || 'No Title'}
                      width={100}
                      height={100}
                      className="object-cover size-16"
                    />
                    <div className="space-y-1 w-full">
                      <div className="flex gap-2">
                        <p className="font-semibold">{article.title}</p>
                      </div>
                      <div className="flex gap-6 items-center">
                        <p className="text-sm text-gray-400">
                          By <span className="font-semibold text-black">{article.author?.username || 'Unknown'}</span>
                        </p>
                        <p>
                          {new Date(article.updatedAt).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        <p className='text-sm text-nowrap text-gray-400'>View :<span className='font-semibold text-black'>{article.viewCount}</span></p>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`text-xs text-center ${
                      article.status === 'PUBLISHED'
                        ? 'text-green-600 bg-green-200 p-1.5 rounded'
                        : article.status === 'APPROVED'
                        ? 'bg-yellow-200 text-yellow-600 p-1.5 rounded'
                        : 'bg-red-200 text-red-600 p-1.5 rounded'
                    }`}
                  >
                    {article.status}
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/admin/article/${article.slug}`}>
                    <Button size={'icon'}>
                      <BookOpenCheckIcon />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Link
            href={`?page=${page > 1 ? page - 1 : 1}`}
            className={clsx('px-4 py-2 bg-gray-200 rounded', page === 1 && 'opacity-50 pointer-events-none')}
          >
            Previous
          </Link>
          <p className="text-sm font-semibold">Page {page}</p>
          <Link
            href={`?page=${parseInt(page +'', 10) + 1}`}
            className={clsx('px-4 py-2 bg-gray-200 rounded')}
          >
            Next
          </Link>
        </div>
      </div>
    );
  } catch{
    return <div className="p-4 text-red-500">Failed to load articles. Please try again later.</div>;
  }
};

export default Page;
