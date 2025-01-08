'use client';
import { feedbackData } from '@/constants';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion'; // Perbaikan impor Framer Motion

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

const ResponSection = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full bg-gradient-to-b from-blue-200 to-blue-100 py-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {feedbackData.map((feedback, index) => (
        <motion.div
          variants={itemVariants}
          key={feedback.name}
          className={`
            rounded-lg shadow-lg p-6 md:p-8 transform transition-transform hover:scale-105
            ${index === 2 ? 'md:row-span-2' : ''}
            bg-white border border-blue-300
          `}
        >
          {index === 2 && (
            <Image
              src="/images/app/respon.svg"
              alt="Feedback Illustration"
              width={200}
              height={200}
              loading='lazy'
              className="mx-auto"
            />
          )}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
              {feedback.name[0]}
            </div>
            <h2 className="text-primary font-semibold text-lg md:text-xl">
              {feedback.name}
            </h2>
          </div>
          <p className="text-primary text-center mt-4 text-sm md:text-base leading-relaxed">
            {feedback.comment}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ResponSection;
