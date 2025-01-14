'use client'
import { DUMMY_CATEGORY } from '@/constants/browse'
import { parseAsString, useQueryState } from 'nuqs'
import React from 'react'

interface Props{
  searchCategory: string
}

const ListCategory = ({searchCategory}:Props) => {
  const [, setCategory] = useQueryState('category', parseAsString.withDefault('').withOptions({
    shallow: false
  }))


  return (
    <div className='flex gap-4 items-center w-full overflow-x-auto md:[mask-image:none] [mask-image:_linear-gradient(to_right,_transparent_0,_white_12px,white_calc(100%-128px),_transparent_100%)] pl-4'>
      {DUMMY_CATEGORY.map((item) => (
        <button
          key={item.id}
          onClick={() => setCategory(item.name.toLowerCase())}
          className={`text-sm px-4 text-nowrap py-2 rounded shadow-md hover:bg-primary hover:text-white transition-all duration-300 ${
            searchCategory === item.name.toLowerCase() ? 'bg-primary text-white' : 'bg-slate-100'
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}

export default ListCategory
