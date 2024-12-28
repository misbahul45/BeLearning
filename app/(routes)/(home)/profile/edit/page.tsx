import FormEditUser from '@/components/profile/FormEditUser';
import FormImage from '@/components/profile/formImage';
import { auth } from '@/lib/auth';
import WEB_VALIDATION from '@/validations/web.validation';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const page = async ({ searchParams }: Props) => {
  try {
    const session = await auth();
    if (!session) return redirect('/login');

    let userEmail = searchParams.email;
    if (!userEmail) return redirect('/browse?category=all');

    const emailResult = WEB_VALIDATION.EMAIl.safeParse({ email: userEmail });
    if (!emailResult.success) return redirect('/browse?category=all');

    if (userEmail !== session?.user.email) return redirect('/browse?category=all');

    return (
      <div className='h-screen overflow-y-auto'>
        <FormImage userImage={session.user.image as string} />
        <FormEditUser />
      </div>
    )
    

  } catch (error) {
    return redirect('/error?message=Something went wrong');
  }
};

export default page;
