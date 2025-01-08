import React from 'react'

const ItemLoader=()=>{
    return(
        <div className='bg-slate-300 animate-pulse p-4 rounded-lg space-y-6'>
            <div className="w-full h-48 bg-slate-200 animate-pulse rounded-t-lg"></div>
            <div className="w-full h-16 bg-slate-200 animate-pulse rounded-lg"/>
        </div>
    )
}

const ArticleLoader = () => {
  return (
    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
        {[...Array(6)].map((_, index) =>
            <ItemLoader key={index} />
        )}
    </div>
  )
}

export default ArticleLoader