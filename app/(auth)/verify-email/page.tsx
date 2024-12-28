import VerifyForm from '@/components/auth/VerifyForm';
import React from 'react'

interface Props {
  searchParams: {
    token?: string;
  };
}

const Page =async({ searchParams }: Props) => {
  const {token}=await searchParams

  return (
    <div>
      <VerifyForm token={token} />
    </div>
  );
}

export default Page;
