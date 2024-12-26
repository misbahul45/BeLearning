import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center gap-2'>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <span>Loading...</span>
    </div>
  )
}

export default Loader