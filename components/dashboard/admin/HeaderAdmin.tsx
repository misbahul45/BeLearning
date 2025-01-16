'use client'
import { HEADER_ADMIN } from '@/constants/dashboard'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {motion} from 'motion/react'

const animation={
  "containerHidden":{opacity:0},
  "containerVisible":{
    opacity:1,
    transition:{staggerChildren:0.2,delayChildren:0.3}
  },
  "itemHidden":{opacity:0,y:20},
  "itemVisible":{
    opacity:1,
    y:0,
    transition:{duration:0.6,ease:'easeOut'}
  }
}

const HeaderAdmin = () => {
  const pathName=usePathname()
  return (
    <div className='flex justify-center py-2'>
      <motion.div
      initial="containerHidden"
      whileInView="containerVisible"
      variants={animation}
      className='py-2 px-1 bg-slate-200 rounded-md flex gap-3 shadow-md'>
        {HEADER_ADMIN.map((item)=>(
          <motion.div variants={animation} initial="itemHidden" whileInView="itemVisible" key={item.name}>
             <Link href={item.path} className={clsx('font-semibold text-sm px-3.5 py-2 rounded-md',item.path===pathName && 'bg-violet-600 text-white')}>
                {item.name}
              </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default HeaderAdmin