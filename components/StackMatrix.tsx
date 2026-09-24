'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface TechItem {
  name: string;
  iconUrl?: string;
}

const TECH_STACK: TechItem[] = [
  {
    name: 'HTML',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'JS',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'NodeJS',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'ExpressJS',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  },
  {
    name: 'Hono',
    iconUrl: 'https://raw.githubusercontent.com/honojs/hono/main/docs/images/hono-logo.png',
  },
  {
    name: 'ReactJS',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'NextJS',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'C/ C++',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  },
  {
    name: 'Rust',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
  },
  {
    name: 'TailwindCSS',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    name: 'Linux',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  },
  {
    name: 'Docker',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    name: 'Git',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
];

function TechSquare({ item }: { item: TechItem }) {
  const [hasError, setHasError] = useState(false);
  const firstLetter = item.name.charAt(0).toUpperCase();
  const isMonochromeInvert = item.name === 'NextJS' || item.name === 'ExpressJS';

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      className="group aspect-square rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-sm p-3 flex flex-col items-center justify-center gap-2 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors select-none shadow-xs"
    >
      <div className="size-9 sm:size-10 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-center overflow-hidden">
        {!hasError && item.iconUrl ? (
          <img
            src={item.iconUrl}
            alt={item.name}
            className={cn(
              'size-5 sm:size-6 object-contain transition-transform duration-200 group-hover:scale-110',
              isMonochromeInvert && 'dark:invert'
            )}
            onError={() => setHasError(true)}
            loading="lazy"
          />
        ) : (
          <span className="font-mono text-sm sm:text-base font-semibold text-zinc-700 dark:text-zinc-300">
            {firstLetter}
          </span>
        )}
      </div>

      <span className="font-mono text-[11px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-300 text-center truncate max-w-full px-1">
        {item.name}
      </span>
    </motion.div>
  );
}

export default function StackMatrix() {
  return (
    <section id="stack" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col gap-2.5 mb-6 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
          <span>Technologies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          Tech{' '}
          <span className="font-serif italic font-normal text-zinc-500 dark:text-zinc-400">
            stack
          </span>
          .
        </h2>
      </div>

      {/* Square Tiles Grid */}
      <div className="grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
        {TECH_STACK.map((item) => (
          <TechSquare key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
