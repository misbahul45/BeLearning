"use client";

import { SIDE_LIST } from '@/constants/layout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { ArrowRightLeft, ListPlus, LogIn, LogOut } from 'lucide-react';
import { signoutAction } from '@/actions/auth.actions';
import clsx from 'clsx';

interface Props {
  userRole: 'ADMIN' | 'USER' | 'TEACHER';
  isLogin: boolean;
}

const SidenavHome = ({ userRole, isLogin }: Props) => {
  const pathName = usePathname();
  const [openNav, setOpenNav] = React.useState(true);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await signoutAction();
  };

  return (
    <aside
      className={clsx(
        'h-full hidden md:flex flex-col justify-between inset-y-0 z-50 border-r shadow-md overflow-y-auto py-6 relative transition-all duration-300 bg-white',
        openNav ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setOpenNav(!openNav)}
          className={clsx(
            'p-2 rounded-full bg-primary shadow text-white hover:bg-cyan-600 w-fit mx-auto transition-all duration-300',
            openNav && 'absolute top-4 right-4'
          )}
        >
          <ArrowRightLeft className="size-3" />
        </button>
      </div>

      

      {openNav && (
          <div>
            <Image 
              src="/images/logo.png" 
              alt="logo" 
              width={100} 
              height={100} 
              className="mx-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
            />
          </div>
        )}


      <nav className="flex-1 px-4 space-y-3 mt-6">
        {SIDE_LIST.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={clsx(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
              pathName === item.name
                ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                : 'text-gray-600 hover:bg-blue-100 hover:text-blue-500',
              !openNav && 'justify-center'
            )}
          >
            <item.icon className={clsx("text-lg", !openNav && "size-5")} />
            {openNav && (
              <span className="text-sm font-medium whitespace-nowrap">
                {item.name}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="px-4 space-y-4">

        { userRole === 'TEACHER' && (
          <Link href="/course/create">
            <Button
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md flex items-center justify-center"
            >
              <ListPlus className="size-4" />
             {openNav && <span className="ml-2 text-sm font-medium">Create Course</span>}
            </Button>
          </Link>
        )}

        <form onSubmit={handleLogout}>
        {isLogin?
            <Button 
              type="submit" 
              className={clsx(
                'w-full group hover:shadow-md',
                !openNav && 'p-2'
              )}
            >

                <LogOut className="size-4 group-hover:translate-x-0.5 transition-all duration-300" />
                  {openNav && <span className="ml-2 text-sm font-medium">Logout</span>}
            </Button>
            :
            <Link href="/sign-in">
              <Button 
                className={clsx(
                  'w-full group hover:shadow-md',
                  !openNav && 'p-2'
                )}
              >
                <LogIn className="size-4 group-hover:translate-x-0.5 transition-all duration-300" />
                  {openNav && <span className="ml-2 text-sm font-medium">Login</span>}
              </Button>
            </Link>

            }
        </form>
      </div>
    </aside>
  );
};

export default SidenavHome;
