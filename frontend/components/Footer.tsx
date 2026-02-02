'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 md:px-8 lg:px-16 mt-16 sm:mt-24 md:mt-32 pb-0">
      <div className="max-w-[1400px] mx-auto relative py-12 sm:py-16 md:py-20">
        {/* Nectar Background - full container */}
        <div className="absolute inset-0">
          <Image
            src="/nectarBackground.png"
            alt=""
            fill
            className="object-cover opacity-30"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Dark Overlay - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#252B36] rounded-md px-6 py-6 sm:px-8 sm:py-7 md:px-12 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6"
        >
          {/* Logo */}
          <div className="flex items-center relative z-10">
            <Image
              src="/nectarLogo.png"
              alt="Nectar Logo"
              width={120}
              height={35}
              className="h-7 sm:h-8 md:h-9 w-auto"
            />
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-white text-xs sm:text-sm relative z-10">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm">
              ©
            </span>
            <span className="text-center sm:text-left">2026 Nectar. All rights reserved.</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}