'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [scrollbar, setScrollbar] = useState(0);
  const pathName=usePathname()
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollbar(scrollPercentage);
      }
    };

    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(()=>{
    if(pathName){
      setScrollbar(0)
    }
  },[pathName])

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto scrollbar relative">
      <div
        style={{ width: `${scrollbar}%` }}
        className="fixed top-0 left-0 h-1.5 bg-primary z-50"
      />
      {children}
    </div>
  );
};

export default Wrapper;
