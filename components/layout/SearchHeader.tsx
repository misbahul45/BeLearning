'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { useRouter } from 'next/navigation'

const SearchHeader = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useQueryState('search',parseAsString.withDefault('').withOptions({
    shallow: false
  }))
  const router=useRouter()


  useEffect(()=>{
    if(isFocused){
        router.push(`/browse?query=all`)
    }
  },[router, isFocused])





  return (
    <form className="relative">
      <div className={`transition-all duration-300 ease-in-out sm:text-md text-sm ${isFocused || search !=='' ? 'sm:w-96 w-64' : 'sm:w-56 w-40'}`}>
        <Input
          placeholder="Search Course"
          className="pl-7 ring-2 focus:ring-primary"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setSearch(e.target.value)}
          value={search || ''}
        />
        <Search className={`absolute top-1/2 left-2 -translate-y-1/2 h-4 w-4 ${search !== '' ? 'text-primary' : 'text-muted-foreground'} `} />
      </div>
    </form>
  )
}

export default SearchHeader