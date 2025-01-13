import { getTagsAction } from '@/actions/tags.action'
import { Button } from '@/components/ui/button'
import { handleRotate } from '@/lib/utils'
import React from 'react'


const ShowRecomTags = async() => {
    const tags=await getTagsAction({take:(Math.floor(Math.random()*12)+5) as number})
  return (
    <>
        <h2 className='text-center font-bold md:text-3xl sm:text-2xl text-xl text-transparent bg-gradient-to-r from-cyan-700 via-violet-600 to-blue-600 bg-clip-text my-4'>Popular Tags</h2>
        <div className='flex flex-wrap w-full justify-center mx-auto px-2 py-2.5 max-w-5xl'>
            {tags.map((item, index)=>(
                <div key={index} className={`px-8 py-2`} style={{ transform: `${handleRotate(index)}` }}>
                    <Button type='button' className={`text-nowrap hover:rotate-2 transition-all duration-100`}>
                        {item.tag}
                    </Button>
                </div>
            ))}
        </div>
    </>
  )
}

export default ShowRecomTags