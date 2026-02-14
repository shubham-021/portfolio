'use client'

import Hero from "@/components/Hero";
import Projects from "@/components/Project";
import ThirdPage from "@/components/Github";
import Projects2 from "@/components/Projects2";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { HeroLayoutGuides, HeroLayoutGuidesMin } from "@/components/LayoutGuides";
import { memo } from "react";

const Home = memo(function Home(){

  return(
    <div className="relative bg-background overflow-x-hidden min-[570px]:px-5">
      <ShootingStars className="fixed" minSpeed={20} minDelay={5000} />
      <StarsBackground className="fixed"/>
      <HeroLayoutGuides />
      <HeroLayoutGuidesMin/>
      <Hero/>
      <Projects2/>
      {/* <ThirdPage/> */}
    </div>
    
  )
});

export default Home;