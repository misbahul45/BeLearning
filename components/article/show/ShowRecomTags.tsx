import { getTagsAction } from '@/actions/tags.action'
import { handleRotate } from '@/lib/utils'
import React from 'react'
import ButtonTag from './ButtonTag'


const ShowRecomTags = async({ page }:{ page:number }) => {

    if(page>1){return null}

    const tags=await getTagsAction({take:(Math.floor(Math.random()*8)+2) as number, by:'ARTICLES'});
  return (
    <>
        <h2 className='text-center font-bold md:text-3xl sm:text-2xl text-xl text-transparent bg-gradient-to-r from-cyan-700 via-violet-600 to-blue-600 bg-clip-text my-4'>Popular Tags</h2>
        <div className='flex flex-wrap w-full justify-center mx-auto md:px-2 px-0.5 py-2.5 max-w-5xl'>
            {tags.map((item, index)=>(
                <div key={index} className={`px-8 py-2`} style={{ transform: `${handleRotate(index)}` }}>
                    <ButtonTag tag={item.tag} className='hover:rotate-2' />
                </div>
            ))}
        </div>
    </>
  )
}

export default ShowRecomTags