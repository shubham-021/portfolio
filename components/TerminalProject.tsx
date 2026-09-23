'use client';

import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Globe, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TerminalProject({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group grid grid-cols-1 md:grid-cols-12 min-h-0 md:min-h-[300px] relative overflow-hidden border-b border-border last:border-b-0"
    >
        {/* Index Column */}
        <div className="col-span-1 md:col-span-1 border-b md:border-b-0 md:border-r border-border p-3 md:p-6 flex items-start justify-center">
            <span className="text-xs text-muted-foreground font-mono">0{index + 1}</span>
        </div>

        {/* Title & Stats Column */}
        <div className={cn(
            "col-span-1 md:col-span-4 border-b md:border-b-0 md:border-r border-border p-4 md:p-6 flex flex-col justify-between relative bg-background/50 transition-colors duration-300",
            project.hover
        )}>
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Terminal className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Module_Name</span>
                </div>
                <h2 className={cn("text-2xl md:text-4xl font-bold uppercase wrap-break-word mb-2", project.color)}>
                    {project.title.join('')}
                </h2>
            </div>

            <div className="mt-8 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase font-mono">
                    <Cpu className="w-3 h-3" />
                    <span>Stack Trace:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech: string) => (
                        <span key={tech} className="text-[10px] md:text-xs rounded-md border border-border px-2 py-1 bg-background font-mono">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Description Column */}
        <div className="col-span-1 md:col-span-7 p-4 md:p-6 flex flex-col justify-between">
            <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="flex items-center gap-2 mb-6 border-b border-border pb-2 w-fit">
                    <Code className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Description.md</span>
                </div>
                {project.description.map((desc: string, i: number) => (
                    <p key={i} className="text-sm md:text-base leading-relaxed opacity-80 mb-3 font-light font-sans">
                        {`> ${desc}`}
                    </p>
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "group/link flex items-center gap-3 px-5 py-2 border text-xs md:text-sm rounded-lg uppercase tracking-wider transition-all hover:text-text/60 font-mono",
                        project.button
                    )}
                >
                    {/*<Globe className="w-4 h-4" />*/}
                    {">_ Git --show"}
                    {/*<ArrowUpRight className="w-4 h-4 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" />*/}
                </a>
            </div>
        </div>

        {/* Hover Effect Line */}
        {/* <div className={cn(
            "absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left",
            project.bg
        )} /> */}
    </motion.div>
  );
}
