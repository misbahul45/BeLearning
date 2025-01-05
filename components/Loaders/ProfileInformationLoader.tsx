import React from 'react'

const ProfileInformationLoader = () => {
  return (
    <div className='w-full h-72 bg-slate-200 animate-pulse flex flex-col gap-4 p-6'>
        <div className='flex justify-end gap-4'>
            <div className='w-24 h-8 bg-slate-100 rounded'/>
            <div className='w-24 h-8 bg-slate-100 rounded'/>
        </div>
        <div className="rounded-full size-24 bg-slate-100 mx-auto" />
        <div className="w-full h-16 bg-slate-100" />
    </div>
  )
}

export default ProfileInformationLoader