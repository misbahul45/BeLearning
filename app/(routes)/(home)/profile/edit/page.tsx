import { getUserAction } from '@/actions/user.action';
import FormEditUser from '@/components/profile/FormEditUser';
import { auth } from '@/lib/auth';
import { USER } from '@/types/user.types';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';


const page = async () => {
  try {
    const session = await auth();
    const userEmail = session?.user.email as string;

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
