import { COMMENT } from '@/types/article.types'
import Image from 'next/image';
import React from 'react'
import FormComment from '../create/FormComment';



interface User {
  id: string;
  username: string;
  profile: {
      image: {
          url: string;
      } | null;
  } | null;
};

interface Props extends COMMENT {
  isAuthor?:boolean;
  user:User
}

const ItemComent = ({ isAuthor, message, user, createdAt }: Props) => {
  const [replayComment, setReplayComment] = React.useState<boolean>(false)
  return (
    <div className='p-1'>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-2'>
           <Image src={user?.profile?.image?.url || ''} alt={user?.username+' profile'} width={40} height={40} className="object-cover size-8 rounded-full" />
           <div>
             <div className="flex gap-2 items-center font-semibold text-xs">
              <p>{user.username}</p>
               {isAuthor && (
                <div className="py-0.5 px-1 text-[8px] rounded-lg bg-green-500 text-white">
                  Author
                </div>
               )}
             </div>
             <p className='text-[9px] text-gray-500'>{createdAt.toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'})}</p>
           </div>
        </div>
      </div>
      <div
      dangerouslySetInnerHTML={{ __html: message||'' }}
      className='prose prose-xs'/>
      {replayComment?
        <FormComment articleId={''} userId={''} />
        :
        <button onClick={()=>setReplayComment(true)} className='text-cyan-600 text-[10px]'>Replay</button>
      }
    </div>
  )
}

export default ItemComent