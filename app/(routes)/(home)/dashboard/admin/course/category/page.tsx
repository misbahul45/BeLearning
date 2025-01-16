import { FormCategory } from '@/components/dashboard/admin/FormCategory'
import React from 'react'

const page = () => {
  return (
    <div className='my-8 flex flex-col justify-center items-center gap-6'>
        <h1 className='font-bold md:text-3xl text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-violet-600 to-blue-600'>Create Category For Courses</h1>
        <FormCategory />
    </div>
  )
}

export default page