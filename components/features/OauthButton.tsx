import React from 'react';
import Image from 'next/image';

interface Props {
  fn: () => void;
  icon: string;
}

const OauthButton = ({ fn, icon }: Props) => {
  
  return (
    <form action={fn}>
      <button className='p-2 hover:bg-slate-100 transition-all duration-75 rounded-full'>
        <Image src={icon} alt={'logo'+icon} width={33} height={33} />
      </button>
    </form>
  );
};

export default OauthButton;
