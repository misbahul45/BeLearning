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

const ITEMS_PER_PAGE = 15;

const Page = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
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
      <div className="p-2 md:p-4 space-y-4 md:space-y-6">
        <div className="mb-4 md:mb-6">
          <SearchAdminArticle />
        </div>
        
        <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  {headtable.map((item) => (
                    <TableHead
                      className={clsx(
                        'text-center font-medium text-gray-700 px-2 md:px-4',
                        item.name === 'Title' && 'text-left',
                        item.name === 'No' && 'w-12 md:w-16',
                        item.name === 'Status' && 'w-24 md:w-32',
                        item.name === 'Action' && 'w-16 md:w-24'
                      )}
                      key={item.id}
                    >
                      {item.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article, index) => (
                  <TableRow 
                    key={article.slug}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium text-gray-600 text-xs md:text-sm px-2 md:px-4">
                      {skip + index + 1}
                    </TableCell>
                    <TableCell className="px-2 md:px-4">
                      <div className="flex items-start gap-2 md:gap-4 py-2">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={article.cover?.url || '/placeholder.jpg'}
                            alt={article.title || 'No Title'}
                            width={100}
                            height={100}
                            className="object-cover rounded-lg size-16 md:size-20"
                          />
                        </div>
                        <div className="min-w-0 flex-1 space-y-1 md:space-y-2">
                          <h3 className="font-semibold text-sm md:text-base line-clamp-2 text-gray-900">
                            {article.title}
                          </h3>
                          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                            <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
                              By <span className="font-medium text-gray-900">{article.author?.username || 'Unknown'}</span>
                            </p>
                            <p className="text-xs md:text-sm text-gray-500 hidden md:block">•</p>
                            <p className="text-xs md:text-sm text-gray-500">
                              {new Date(article.updatedAt).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500 hidden md:block">•</p>
                            <p className="text-xs md:text-sm text-gray-500">
                              <span className="font-medium text-gray-900">{article.viewCount}</span> views
                            </p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-2 md:px-4">
                      <div
                        className={clsx(
                          'text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-full text-center inline-block w-full max-w-20 md:max-w-24',
                          {
                            'bg-green-100 text-green-700': article.status === 'PUBLISHED',
                            'bg-yellow-100 text-yellow-700': article.status === 'APPROVED',
                            'bg-red-100 text-red-700': article.status === 'DRAFT'
                          }
                        )}
                      >
                        {article.status}
                      </div>
                    </TableCell>
                    <TableCell className="px-2 md:px-4">
                      <div className="flex justify-center">
                        <Link href={`/dashboard/admin/article/${article.slug}`}>
                          <Button 
                            size="icon"
                            variant="ghost"
                            className="size-8 md:size-10 hover:bg-gray-100"
                          >
                            <BookOpenCheckIcon className="size-4 md:size-5" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 md:mt-6 px-2">
          <Link
            href={`?page=${page > 1 ? page - 1 : 1}`}
            className={clsx(
              'px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors',
              page === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            )}
          >
            Previous
          </Link>
          <p className="text-xs md:text-sm font-medium text-gray-700">Page {page}</p>
          <Link
            href={`?page=${parseInt(page +'', 10) + 1}`}
            className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-medium transition-colors"
          >
            Next
          </Link>
        </div>
      </div>
    );
  } catch {
    return (
      <div className="p-4 rounded-lg bg-red-50 text-red-500 text-sm">
        Failed to load articles. Please try again later.
      </div>
    );
  }
};

export default Page;