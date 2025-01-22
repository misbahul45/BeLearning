'use client';
import { countArticlesAction } from '@/actions/article.action';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
} from '@/components/ui/pagination';
import { parseAsInteger, useQueryState } from 'nuqs';
import React, { useState, useEffect } from 'react';

interface Props {
  search: string;
  tag: string;
  itemsPerPage?: number;
}

const ArticlePagination = ({ search, tag }: Props) => {
  const [countArticles, setCountArticles] = useState(0);
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ shallow: false, history: 'push' })
  );

  const totalPages = Math.ceil(countArticles / 6);

  useEffect(() => {
    const fetchCountArticles = async () => {
      const total = await countArticlesAction(search, tag);
      setCountArticles(total);
    };

    fetchCountArticles();
  }, [search, tag]);

  if (countArticles<=6) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <Button 
              variant={page === i ? 'default' : 'outline'} 
              onClick={() => handlePageChange(i)} 
              size={'icon'}
            >
              {i}
            </Button>
          </PaginationItem>
        );
      }
    } else {
      pageNumbers.push(
        <PaginationItem key={1}>
          <Button 
            variant={page === 1 ? 'default' : 'outline'} 
            onClick={() => handlePageChange(1)} 
            size={'icon'}
          >
            1
          </Button>
        </PaginationItem>
      );
      
      // Add "..." if there are more than 5 pages
      if (page > 3) {
        pageNumbers.push(
          <PaginationItem key={'ellipsis-start'}>
            <Button variant={'outline'} disabled>
              ...
            </Button>
          </PaginationItem>
        );
      }
      
      // Show 2 pages around the current page
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <Button 
              variant={page === i ? 'default' : 'outline'} 
              onClick={() => handlePageChange(i)} 
              size={'icon'}
            >
              {i}
            </Button>
          </PaginationItem>
        );
      }

      // Add "..." at the end if there are more than 5 pages
      if (page < totalPages - 2) {
        pageNumbers.push(
          <PaginationItem key={'ellipsis-end'}>
            <Button variant={'outline'} disabled>
              ...
            </Button>
          </PaginationItem>
        );
      }

      // Show the last page
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <Button 
            variant={page === totalPages ? 'default' : 'outline'} 
            onClick={() => handlePageChange(totalPages)} 
            size={'icon'}
          >
            {totalPages}
          </Button>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button 
              variant={'outline'} 
              onClick={() => handlePageChange(page - 1)} 
              disabled={page === 1}
            >
              Prev
            </Button>
          </PaginationItem>

          {renderPageNumbers()}

          {/* Next Button */}
          <PaginationItem>
            <Button 
              variant={'outline'} 
              onClick={() => handlePageChange(page + 1)} 
              disabled={page === totalPages}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ArticlePagination;
