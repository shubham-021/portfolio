'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import {
  Github,
  Twitter,
  Mail,
  ArrowDown,
  Terminal,
  MapPin,
} from 'lucide-react';

export default function HeroEditorial() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="overview"
      className="relative flex flex-col justify-center pt-24 pb-6 sm:pt-28 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full"
    >
      <div className="flex flex-col gap-6 sm:gap-7">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3 font-mono text-xs text-zinc-400 dark:text-zinc-500"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/50 opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500/70" />
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">Available</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <MapPin className="size-3 text-zinc-400" />
              India
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>BTech CSE &apos;25</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 flex flex-col gap-5"
          >
            <div>
              <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500 mb-4">
                Shubham Singh
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.08] font-medium">
                Systems, interfaces, and everything{' '}
                <span className="font-serif italic font-normal text-zinc-500 dark:text-zinc-300">
                  in between
                </span>
                .
              </h1>
            </div>

            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed max-w-2xl font-light">
              Fullstack engineer working across the stack — from native daemons and systems to web interfaces and applied AI.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <span>View Work</span>
                <ArrowDown className="size-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/shubham-021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <Github className="size-4" />
                </a>

                <a
                  href="https://x.com/ShubhamArka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <Twitter className="size-4" />
                </a>

                <a
                  href="mailto:shubham.arka@gmail.com"
                  className="size-9 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <Mail className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <motion.div
              style={{
                transform: `perspective(1000px) rotateX(${mousePos.y * -12}deg) rotateY(${mousePos.x * 12}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative p-3 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl shadow-xl shadow-zinc-950/5 dark:shadow-black/20 max-w-65 w-full"
            >
              <span className="absolute top-2 left-2 size-2 border-t border-l border-zinc-300 dark:border-zinc-700" />
              <span className="absolute top-2 right-2 size-2 border-t border-r border-zinc-300 dark:border-zinc-700" />
              <span className="absolute bottom-2 left-2 size-2 border-b border-l border-zinc-300 dark:border-zinc-700" />
              <span className="absolute bottom-2 right-2 size-2 border-b border-r border-zinc-300 dark:border-zinc-700" />

              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950">
                <Image
                  src="/profile.jpg"
                  alt="Shubham Singh"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 260px"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  className="w-full h-full object-cover object-center grayscale contrast-105 hover:grayscale-0 transition-transform duration-700 scale-130 hover:scale-125"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-900/20 flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-500"
        >
          <Terminal className="size-3.5 text-zinc-400 shrink-0" />
          <span>
            I don&apos;t just use abstractions — I like to know what&apos;s underneath.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
