'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GitPullRequest,
  GitMerge,
  GitPullRequestClosed,
  ExternalLink,
  ChevronDown,
  GitCommit,
} from 'lucide-react';
import contributions from '@/lib/Contributions';
import GitHubContributionChart from './GithubContributionChart';
import { cn } from '@/lib/utils';

export default function UpstreamSection() {
  const [filter, setFilter] = useState<'all' | 'merged' | 'open' | 'closed'>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredContributions = contributions.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const mergedCount = contributions.filter((c) => c.status === 'merged').length;
  const openCount = contributions.filter((c) => c.status === 'open').length;

  return (
    <section id="upstream" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col gap-2.5 mb-6 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
          <span>Upstream &amp; Activity</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
            Open source{' '}
            <span className="font-serif italic font-normal text-zinc-500 dark:text-zinc-400">
              contributions
            </span>
            .
          </h2>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">{mergedCount} Merged</span>
            <span>•</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">{openCount} In Review</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:gap-7">
        {/* GitHub Contribution Heatmap Card */}
        <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-lg shadow-zinc-950/2 dark:shadow-black/20 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                <GitCommit className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold font-sans text-zinc-900 dark:text-zinc-100">
                  GitHub Activity
                </h3>
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">@shubham-021 // rolling annual commit graph</span>
              </div>
            </div>
            <a
              href="https://github.com/shubham-021"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition-colors"
            >
              <span>Inspect Profile</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          <div className="w-full py-2">
            <GitHubContributionChart username="shubham-021" />
          </div>
        </div>

        {/* Upstream PRs Log */}
        <div className="flex flex-col gap-5">
          {/* Header & Filter Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-sans font-medium text-zinc-900 dark:text-zinc-100">
                Pull Requests &amp; Patches
              </h3>
              <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                Bugfixes and features upstreamed to Vercel AI SDK and Mem0
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 font-mono text-xs">
              {(['all', 'merged', 'open', 'closed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={cn(
                    'px-3 py-1 rounded-lg capitalize transition-colors cursor-pointer',
                    filter === status
                      ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-100 font-semibold shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* PR Items List */}
          <div className="flex flex-col gap-3">
            {filteredContributions.map((pr) => {
              const isExpanded = expandedId === pr.id;

              return (
                <motion.div
                  key={pr.id}
                  layout="position"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 overflow-hidden transition-colors duration-200 hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  {/* PR Header Button */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : pr.id)}
                    aria-expanded={isExpanded}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none group"
                  >
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      {/* PR Status Icon */}
                      <div className="mt-0.5 shrink-0">
                        {pr.status === 'merged' && (
                          <div className="size-7 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                            <GitMerge className="size-4" />
                          </div>
                        )}
                        {pr.status === 'open' && (
                          <div className="size-7 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                            <GitPullRequest className="size-4" />
                          </div>
                        )}
                        {pr.status === 'closed' && (
                          <div className="size-7 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500">
                            <GitPullRequestClosed className="size-4" />
                          </div>
                        )}
                      </div>

                      {/* PR Title & Metadata */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                            {pr.repo}
                          </span>
                          <span className="text-xs font-mono text-zinc-400">{pr.issue}</span>
                          <span
                            className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400"
                          >
                            {pr.status}
                          </span>
                        </div>

                        <h4 className="text-sm font-sans font-medium text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                          {pr.title}
                        </h4>
                      </div>
                    </div>

                    {/* Expand Indicator */}
                    <div className="flex items-center gap-2 shrink-0 text-zinc-400 mt-0.5">
                      <span className="text-xs font-mono text-zinc-400 hidden sm:inline">{pr.date}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors"
                      >
                        <ChevronDown className="size-4" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expanded Technical Explanation */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key={`content-${pr.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: {
                              duration: 0.3,
                              ease: [0.04, 0.62, 0.23, 0.98],
                            },
                            opacity: {
                              duration: 0.22,
                              delay: 0.06,
                            },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: {
                              duration: 0.24,
                              ease: [0.04, 0.62, 0.23, 0.98],
                            },
                            opacity: {
                              duration: 0.12,
                            },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/30 p-4 sm:p-5">
                          <div className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                            {pr.description}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 font-mono text-xs">
                            <span className="text-zinc-400">Submitted: {pr.date}</span>
                            <a
                              href={pr.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 hover:underline font-medium"
                            >
                              <span>Inspect on GitHub</span>
                              <ExternalLink className="size-3" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
