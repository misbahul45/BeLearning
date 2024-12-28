import React from 'react';
import Image from 'next/image';

interface Props {
  fn: () => Promise<void>;
  icon: string;
}

const OauthButton = ({ fn, icon }: Props) => {

  return (
    <form action={fn}>
      <button
        type="submit"
        className="p-2 hover:bg-slate-100 transition-all duration-75 rounded-full"
        aria-label={`Login with ${icon}`}
      >
        <Image src={icon} alt={`${icon} logo`} width={33} height={33} />
      </button>
    </form>
  );
};

export default OauthButton;
