'use client'

import { HeroLayoutGuides } from "./LayoutGuides";
import { useState } from "react";
import Project from "@/lib/Project";
import { StarsBackground } from "./ui/stars-background";
import { ShootingStars } from "./ui/shooting-stars";
import GitHubStats from "./Github";
import About from "./About";
import Footer from "./Footer";
import TerminalProject from "./TerminalProject";
import { cn } from "@/lib/utils";

export default function Projects2() {
    return (
        <div className="min-h-screen relative flex flex-col items-center font-mono border-b border-border">
            {/* <ShootingStars minSpeed={20} minDelay={5000} />
            <StarsBackground /> */}
            {/* <HeroLayoutGuides /> */}

            {/* Projects Layout - Visible on all screens */}
            <div className="flex max-w-4xl relative flex-1 w-full flex-col pt-10 gap-5">
                
                {/* Header Spec Sheet */}
                <header className="flex flex-row justify-between items-end gap-8 px-4">
                  <div>
                    <div className="flex whitespace-nowrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
                      System Status: Online
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter">
                      Project_<br />Manifest
                    </h1>
                  </div>
                  <div className="hidden min-[365px]:block text-right text-xs text-muted-foreground space-y-1 font-mono">
                    <p>ID: USR-007-PF</p>
                    <p>LOC: 127.0.0.1</p>
                    <p>DATE: {new Date().toLocaleDateString()}</p>
                  </div>
                </header>

                <div className={cn(
                  "w-full flex flex-col",
                  "relative before:content-[''] before:absolute before:pointer-events-none before:top-0 before:w-screen before:h-px before:bg-border before:left-1/2 before:-translate-x-1/2 before:z-50"
                )}>
                    {Project.map((p, i) => (
                        <TerminalProject key={p.id} project={p} index={i} />
                    ))}
                </div>
            </div>
            
            <div className={cn(
              "w-full max-w-4xl",
              "relative before:content-[''] before:absolute before:top-0 before:w-screen before:h-px before:left-1/2 before:-translate-x-1/2 before:bg-border"
            )}>
                 <GitHubStats/>
                 <About/>
                 <Footer/>
            </div>
        </div>
    )
}