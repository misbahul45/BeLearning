'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import React, { useEffect, useState } from 'react'

interface Props {
  tags: { tag: string }[]
}

const SearchArticle = ({ tags }: Props) => {
    const pathName = usePathname();
    const router = useRouter()
    const [isFocused, setIsFocused] = useState(false)
    const [search, setSearch] = useQueryState('search', parseAsString.withDefault('').withOptions({ shallow: false }))
    const [tagData, setTag] = useQueryState('tag', parseAsString.withDefault('').withOptions({ shallow: false }))
    const [,setPage]=useQueryState('page', parseAsInteger.withDefault(1).withOptions({ shallow: false }))
    const tagsContainerRef = React.useRef<HTMLDivElement>(null)
    const tagRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())

    tags = [{ tag: 'All' }, ...tags]

    useEffect(() => {
      if (isFocused) {
        router.push('/article')
      }
    }, [router, isFocused])

    if (pathName.includes('/create')) {
      return null
    }

    const handleSearchByTag = (value: string) => {
      setPage(1);
      const targetButton = tagRefs.current.get(value)
      
      if (targetButton && tagsContainerRef.current) {
        targetButton.scrollIntoView({ 
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        })
      }

      if (value === 'All') {
        setTag('')
        return
      }
      setTag(value)
    }

    return (
      <div className='w-full max-w-6xl flex justify-between items-center mx-auto pt-5 pb-2'>
        <div className='relative'>
          <Input
            onFocus={() => setIsFocused(true)}     
            onBlur={() => setIsFocused(false)}
            type="text"  
            onChange={(e) => setSearch(e.target.value)} 
            value={search} 
            className='w-full max-w-xs pl-8 py-1 bg-gray-100' 
            placeholder='Search'
          />
          <Search 
            className={`size-5 absolute top-1/2 -translate-y-1/2 left-2 text-gray-400 ${search && "text-gray-600 scale-105"} transition-all duration-300`} 
          />
        </div>
        <div 
          ref={tagsContainerRef}
          className='w-full max-w-xl px-10 flex gap-2 overflow-auto scrollbar'
        >
          {tags.map((item, index) => (
            <Button 
              key={index} 
              type='button' 
              ref={(el) => {
                if (el) tagRefs.current.set(item.tag, el)
              }}
              onClick={() => handleSearchByTag(item.tag)} 
              variant={item.tag === tagData || (tagData === '' && item.tag === 'All') ? 'default' : 'secondary'} 
              className={`text-nowrap hover:scale-105 transition-all duration-100`}
            >
              {item.tag}
            </Button>
          ))}
        </div>
      </div>
    )
}

export default SearchArticle