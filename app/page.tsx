import FaqSection from '@/components/app/FaqSection';
import FeatureSection from '@/components/app/FeatureSection';
import HeroSection from '@/components/app/HeroSection'
import ResponSection from '@/components/app/ResponSection';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Be Learning",
  description: "Be Learning is a platform for learning and teaching.",
};


const page = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <ResponSection />
      <FaqSection />
    </div>
  )
}

export default page