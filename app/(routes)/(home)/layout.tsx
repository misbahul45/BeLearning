import React from 'react'

const HomeLayout =async({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default HomeLayout