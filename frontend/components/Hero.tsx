'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Hero() {
 
  const stars = [
    { size: { mobile: 16, desktop: 24 }, top: '12%', left: '8%', delay: 0, mobileHide: false },
    { size: { mobile: 20, desktop: 64 }, top: '8%', right: '20%', delay: 0.2, mobileHide: false },
    { size: { mobile: 12, desktop: 16 }, top: '25%', right: '18%', delay: 0.4, mobileHide: true },
    { size: { mobile: 14, desktop: 32 }, top: '35%', right: '25%', delay: 0.3, mobileHide: true },
   
  ];

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-16 mt-2 sm:mt-4 py-4">
      <div>
        <div className="bg-[#252B36] rounded-2xl sm:rounded-3xl border-2 border-[#4A9FD8]/50 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-20 lg:py-20 relative overflow-hidden">
          {/* Animated Stars */}
          {stars.map((star, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: star.delay,
                ease: 'easeOut',
              }}
              className={`absolute ${star.mobileHide ? 'hidden sm:block' : ''}`}
              style={{
                top: star.top,
                left: star.left,
                right:star.right,
              }}
            >
              <Sparkles
                size={star.size.mobile}
                className="text-[#FFC000] sm:hidden"
                fill="#FFC000"
              />
              <Sparkles
                size={star.size.desktop}
                className="text-[#FFC000] hidden sm:block"
                fill="#FFC000"
              />
            </motion.div>
          ))}

          <div className="relative z-10 flex flex-col gap-8 sm:gap-10 lg:gap-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-center lg:text-left"
            >
              SAVE WITH OTHERS. LET THE 
              <br />YIELD CHOOSE A WINNER.
            </motion.h1>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-10 lg:gap-16">
              <div className="flex-1 max-w-xl text-center lg:text-left">
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-base sm:text-lg text-[#B0B7C3] leading-relaxed mb-6"
                >
                  Nectar helps communities save together and earn yield safely. The
                  yield is shared based on rules you set random winners or selected
                  members while everyone&apos;s savings remain protected.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FFC000] text-[#252B36] px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#FFD14D] transition-colors duration-300 shadow-lg inline-block"
                >
                  Get Started
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-shrink-0 w-full lg:w-auto max-w-[720px]"
              >
                <Image
                  src="/hero-img.png"
                  alt="Analytics Dashboard"
                  width={720}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}