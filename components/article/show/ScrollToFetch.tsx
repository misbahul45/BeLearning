'use client';
import { countArticlesAction } from '@/actions/article.action';
import { parseAsInteger, useQueryState } from 'nuqs';
import React, { useState, useEffect, useRef } from 'react';

interface Props{
  search:string
  tag:string
}


const ScrollToFetch = ({ search, tag }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [countArticles, setCountArticles] = useState(0);

  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ shallow: false, history: 'push' })
  );
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCountArticles = async () => {
      const total = await countArticlesAction(search, tag);
      setCountArticles(total);
    };

    fetchCountArticles();
  }, [search, tag]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);


  useEffect(() => {
    if (isVisible && countArticles > 6 * page) {
      setPage((prevPage) => prevPage + 1);
      setIsVisible(false);
    }
  }, [isVisible, setPage, countArticles, page]);

  return (
    <div
      ref={elementRef}
    />
  );
};

export default ScrollToFetch;
