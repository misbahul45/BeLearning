import ShowFeedback from '@/components/features/ShowFeedback'
import SigninForm from '@/components/features/SigninForm'

import { PlusIcon } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const popins=Poppins({weight:['400','500','600','700'],subsets:['latin']})

const page = () => {
  return (
    <div className={`lg:p-5 h-screen dark:bg-slate-900  ${popins.className}`}>
        <div className='flex gap-4 w-full h-full bg-gray-500/5 rounded-lg shadow-lg shadow-slate-700/5 bg-white'>
            <div className='space-y-5 flex-1 md:px-0 sm:px-8 px-4 flex flex-col items-center justify-center'>
                <Image src={'/images/logo.png'} alt='logo' width={80} height={80} className='drop-shadow-lg' />
                <h1 className={`text-3xl text-center font-bold text-primary`}>Welcome Back</h1>
                <SigninForm />
            </div>
            <div className="flex-1 lg:block hidden">
              <div className="bg-primary w-full h-full max-w-md mx-auto rounded-lg shadow-lg flex flex-col justify-between shadow-slate-400/20 relative p-8">
                <div className="absolute -top-4 -right-4 size-20 rounded-bl-2xl bg-white" />
                <ShowFeedback />  
                <div className='p-6 bg-white rounded-lg relative'>
                  <div className="absolute -top-4 -right-4 rounded-bl-2xl bg-primary p-4">
                    <div className='p-2 bg-white rounded-full'>
                      <PlusIcon className='size-6 text-primary' />
                    </div>
                  </div>
                    <p className='text-md font-semibold text-primary'>
                      Empower your learning &
                      <br />
                      <span className='ml-0.5'>experience growth like never before</span>  
                    </p>
                    <div className="mt-5 space-y-2">
                      <div className='relative flex items-end'>
                        {Array.from({length:4}).map((_,i)=>(
                          <Image key={i} src={'/images/person-'+(i+1)+'.png'} alt='logo-2' width={30} height={30} className='size-8 rounded-full inline-block -ml-2 first:ml-0' />
                        ))}
                      </div>
                      <p className='flex-1 text-xs text-slate-500'>
                        &quot;Temukan cara baru belajar yang efektif dan menyenangkan untuk meningkatkan keterampilan dan meraih potensi terbaik Anda.&quot;
                      </p>
                    </div>
                </div>
              </div>
            
            </div>
        </div>
    </div>
  )
}

export default page