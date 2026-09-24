'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectData {
  id: string;
  number: string;
  title: string;
  tagline: string;
  sourceUrl: string;
  stack: string[];
  description: string[];
}

const PROJECTS: ProjectData[] = [
  {
    id: 'once',
    number: '01',
    title: 'Once',
    tagline: 'AI-powered RPG-style story writing app',
    sourceUrl: 'https://github.com/shubham-021/once',
    stack: ['Next.js', 'TypeScript', 'Hono', 'Neo4j', 'Qdrant', 'Better-Auth', 'Drizzle', 'Bun'],
    description: [
      'Once is not a "make me a story" prompt wrapper — it\'s a co-writer. You provide the plot, world, and protagonist, and Once helps make them come alive while tracking character location, health, energy, traits, and inventory.',
      'Models story state using Neo4j knowledge graphs for entity relationships and Qdrant for semantic scene retrieval, preventing plot amnesia across long narratives.',
      'Each scene is saved as a draft in a modular editor where you can edit manually, request AI revisions, or both.',
    ],
  },
  {
    id: 'relay',
    number: '02',
    title: 'Relay',
    tagline: 'Private media streaming hub with a local companion daemon',
    sourceUrl: 'https://github.com/shubham-021/relay',
    stack: ['Next.js', 'React 19', 'TypeScript', 'Bun', 'SQLite', 'Tailwind', 'Zustand', 'MPV'],
    description: [
      'Relay unifies multiple TorBox debrid accounts into a single, synchronized media catalog. It indexes dirty torrent scene releases, queries TMDB for rich metadata, and checks instant cloud cache availability across 10+ torrent indexers simultaneously.',
      'Bypasses browser codec limitations through a lightweight local companion daemon (relay-aemond) that streams directly to native players like MPV or VLC with hardware-accelerated 4K HDR playback and watch progress sync.',
      'Features a built-in search aggregator querying 10+ torrent indexes with one-click cloud caching and playback.',
    ],
  },
  {
    id: 'gloo',
    number: '03',
    title: 'Gloo',
    tagline: 'AI-powered terminal companion for developers',
    sourceUrl: 'https://github.com/shubham-021/gloo',
    stack: ['Node.js', 'TypeScript', 'Ink', 'Commander', 'Zod'],
    description: [
      'Gloo brings intelligent AI assistance directly into the terminal. Ask questions, get code help, analyze files, search the web, and handle complex tasks with specialized tools — without leaving the command line.',
      'Supports multiple AI providers, remembers conversations, and adapts to different modes — chatting, planning, or building.',
      'Built with Ink for interactive terminal UIs, with persistent session history and native file context analysis.',
    ],
  },
  {
    id: 'dailylog',
    number: '04',
    title: 'DailyLog',
    tagline: 'News aggregator with temporal search and AI summaries',
    sourceUrl: 'https://github.com/shubham-021/dailyLog-v2',
    stack: ['Next.js', 'TypeScript', 'Hono', 'Vercel AI SDK', 'Drizzle', 'Bun'],
    description: [
      'DailyLog stores news articles from different sources organized by date — so you can browse what was published on any specific day or date range without opening multiple tabs.',
      'Articles are organized by provider and categories. When you don\'t feel like reading the full thing, you can get an AI summary or chat with AI over any article.',
    ],
  },
];

export default function ProjectShowcase() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('relay');

  const activeProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <section id="work" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col gap-2.5 mb-6 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
          <span>Work</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          Selected{' '}
          <span className="font-serif italic font-normal text-zinc-500 dark:text-zinc-400">
            projects
          </span>
          .
        </h2>
      </div>

      {/* Project Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PROJECTS.map((p) => {
          const isSelected = p.id === selectedProjectId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className={cn(
                'flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer',
                isSelected
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800'
              )}
            >
              <span className="text-[10px] opacity-50">{p.number}</span>
              <span>{p.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Project Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-lg shadow-zinc-950/3 dark:shadow-black/15 flex flex-col gap-6"
        >
          {/* Title Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-5">
            <div>
              <h3 className="text-2xl sm:text-3xl font-sans font-medium text-zinc-950 dark:text-zinc-50">
                {activeProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">{activeProject.tagline}</p>
            </div>

            <a
              href={activeProject.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <Github className="size-3.5" />
              <span>Source</span>
              <ExternalLink className="size-3 text-zinc-400" />
            </a>
          </div>

          {/* Description */}
          <div className="space-y-3 font-sans text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
            {activeProject.description.map((desc, i) => (
              <p key={i}>{desc}</p>
            ))}
          </div>

          {/* Stack — plain, no highlighting */}
          <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
            <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              {activeProject.stack.map((item, i) => (
                <span key={item}>
                  {item}{i < activeProject.stack.length - 1 && <span className="ml-2 text-zinc-300 dark:text-zinc-700">·</span>}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
