import { getTagsAction } from '@/actions/tags.action'
import { handleRotate } from '@/lib/utils'
import React from 'react'
import ButtonTag from './ButtonTag'


interface Props {
    page:number
}

const ShowRecomTags = async({page}:Props) => {
    const tags=await getTagsAction({take:(Math.floor(Math.random()*12)+5) as number})
    if(page>1){
        return  null
    }
  return (
    <>
        <h2 className='text-center font-bold md:text-3xl sm:text-2xl text-xl text-transparent bg-gradient-to-r from-cyan-700 via-violet-600 to-blue-600 bg-clip-text my-4'>Popular Tags</h2>
        <div className='flex flex-wrap w-full justify-center mx-auto px-2 py-2.5 max-w-5xl'>
            {tags.map((item, index)=>(
                <div key={index} className={`px-8 py-2`} style={{ transform: `${handleRotate(index)}` }}>
                    <ButtonTag tag={item.tag} />
                </div>
            ))}
        </div>
    </>
  )
}

export default ShowRecomTags