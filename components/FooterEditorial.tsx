'use client';

import React, { useState, useCallback } from 'react';
import {
  Github,
  Twitter,
  Mail,
  Copy,
  Check,
  ArrowUp,
  MapPin,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FooterEditorial() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('shubham.arka@gmail.com');
    setCopied(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.9 },
      colors: ['#71717a', '#a1a1aa', '#e4e4e7'],
    });
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="flex flex-col gap-8">
        {/* Contact Invitation Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-lg shadow-zinc-950/2 dark:shadow-black/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-2">
              Connect
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
              Let&apos;s build something{' '}
              <span className="font-serif italic font-normal text-zinc-500 dark:text-zinc-400">
                meaningful
              </span>
              .
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mt-3 font-light leading-relaxed">
              Open to engineering opportunities, systems challenges, and fullstack collaborations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={copyEmail}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href="mailto:shubham.arka@gmail.com"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono text-xs text-zinc-900 dark:text-zinc-100 hover:border-zinc-500 transition-colors"
            >
              <Mail className="size-4 text-zinc-400" />
              <span>Direct Mail</span>
            </a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-500">
          <div className="flex items-center gap-4">
            <span className="text-zinc-900 dark:text-zinc-200 font-medium">Shubham Singh</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <MapPin className="size-3" />
              India (IST)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/shubham-021"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              title="GitHub"
            >
              <Github className="size-4" />
            </a>

            <a
              href="https://x.com/ShubhamArka"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              title="Twitter / X"
            >
              <Twitter className="size-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              title="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Colophon */}
        <div className="text-center font-mono text-[11px] text-zinc-400 dark:text-zinc-600 pt-4 border-t border-zinc-100 dark:border-zinc-900">
          Designed with spatial discipline • Typography set in <span className="text-zinc-600 dark:text-zinc-400">Instrument Serif</span> &amp; <span className="text-zinc-600 dark:text-zinc-400">Geist</span>
        </div>
      </div>
    </footer>
  );
}
