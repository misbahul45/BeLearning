import { COMMENT } from '@/types/article.types'
import React from 'react'

interface Props extends COMMENT {
  isAuthor?:boolean
}

const ItemComent = ({ isAuthor, message, userId, parentId }: Props) => {
  return (
    <div>

      <div
      dangerouslySetInnerHTML={{ __html: message }}
      className='prose prose-sm'/>

    </div>
  )
}

export default ItemComent