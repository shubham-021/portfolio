'use client';

import { memo } from 'react';
import { motion } from 'motion/react';
import { Cpu, Terminal, Network, Binary, Database, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

type CoreSubject = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

const CORE_SUBJECTS: CoreSubject[] = [
  { id: 'os', name: 'Operating System', icon: Layers },
  { id: 'coa', name: 'COA', icon: Cpu },
  { id: 'compilers', name: 'Compiler Design', icon: Terminal },
  { id: 'dbms', name: 'DBMS', icon: Database },
  { id: 'toc', name: 'Theory of Computation', icon: Binary },
  { id: 'cn', name: 'Computer Networks', icon: Network },
];

export default memo(function CoreSystems() {
  return (
    <section className="relative flex flex-col items-center font-mono border-b border-border">
      <div className="flex max-w-4xl relative flex-1 w-full flex-col pt-10 pb-12 gap-6 px-4">
        {/* Header Spec Sheet */}
        <header className="flex flex-row justify-between items-end gap-8 px-0 w-full">
          <div>
            <div className="flex whitespace-nowrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
              <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
              Layer: 0x00 // The Substrate
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter">
              Funda_<br />mentals
            </h2>
          </div>
          <div className="hidden min-[365px]:block text-right text-xs text-muted-foreground space-y-1 font-mono">
            <p>TYPE: FIRST_PRINCIPLES</p>
            <p>DOMAIN: SYSTEMS_CORE</p>
            <p>PRIMITIVES: 06 UNITS</p>
          </div>
        </header>

        {/* Divider Line & Content */}
        <div
          className={cn(
            'w-full flex flex-col gap-6 pt-2',
            "relative before:content-[''] before:absolute before:pointer-events-none before:top-0 before:w-screen before:h-px before:bg-border before:left-1/2 before:-translate-x-1/2 before:z-50"
          )}
        >
          {/* One-liner */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-mono">
            <Terminal className="size-3.5 text-foreground shrink-0" />
            <span>&gt; I don&apos;t just use abstractions — I need to know what&apos;s underneath.</span>
          </div>

          {/* Core Subjects Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {CORE_SUBJECTS.map((subject, index) => {
              const Icon = subject.icon;
              const indexStr = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

              return (
                <motion.div
                  key={subject.id}
                  whileHover={{
                    y: -2,
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                  className={cn(
                    'group relative rounded-xl p-4 flex flex-col items-center justify-center gap-3 aspect-square',
                    'bg-(--cards)/20 hover:bg-(--cards)/40',
                    'border border-border hover:border-foreground/60',
                    'shadow-xs hover:shadow-md hover:shadow-foreground/5'
                  )}
                >
                  {/* Corner Accent Ticks */}
                  <span className="absolute top-1.5 right-1.5 size-1.5 border-t border-r border-border group-hover:border-foreground/70 transition-colors" />
                  <span className="absolute bottom-1.5 left-1.5 size-1.5 border-b border-l border-border group-hover:border-foreground/70 transition-colors" />

                  {/* Index */}
                  <span className="absolute top-1.5 left-2 text-[10px] font-mono text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors">
                    {indexStr}
                  </span>

                  {/* Icon */}
                  <div className="p-2 rounded-lg border border-border bg-background/60 group-hover:border-foreground/40 transition-colors">
                    <Icon className="size-5 text-foreground" />
                  </div>

                  {/* Subject Name */}
                  <span className="text-[11px] sm:text-xs font-medium text-text/90 text-center leading-tight">
                    {subject.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
