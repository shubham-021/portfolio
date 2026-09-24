'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Code2,
  Cpu,
  GitPullRequest,
  Layers,
  Mail,
  Github,
  Twitter,
  Sun,
  Moon,
  Copy,
  Check,
  Award,
  Sparkles,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

interface PaletteItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'Socials';
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  badge?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { theme, setTheme } = useTheme();

  // Handle keyboard shortcut to close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('shubham.arka@gmail.com');
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#34d399', '#f59e0b'],
    });
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 900);
  }, [onClose]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  }, [onClose]);

  const items: PaletteItem[] = useMemo(() => [
    {
      id: 'nav-hero',
      category: 'Navigation',
      title: 'Overview',
      subtitle: 'Introduction, manifesto & telemetry',
      icon: Sparkles,
      action: () => scrollTo('overview'),
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Flagship Projects',
      subtitle: 'Relay, Once, Gloo & DailyLog',
      icon: Code2,
      badge: 'Interactive',
      action: () => scrollTo('work'),
    },
    {
      id: 'nav-substrate',
      category: 'Navigation',
      title: 'The Substrate & GATE CS',
      subtitle: 'Core systems: OS, Compilers, Architecture',
      icon: Cpu,
      badge: 'GATE Honors',
      action: () => scrollTo('substrate'),
    },
    {
      id: 'nav-upstream',
      category: 'Navigation',
      title: 'Upstream Contributions',
      subtitle: 'PRs in vercel/ai & mem0ai, GitHub heatmap',
      icon: GitPullRequest,
      badge: 'Open Source',
      action: () => scrollTo('upstream'),
    },
    {
      id: 'nav-stack',
      category: 'Navigation',
      title: 'Technology Matrix',
      subtitle: 'Languages, runtimes, distributed state & AI',
      icon: Layers,
      action: () => scrollTo('stack'),
    },
    {
      id: 'act-copy-email',
      category: 'Actions',
      title: copied ? 'Email Copied to Clipboard!' : 'Copy Direct Email',
      subtitle: 'shubham.arka@gmail.com',
      icon: copied ? Check : Copy,
      badge: copied ? 'Success' : 'Fast',
      action: copyEmail,
    },
    {
      id: 'act-toggle-theme',
      category: 'Actions',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtitle: 'Toggle aesthetic environment',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    },
    {
      id: 'act-gate-info',
      category: 'Actions',
      title: 'GATE CS 2024 & 2025 Verification',
      subtitle: 'Conducted by IISc Bangalore & IIT Roorkee',
      icon: Award,
      badge: 'Honors',
      action: () => scrollTo('substrate'),
    },
    {
      id: 'soc-github',
      category: 'Socials',
      title: 'GitHub Profile',
      subtitle: '@shubham-021',
      icon: Github,
      action: () => {
        window.open('https://github.com/shubham-021', '_blank');
        onClose();
      },
    },
    {
      id: 'soc-twitter',
      category: 'Socials',
      title: 'Twitter / X',
      subtitle: '@ShubhamArka',
      icon: Twitter,
      action: () => {
        window.open('https://x.com/ShubhamArka', '_blank');
        onClose();
      },
    },
    {
      id: 'soc-email-client',
      category: 'Socials',
      title: 'Send Direct Message',
      subtitle: 'Opens mail client',
      icon: Mail,
      action: () => {
        window.open('mailto:shubham.arka@gmail.com', '_blank');
        onClose();
      },
    },
  ], [copied, theme, copyEmail, scrollTo, setTheme, onClose]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(lower)) ||
        item.category.toLowerCase().includes(lower)
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle arrow keys
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    },
    [filteredItems, selectedIndex]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800/80 gap-3">
              <Search className="size-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none font-sans"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800">
                ESC
              </kbd>
            </div>

            {/* Items List */}
            <div className="max-h-95 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-zinc-400 font-mono">
                  No matching commands found.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors font-sans group',
                        isSelected
                          ? 'bg-zinc-100 dark:bg-zinc-800/70 text-zinc-900 dark:text-zinc-50'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            'size-8 rounded-lg flex items-center justify-center border transition-colors',
                            isSelected
                              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
                              : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-500'
                          )}
                        >
                          <Icon className="size-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-xs sm:text-sm font-medium flex items-center gap-2">
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono truncate">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        ↵
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Telemetry */}
            <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-[9px]">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-[9px]">↵</kbd> Select
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Atelier Shell</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
