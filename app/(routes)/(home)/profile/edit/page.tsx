import { getUserAction } from '@/actions/user.action';
import FormEditUser from '@/components/profile/FormEditUser';
import { auth } from '@/lib/auth';
import { USER } from '@/types/user.types';
import WEB_VALIDATION from '@/validations/web.validation';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const page = async ({ searchParams }: Props) => {
  try {
    const session = await auth();
    if (!session) return redirect('/login');

    const { email: userEmail } = await searchParams;
    if (!userEmail) return redirect('/browse?category=all');

    const emailResult = WEB_VALIDATION.EMAIl.safeParse({ email: userEmail });
    if (!emailResult.success) return redirect('/browse?category=all');

    if (userEmail !== session?.user.email) return redirect('/browse?category=all');

    const userLogin=await getUserAction(userEmail, {image: true, username: true, bio: true, email: true});

    return (
      <div className='pb-4'>
        <Link href="/profile" className="flex items-center gap-1 group ml-4 mt-4">
          <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-all duration-75" />
          <p className="text-xl font-bold bg-gradient-to-r text-primary group-hover:text-blue-400">Profile Avatar</p>
        </Link>
        <FormEditUser user={userLogin as USER}  />
      </div>
    )
    

  } catch (error) {
    if(error){
      return redirect('/browse?category=all');
    }
  }
};

export default page;
