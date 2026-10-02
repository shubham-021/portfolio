'use client'

import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import CoreSystems from "@/components/CoreSystems";
import Projects2 from "@/components/Projects2";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { HeroLayoutGuides, HeroLayoutGuidesMin } from "@/components/LayoutGuides";
import { memo } from "react";

const Home = memo(function Home(){

  return(
    <div className="relative bg-background dark:bg-transparent overflow-x-hidden px-4 sm:px-6 lg:px-8">
      <ShootingStars className="fixed" minSpeed={20} minDelay={5000} />
      <StarsBackground className="fixed"/>
      <HeroLayoutGuides />
      <HeroLayoutGuidesMin/>
      <Hero/>
      <TechStack />
      <CoreSystems />
      <Projects2/>
    </div>
  )
});

export default Home;