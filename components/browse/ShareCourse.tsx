'use client';
import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface Props{
  slug:string
}

const ShareCourse:React.FC<Props> = ({ slug }) => {
  const [copied, setCopied] = useState(false);


  const handleShare = async () => {
    try {
      const url = window.location.origin+`/browse/${slug}`; 
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button 
      onClick={handleShare} 
      className="relative p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors"
    >
      {copied ? (
        <Check className="size-5 text-green-500 transition-all duration-300" />
      ) : (
        <Share2 className="size-5 transition-all duration-300" />
      )}
    </button>
  );
};

export default ShareCourse;
