'use client'
import { Button } from '@/components/ui/button'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import React from 'react'

const ButtonTag = ({tag}:{tag:string}) => {
    const [, setTag]=useQueryState('tag', parseAsString.withDefault('').withOptions({shallow: false, history:'push'}))
    const [, setPage]=useQueryState('page',parseAsInteger.withDefault(1).withOptions({shallow: false}))

    const handleToggleTag=(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault()
      setPage(1)
      setTag(tag)
    }

  return (
    <Button onClick={handleToggleTag} type='button' className={`text-nowrap hover:rotate-2 transition-all duration-100`}>
      {tag}
    </Button>
  )
}

export default ButtonTag