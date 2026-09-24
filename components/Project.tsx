'use client'

import { HeroLayoutGuides, SecondPageLayoutGuides } from "./LayoutGuides";
import ProjectCards from "./ProjectCards";
import { SleekBox } from "./Sleek";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Project from "@/lib/Project";
import { StarsBackground } from "./ui/stars-background";
import { ShootingStars } from "./ui/shooting-stars";
import GitHubStats from "./Github";
import About from "./About";
import Favorites from "./Favorites";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

export default function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? Project.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === Project.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center bg-background font-mono border-b border-border">
            <ShootingStars minSpeed={20} minDelay={5000} />
            <StarsBackground />
            <HeroLayoutGuides />

            {/* Desktop Layout - Hidden on mobile */}
            <div className="hidden lg:flex max-w-4xl relative flex-1 w-full flex-col pt-20">
                {/* <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[996px] pointer-events-none border-l border-r border-border"/> */}

                <div className="absolute top-10 left-4">
                    <SleekBox className="w-[150]">
                        <span className="text-xl text-text pl-5">Projects</span>
                    </SleekBox>
                </div>

                {/* Card Carousel Container */}
                <div className="relative flex items-center justify-center gap-4 px-16 line-above line-bottom">
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 z-10 p-2 text-foreground hover:text-foreground/50 transition-colors cursor-pointer"
                        aria-label="Previous project"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex-1 max-w-225 overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {Project.map((p, i) => (
                                <div className="min-w-full" key={`Project-card-${i}`}>
                                    <ProjectCards title={p.title} description={p.description} source={p.source} color={p.color} bg={p.bg} button={p.button} />
                                </div>
                            ))}
                            {/* <div className="min-w-full">
                                <ProjectCards title={Project[0].title} description={Project} />
                            </div>
                            <div className="min-w-full">
                                <ProjectCards title="DailyLog" />
                            </div>
                            <div className="min-w-full">
                                <ProjectCards title="Gloo" />
                            </div> */}
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 z-10 p-2 text-foreground hover:text-foreground/50 transition-colors cursor-pointer"
                        aria-label="Next project"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex justify-center gap-2 mt-6">
                    {Project.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                'w-2 h-2 rounded-full transition-colors',
                                index === currentIndex ? 'bg-foreground' : 'bg-border hover:bg-[#888]'
                            )}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
            <GitHubStats />
            <About />
            {/* <Favorites/> */}
            <Footer />
        </div>
    )
}