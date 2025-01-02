import React from 'react'

const loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='size-12 border-y-4 border-primary rounded-full animate-spin' />
    </div>
  )
}

export default loading