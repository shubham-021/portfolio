'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Cpu,
  Terminal,
  Database,
  Binary,
  Network,
  Code2,
  BrainCircuit,
  ListTree,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubstrateItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SUBSTRATE_MODULES: SubstrateItem[] = [
  { id: 'os', name: 'Operating System', icon: Layers },
  { id: 'coa', name: 'COA', icon: Cpu },
  { id: 'dbms', name: 'DBMS', icon: Database },
  { id: 'toc', name: 'Theory of Computation', icon: Binary },
  { id: 'c', name: 'C', icon: Code2 },
  { id: 'ds', name: 'Data Structures', icon: ListTree },
  { id: 'algo', name: 'Algorithms', icon: BrainCircuit },
  { id: 'cn', name: 'Computer Networks', icon: Network },
  { id: 'cd', name: 'Compiler Design', icon: Terminal },
];

export default function SubstrateSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="substrate" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col gap-2.5 mb-5 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
          <span>Substrate</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          Core{' '}
          <span className="font-serif italic font-normal text-zinc-500 dark:text-zinc-400">
            fundamentals
          </span>
          .
        </h2>
      </div>

      {/* GATE Qualification — quiet, factual */}
      <div className="mb-5 p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/30 font-mono text-xs text-zinc-500 dark:text-zinc-400">
        <p>
          Qualified GATE (Graduate Aptitude Test in Engineering) in Computer Science &amp; Information Technology — 2024 organized by IISc Bangalore and 2025 organized by IIT Roorkee.
        </p>
      </div>

      {/* Subject Grid — names only */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4">
        {SUBSTRATE_MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <motion.div
              key={mod.id}
              whileHover={{ y: -2 }}
              onMouseEnter={() => setHoveredId(mod.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                'p-5 rounded-2xl border transition-all cursor-default flex items-center gap-4',
                hoveredId === mod.id
                  ? 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/80'
                  : 'border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40'
              )}
            >
              <div className="size-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center text-zinc-500 dark:text-zinc-400 shrink-0">
                <Icon className="size-4" />
              </div>
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">
                {mod.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
