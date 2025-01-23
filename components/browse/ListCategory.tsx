'use client'
import { parseAsString, useQueryState } from 'nuqs'
import React from 'react'

interface Props{
  searchCategory: string
  categories:{
    id:string,
    name:string
  }[]
}

const ListCategory = ({searchCategory, categories}:Props) => {
  const [,setCategory] = useQueryState('category', parseAsString.withDefault('').withOptions({
    shallow: false
  }))
  categories=[{ id:'all', name:'All' }, ...categories]
  const categoryRef=React.useRef<Map<string ,HTMLButtonElement>>(new Map())

  const handleChange=(value:string)=>{
    setCategory(value.toLowerCase())
    const targetButton = categoryRef.current.get(value.toLowerCase())
    if(targetButton) {
      targetButton.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }


  return (
    <div className='flex-1 flex gap-4 items-center overflow-x-auto md:[mask-image:none] [mask-image:_linear-gradient(to_right,_transparent_0,_white_12px,white_calc(100%-128px),_transparent_100%)] pl-4 overflow-auto scrollbar'>
      {categories.map((item) => (
        <button
          key={item.id}
          ref={(el) =>{
            if(el) categoryRef.current.set(item.name.toLowerCase(), el)
          }}
          onClick={()=>handleChange(item.name.toLowerCase())}
          className={`text-xs px-2.5 text-nowrap py-2 font-semibold rounded shadow-md hover:bg-primary hover:text-white transition-all duration-300 ${
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
