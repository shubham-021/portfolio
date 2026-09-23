'use client';

import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

type TechItem = {
  id: string;
  name: string;
  slug?: string;
};

const TECH_ITEMS: TechItem[] = [
  { id: 'ts', name: 'TypeScript', slug: 'typescript' },
  { id: 'js', name: 'JavaScript', slug: 'javascript' },
  { id: 'cpp', name: 'C++', slug: 'cpp' },
  { id: 'rs', name: 'Rust', slug: 'rust' },
  { id: 'react', name: 'React', slug: 'react' },
  { id: 'next', name: 'Next.js', slug: 'next' },
  { id: 'tailwind', name: 'Tailwind CSS', slug: 'tailwind' },
  { id: 'html', name: 'HTML5 / CSS3', slug: 'html' },
  { id: 'node', name: 'Node.js', slug: 'nodejs' },
  { id: 'pg', name: 'PostgreSQL', slug: 'postgresql' },
  { id: 'redis', name: 'Redis', slug: 'redis' },
  { id: 'docker', name: 'Docker', slug: 'docker' },
  { id: 'linux', name: 'Linux', slug: 'linux' },
  { id: 'git', name: 'Git', slug: 'git' },
];

const TechBox = memo(function TechBox({
  tech,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  tech: TechItem;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const slug = tech.slug || tech.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const candidateUrls = [
    `/${slug}.svg`,
    `/${slug}.png`,
    `/${tech.name.toLowerCase()}.svg`,
    `/${tech.name}.svg`,
  ];

  const currentSrc = candidateUrls[imgIndex];

  const handleImgError = () => {
    if (imgIndex < candidateUrls.length - 1) {
      setImgIndex((prev) => prev + 1);
      setImgLoaded(false);
    } else {
      setImgFailed(true);
    }
  };

  const handleImgLoad = () => {
    setImgLoaded(true);
  };

  const initialLetter = tech.name.charAt(0).toUpperCase();
  const indexLabel = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

  return (
    <div className="relative flex justify-center items-center">
      {/* Floating Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-background/95 border border-border text-[11px] font-mono text-text whitespace-nowrap shadow-lg pointer-events-none z-30 flex items-center gap-1.5 backdrop-blur-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
            <span className="font-semibold text-foreground">{tech.name}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        whileHover={{
          y: -4,
          scale: 1.06,
          transition: { type: 'spring', stiffness: 450, damping: 22 },
        }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className={cn(
          'group relative size-14 sm:size-16 rounded-xl flex items-center justify-center cursor-pointer select-none transition-colors duration-200',
          'bg-(--cards)/20 hover:bg-(--cards)/40',
          'border border-border hover:border-foreground/60',
          'shadow-xs hover:shadow-md hover:shadow-foreground/5',
          isHovered && 'border-foreground/80 ring-1 ring-foreground/30'
        )}
      >
        {/* Subtle Index Watermark */}
        <span className="absolute top-1 left-1.5 text-[8px] font-mono text-muted-foreground/40 group-hover:text-muted-foreground/80 transition-colors">
          {indexLabel}
        </span>

        {/* Corner Accents */}
        <span className="absolute top-1 right-1 size-1 border-t border-r border-border group-hover:border-foreground/70 transition-colors" />
        <span className="absolute bottom-1 left-1 size-1 border-b border-l border-border group-hover:border-foreground/70 transition-colors" />

        {/* Fallback letter — always rendered, hidden once image loads */}
        <span
          className={cn(
            'font-mono font-bold text-lg sm:text-xl text-foreground/85 group-hover:text-foreground transition-all duration-200 group-hover:scale-110',
            imgLoaded && !imgFailed && 'hidden'
          )}
        >
          {initialLetter}
        </span>

        {/* Image — invisible until onLoad, removed on final failure */}
        {!imgFailed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentSrc}
            alt=""
            onError={handleImgError}
            onLoad={handleImgLoad}
            className={cn(
              'absolute size-7 sm:size-8 object-contain transition-all duration-200 group-hover:scale-110 pointer-events-none',
              imgLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        )}
      </motion.div>
    </div>
  );
});

export default function TechStack() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative flex flex-col items-center font-mono border-b border-border">
      <div className="flex max-w-4xl relative flex-1 w-full flex-col pt-10 pb-10 gap-6 px-4">
        {/* Header Spec Sheet */}
        <header className="flex flex-row justify-between items-end gap-8 px-0 w-full">
          <div>
            <div className="flex whitespace-nowrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
              <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
              System Modules: Active
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter">
              Tech_<br />Stack
            </h2>
          </div>
          <div className="hidden min-[365px]:block text-right text-xs text-muted-foreground space-y-1 font-mono">
            <p>ID: STK-007-MOD</p>
            <p>COUNT: {TECH_ITEMS.length} UNITS</p>
            <p>STATUS: OPTIMIZED</p>
          </div>
        </header>

        <div
          className={cn(
            'w-full flex flex-col gap-5 pt-2',
            "relative before:content-[''] before:absolute before:pointer-events-none before:top-0 before:w-screen before:h-px before:bg-border before:left-1/2 before:-translate-x-1/2 before:z-50"
          )}
        >
          <motion.div
            layout
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-x-3 gap-y-10 sm:gap-x-4 sm:gap-y-12 py-6"
          >
            <AnimatePresence mode="popLayout">
              {TECH_ITEMS.map((tech, index) => (
                <motion.div
                  key={tech.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <TechBox
                    tech={tech}
                    index={index}
                    isHovered={hoveredId === tech.id}
                    onHover={() => setHoveredId(tech.id)}
                    onLeave={() => setHoveredId(null)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
