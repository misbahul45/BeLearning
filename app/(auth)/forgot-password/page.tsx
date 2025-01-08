import FormResetPassword from '@/components/auth/FormResetPassword';
import ResetVerify from '@/components/auth/ResetVerify';
import React from 'react';

interface Props {
  searchParams: Promise<{
    token?:string,
    show?:string
  }>
}

const Page = async (props: Props) => {
  const searchParams = await props.searchParams;
  const token = await searchParams.token;
  const show = await searchParams.show;

  return <div className='flex flex-col justify-center items-center h-screen gap-4 px-4 bg-gradient-to-r from-blue-800 to-purple-600'>
    {(show==='verify' ||!show) && <ResetVerify />}
    {show==='reset' && <FormResetPassword token={token || ''} />}
  </div>;
};

export default Page;
