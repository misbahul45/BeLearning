'use client';
import { motion } from 'framer-motion';
import { HEADER_LIST, SIDE_LIST } from '@/constants/layout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  user?: unknown;
}

const Header = ({ user }: Props) => {
  const pathName = usePathname();
  const [isShow, setIsShow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsShow(scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(()=>{
    let TimeOut:NodeJS.Timeout;

    if(isShow && isHovered){
      TimeOut = setTimeout(() => {
        setIsHovered(false);
      }, 1000);
    }

    return () => clearTimeout(TimeOut)
    
  },[isShow, isHovered])


  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
 
  if (
    (SIDE_LIST.some((item) => item.path.includes(pathName)) && pathName !== '/') ||
    pathName.includes('/profile') ||
    pathName.includes('/course') ||
    pathName.includes('/dashboard') ||
    pathName.includes('/browse')
  ) {
    return null;
  }

  return (
    <header
      ref={headerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed ${isShow || isHovered ? 'top-0' : '-top-10'} left-0 w-full z-50 flex justify-center transition-all duration-300`}
    >
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={isShow || isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="relative flex gap-3 mx-auto mt-4 rounded-lg border bg-white/80 backdrop-blur-lg p-2 shadow-md"
      >
        {HEADER_LIST.map((item) => (
          <Link
            href={item.path}
            key={item.id}
            className="relative flex items-center text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-200 group"
            aria-label={item.name}
          >
            <span
              className={`absolute inset-0 bg-blue-50 rounded-lg transition-transform duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 ${
                item.path === pathName ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              aria-hidden="true"
            />
            <span
              className={`relative font-semibold group-hover:text-blue-600 ${
                item.path === pathName ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
        {user ? (
          <>
            <Link href="/article/create">
              <Button variant={pathName==='/article/create' ? 'outline' : 'ghost'} className="h-full font-semibold">
                Write
              </Button>
            </Link>
            <Link href="/browse?category=all">
              <Button className="h-full font-semibold">App</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <Button variant="link" className="font-semibold">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
                Register
              </Button>
            </Link>
          </>
        )}
      </motion.nav>
    </header>
  );
};

export default Header;
