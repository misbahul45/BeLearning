
import React from 'react';
import Image from 'next/image';

interface Props {
  fn: () => void;
  icon: string;
}

const OauthButton = ({ fn, icon }: Props) => {
  return (
    <button onClick={fn} className='p-2 hover:bg-slate-100 transition-all duration-75 rounded-full'>
      <Image src={icon} alt={'logo'+icon} width={33} height={33} />
    </button>
  );
};

export default OauthButton;
