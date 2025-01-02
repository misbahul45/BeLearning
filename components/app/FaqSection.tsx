'use client';
import { faqData } from '@/constants';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import Image from 'next/image';
import { motion } from 'framer-motion';

const animation = {
  containerHidden: { opacity: 0 },
  containerVisible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
  itemHidden: { opacity: 0, y: 20 },
  itemVisible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const FaqSection = () => {
  return (
    <motion.div
      className="flex bg-slate-100 py-12 px-6 md:px-12"
      initial="containerHidden"
      whileInView="containerVisible"
      viewport={{ once: true }}
      variants={animation}
    >
      {/* Image Section */}
      <div className="flex-1 flex justify-center items-center">
        <Image
          src={'/images/app/question.svg'}
          alt="question"
          width={500}
          height={500}
          className="drop-shadow-lg"
        />
      </div>

      {/* FAQ Section */}
      <motion.div
        className="flex-1"
        variants={animation}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible>
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              variants={animation}
            >
              <AccordionItem value={faq.answer}>
                <AccordionTrigger className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h2 className="text-lg font-semibold">{faq.question}</h2>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-white rounded-lg shadow-lg">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </motion.div>
  );
};

export default FaqSection;
