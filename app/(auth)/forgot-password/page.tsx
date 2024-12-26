import FormResetPassword from '@/components/features/FormResetPassword';
import ResetVerify from '@/components/features/ResetVerify';
import React from 'react';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const Page = ({ searchParams }: Props) => {
  const token = searchParams.token;
  const show = searchParams.show;

  console.log(token);
  return <div className='flex flex-col justify-center items-center h-screen gap-4 px-4 bg-gradient-to-r from-blue-800 to-purple-600'>
    {(show==='verify' ||!show) && <ResetVerify />}
    {show==='reset' && <FormResetPassword token={token || ''} />}
  </div>;
};

export default Page;
