import { handleRotate } from '@/lib/utils'
import React from 'react'

const RecomTagsLoader = () => {
  return (
    <>
        <div className='w-full max-w-sm mx-auto h-6 bg-gray-200 animate-pulse rounded' />
        <div className='flex flex-wrap w-full justify-center mx-auto px-2 py-2.5 max-w-5xl'>
            {Array.from({ length:Math.floor(Math.random()*12)+5 }).map((item, index)=>(
                <div key={index} className={`px-8 py-2`} style={{ transform: `${handleRotate(index)}` }}>
                    <button type='button' className={`text-nowrap hover:rotate-2 transition-all duration-100`}>
                        <div className='w-20 h-8 bg-gray-300 animate-pulse rounded-md' />
                    </button>
                </div>
            ))}
        </div>
    </>
  )
}

export default RecomTagsLoader