'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from 'next-themes';
import {
  Sun,
  Moon,
  ArrowUpRight,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationDockProps { }

const NAV_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'stack', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'substrate', label: 'Substrate' },
  { id: 'upstream', label: 'Upstream' },
];

const emptySubscribe = () => () => { };

export default function NavigationDock({ }: NavigationDockProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [currentTime, setCurrentTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setCurrentTime(istTime);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-lg shadow-zinc-950/5 dark:shadow-black/20"
        >
          {/* Identity Monogram */}
          <button
            onClick={() => scrollToSection('overview')}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group"
          >
            <div className="size-6 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center font-mono text-[11px] font-bold tracking-tighter">
              S
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 border-x border-zinc-200 dark:border-zinc-800/80 px-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    'relative px-3 py-1 text-xs font-mono transition-colors rounded-full cursor-pointer',
                    isActive
                      ? 'text-zinc-950 dark:text-zinc-50 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/80 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Live IST Telemetry */}
          <div className="hidden lg:flex items-center gap-2 px-2 text-[11px] font-mono text-zinc-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/50 opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500/70" />
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">{currentTime || '—'} IST</span>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-1">
            {isMounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                title="Toggle theme"
                className="size-7 flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden size-7 flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 inset-x-4 z-40 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl shadow-xl md:hidden flex flex-col gap-2"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left px-3 py-2 rounded-lg font-mono text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="size-3.5 text-zinc-400" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
