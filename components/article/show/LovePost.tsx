import React from 'react'
import { Heart as Love } from 'lucide-react';

const LovePost = () => {
  return (
      <form>
        <button type='button' className='p-1.5 bg-violet-400 text-gray-50 hover:bg-violet-600 hover:text-white transition-all duration-100 rounded-full'>
          <Love className='sm:size-5 size-3' />
        </button>
      </form>
  )
}

export default LovePost