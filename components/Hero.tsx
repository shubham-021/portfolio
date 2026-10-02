'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  MapPin,
  Mail,
  Github,
  Twitter,
  Terminal,
  ArrowDown,
  Check,
  Copy,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import Image from 'next/image';

export default function Hero() {
  const [timeString, setTimeString] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);
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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('shubham.arka@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-2rem)] flex flex-col justify-between items-center font-mono border-b border-border pt-5 pb-3">

      <div className="relative z-10 flex flex-col justify-between flex-1 w-full max-w-4xl gap-8 sm:gap-10 px-2 sm:px-4">

        <header className="w-full flex flex-row items-center justify-between gap-4 pb-4 relative after:content-[''] after:absolute after:bottom-0 after:left-[-0.5rem] after:right-[-0.5rem] sm:after:left-[-1rem] sm:after:right-[-1rem] after:h-px after:bg-border/80">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-foreground" />
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground uppercase tracking-widest text-[10px] sm:text-xs">SYS_ONLINE</span>
              <span className="text-border/70 hidden min-[400px]:inline">|</span>
              <span className="text-foreground font-semibold text-[11px] sm:text-xs">AVAILABLE FOR WORK</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-background/80 px-2.5 py-1 rounded-md border border-border shadow-xs">
              <Clock className="size-3.5 text-foreground shrink-0" />
              <span className="tabular-nums font-medium text-text/90" suppressHydrationWarning>
                {timeString || '--:--:--'}
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold">IST</span>
            </div>

            <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-md border border-border shadow-xs">
              <MapPin className="size-3 text-foreground" />
              <span className="text-text/80 text-[11px]">India</span>
            </div>

            <ThemeToggle />
          </div>
        </header>

        <div className="w-full grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] gap-8 md:gap-10 items-start my-auto">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center md:items-start gap-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full flex justify-center md:justify-start"
            >
              <div
                style={{
                  transform: `perspective(1000px) rotateX(${mousePos.y * -12}deg) rotateY(${mousePos.x * 12}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="relative p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl shadow-xl shadow-zinc-950/5 dark:shadow-black/20 w-full max-w-60 sm:max-w-65"
              >
                <span className="absolute top-3 left-3 size-2 border-t border-l border-zinc-300 dark:border-zinc-700" />
                <span className="absolute top-3 right-3 size-2 border-t border-r border-zinc-300 dark:border-zinc-700" />
                <span className="absolute bottom-3 left-3 size-2 border-b border-l border-zinc-300 dark:border-zinc-700" />
                <span className="absolute bottom-3 right-3 size-2 border-b border-r border-zinc-300 dark:border-zinc-700" />

                <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950">
                  <div className="size-65 bg-[url(/profile.jpg)] transition-transform duration-700 hover:scale-110 bg-center bg-size-[auto_300px]" />
                </div>
              </div>
            </motion.div>

            <div className="w-full flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">ALIAS //</span>
                <span className="font-arka text-2xl sm:text-3xl text-foreground font-bold leading-none">
                  Arka
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>he/him</span>
                <span className="text-border">·</span>
                <span className="text-text/70">Learning computers</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-6 justify-center"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <Terminal className="size-3.5 text-foreground shrink-0" />
              <span>SPEC_SHEET // USR-007</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-text leading-none">
                Shubham<br />Singh
              </h1>
              <p className="text-sm sm:text-base font-semibold text-foreground tracking-wide uppercase pt-1">
                Acts like an engineer
              </p>
            </div>

            <div className="relative pl-4 border-l-2 border-foreground/60 py-1 bg-background/40">
              <p className="text-sm sm:text-base text-text/90 font-mono leading-relaxed">
                I love building things and getting into the details — understanding how systems actually work from the base level.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="relative rounded-lg p-3 sm:p-3.5 bg-(--cards)/15 hover:bg-(--cards)/25 border border-border hover:border-foreground/50 transition-colors shadow-2xs group">
                <span className="absolute top-1.5 right-1.5 size-1.5 border-t border-r border-border group-hover:border-foreground transition-colors" />
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  <Cpu className="size-3 text-foreground" />
                  <span>Currently</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-text">
                  `Learning Systems &amp; Low-Level Internals`
                </p>
              </div>

              <div className="relative rounded-lg p-3 sm:p-3.5 bg-(--cards)/15 hover:bg-(--cards)/25 border border-border hover:border-foreground/50 transition-colors shadow-2xs group">
                <span className="absolute top-1.5 right-1.5 size-1.5 border-t border-r border-border group-hover:border-foreground transition-colors" />
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  <GraduationCap className="size-3 text-foreground" />
                  <span>Background</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-text">
                  B.Tech CSE &apos;25 <span className="text-muted-foreground font-normal">· GATE Qualified</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={scrollToProjects}
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-xs sm:text-sm font-semibold hover:opacity-90 transition-all cursor-pointer shadow-xs"
              >
                <span>Explore Work</span>
                <ArrowDown className="size-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border bg-background hover:bg-(--cards)/20 text-xs sm:text-sm text-text transition-colors cursor-pointer"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="size-3.5 text-foreground" />
                    <span className="text-foreground font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5 text-muted-foreground" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        <footer className="w-full pt-4 relative before:content-[''] before:absolute before:top-0 before:left-[-0.5rem] before:right-[-0.5rem] sm:before:left-[-1rem] sm:before:right-[-1rem] before:h-px before:bg-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-text/80">
            <a
              href="mailto:shubham.arka@gmail.com"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Mail className="size-3.5 text-foreground" />
              <span>shubham.arka@gmail.com</span>
            </a>

            <a
              href="https://github.com/shubham-021"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Github className="size-3.5 text-foreground" />
              <span>shubham-021</span>
            </a>

            <a
              href="https://x.com/ShubhamArka"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Twitter className="size-3.5 text-foreground" />
              <span>@ShubhamArka</span>
            </a>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground text-[11px]">
            <span>LAT: 26.8°N</span>
            <span>LON: 80.9°E</span>
            <span>UTC +5:30</span>
          </div>
        </footer>

      </div>
    </section>
  );
}
