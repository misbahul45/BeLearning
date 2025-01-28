'use client'
import { Button } from '@/components/ui/button'
import { parseAsString, useQueryState } from 'nuqs'
import React from 'react'

const ButtonTag = ({tag}:{tag:string}) => {
    const [tagData, setTagData]=useQueryState('tag', parseAsString.withDefault('').withOptions({
        shallow: false,
        history:'push'
    }))
    console.log(tagData)
  return (
    <Button onClick={()=>setTagData(tag)} type='button'>
        {tag}
    </Button>
  )
}

export default ButtonTag