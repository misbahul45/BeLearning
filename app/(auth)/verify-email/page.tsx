import VerifyForm from '@/components/auth/VerifyForm';
import { searchParamsCache } from '@/lib/nuqs';
import { type SearchParams } from 'nuqs';
import React from 'react'

type PageProps = {
  searchParams: Promise<SearchParams>
}

const Page =async({ searchParams }: PageProps) => {
  const {token}=await searchParamsCache.parse(searchParams);

  return (
    <div>
      <VerifyForm token={token} />
    </div>
  );
}

export default Page;
