'use client';
import { Button } from '@/components/ui/button';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import React from 'react';
import { useRouter } from 'next/navigation';

const ButtonTag = ({ tag, className }: { tag: string; className?: string }) => {
  const router = useRouter();
  const [, setTag] = useQueryState('tag', parseAsString.withDefault('').withOptions({ shallow: false, history: 'push' }));
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({ shallow: false }));

  const handleToggleTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Update query state
    setPage(1);
    setTag(tag);

    // Ensure navigation to /article
    router.push(`/article?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <Button onClick={handleToggleTag} type="button" className={`transition-all duration-100 ${className}`}>
      {tag}
    </Button>
  );
};

export default ButtonTag;
