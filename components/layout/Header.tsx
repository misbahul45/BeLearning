'use client';
import { motion } from 'motion/react';
import { HEADER_LIST, SIDE_LIST } from '@/constants/layout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

interface Props{
  user?:unknown
}

const Header = ({ user }: Props) => {
  const pathName = usePathname();

  if (SIDE_LIST.some((item) => item.path.includes(pathName)) && pathName !== '/' || pathName.includes('/profile') || pathName.includes('/course')) {
    return null;
  }

  return (
    <motion.header
    initial={{ opacity: 0, y: -50 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 1.5 }} 
    className="fixed backdrop-blur-sm top-0 left-0 w-full z-50 flex justify-center">
      <nav className="relative flex gap-3 mx-auto mt-4 rounded-lg border bg-white/80 backdrop-blur-sm p-1 shadow-sm">
        {HEADER_LIST.map((item) => (
          <Link
            href={item.path}
            key={item.id}
            className="relative flex items-center text-sm px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 group"
          >
            <span 
              className={`absolute inset-0 bg-blue-50 rounded-lg transition-transform duration-200 ease-out group-hover:scale-100 group-hover:opacity-100  ${
                item.path === pathName 
                  ? 'scale-100 opacity-100' 
                  : 'scale-0 opacity-0'
              }`}
              aria-hidden="true"
            />
            
            <span className={`relative font-semibold group-hover:text-blue-600 ${
              item.path === pathName ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {item.name}
            </span>
          </Link>
        ))}
        {user?
          <>
            <Link href={'/article/create'} className='h-full'>
              <Button variant={'outline'} className={`h-full font-semibold flex items-center gap-0.5 group`}>
                Write
              </Button>
            </Link>
            <Link href={'/browse?category=all'} className='h-full'>
              <Button className='h-full font-semibold flex items-center gap-0.5 group'>
                App
              </Button>
            </Link>
          </>
          :
          <>
            <Link
              href={'/sign-in'}
              className="relative flex items-center text-sm px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 group"
            >
              <span 
                className={`absolute inset-0 bg-blue-50 rounded-lg transition-transform duration-200 ease-out group-hover:scale-100 group-hover:opacity-100  ${
                  pathName ==='/sign-in' 
                    ? 'scale-100 opacity-100' 
                    : 'scale-0 opacity-0'
                }`}
                aria-hidden="true"
              />
              
              <span className={`relative font-semibold group-hover:text-blue-600 ${
                pathName==='/sign-in' ? 'text-blue-600' : 'text-gray-600'
              }`}>
                Sign In
              </span>
            </Link>

            <Link
              href={'/sign-up'}
              className="relative flex items-center text-sm px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 group bg-primary hover:bg-transparent"
            >
              <span 
                className={`absolute rounded-lg inset-0 transition-transform duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700  ${
                  pathName ==='/sign-up' 
                    ? 'scale-100 opacity-100' 
                    : 'scale-0 opacity-0'
                }`}
                aria-hidden="true"
              />
              
              <span className={`relative font-semibold text-white`}>
                Register
              </span>
            </Link>
          </>
        }
      </nav>
    </motion.header>
  );
};

export default Header;