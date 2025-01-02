'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HeroSection = () => {
  const router = useRouter();

  const circles = [300, 400, 500, 600].map(size => ({
    base: size,
    sm: size + 100,
    lg: size + 200
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <div className="relative w-full pb-4 min-h-screen flex flex-col justify-center pt-24 items-center bg-gradient-to-br from-sky-200 via-blue-100 to-purple-100 overflow-hidden">
      <motion.div variants={containerVariants} initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 1}}}>
        <Image 
          src="/images/app/hero.svg" 
          alt="logo" 
          width={250} 
          height={250} 
          priority 
          className="drop-shadow-xl"
        />
      </motion.div>

      {circles.map(({ base, sm, lg }, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: [0.9, 1, 0.95],
            opacity: [0, 0.4, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.3
          }}
          className={`absolute inset-1/2 -translate-x-1/2 -translate-y-1/2
            w-[${base}px] h-[${base}px]
            sm:w-[${sm}px] sm:h-[${sm}px]
            lg:w-[${lg}px] lg:h-[${lg}px]
            rounded-full border border-blue-500/20
            bg-gradient-to-r from-purple-500/20 to-blue-500/20
            backdrop-blur-md`}
        />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-4xl mx-auto text-center relative z-10 px-6"
      >
        <motion.h1
          variants={itemVariants}
          className="sm:text-5xl text-3xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-purple-600"
        >
          Empower Your <span className="text-indigo-600 animate-pulse">Learning</span> Journey
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-gray-700"
        >
          Transform the way you learn with interactive tools, AI recommendations, and a global community.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="p-5 md:p-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl transform hover:shadow-3xl hover:-translate-y-1 transition-all"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Learn, Achieve, Excel
          </h2>
          <div className="text-md sm:text-lg md:text-2xl text-gray-600 mt-4 flex items-start justify-center gap-2">
            <Quote />
            <p>
              &ldquo;Learning is the only thing the mind never exhausts, never fears, and never regrets&hellip;&rdquo;
            </p>
            <Quote />
          </div>
          <p className="text-xl md:text-2xl my-4 font-semibold text-gray-700">
            - Leonardo da Vinci
          </p>
          <div className="mt-4 md:mt-10 flex sm:flex-row flex-col gap-4">
            <motion.button
              onClick={() => router.push('/sign-up')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 w-full py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-xl hover:bg-indigo-500 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Get Started
            </motion.button>
            <motion.button
              onClick={() => router.push('/about')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 w-full py-4 bg-white text-indigo-600 font-semibold rounded-full shadow-xl hover:bg-gray-100 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
