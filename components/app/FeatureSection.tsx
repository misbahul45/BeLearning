'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FEATURE_DATA } from '@/constants'
import Image from 'next/image'

const animationPage = {
    containerHidden: { opacity: 0 },
    containerVisible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3 
        }
    },
    itemHidden: { opacity: 0, y: 30, scale: 0.9 },
    itemVisible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' }
    }
}

const FeatureSection = () => {
    return (
        <div className='bg-slate-100 p-4'>
            <motion.div
                initial="containerHidden"
                whileInView="containerVisible"
                viewport={{ once: true }}
                className='w-full max-w-6xl mx-auto bg-gradient-to-tr from-primary via-violet-600 to-indigo-600 p-10 rounded-xl shadow-xl my-8'
            >
                <h1 className='md:text-4xl text-2xl font-bold text-white text-center'>Features Our Platform</h1>
                <motion.div
                    viewport={{ once: true }}
                    variants={animationPage}
                    initial="containerHidden"
                    whileInView="containerVisible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
                >
                    {FEATURE_DATA.map((feature) => (
                        <motion.div
                            variants={animationPage}
                            viewport={{ once: true }}
                            key={feature.id}
                            className='p-4 rounded-lg bg-slate-100 shadow-xl hover:shadow-2xl relative group hover:scale-105 hover:bg-white transition-all duration-300'
                        >
                            <Image
                                src={feature.icon}
                                alt={feature.title}
                                width={150}
                                height={150}
                                className='w-16 h-16 mx-auto'
                            />
                            <h2 className='text-lg font-semibold mt-4 mb-1'>{feature.title}</h2>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default FeatureSection
