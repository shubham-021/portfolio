'use client';

import React from 'react';
import AmbientBackground from '@/components/AmbientBackground';
import NavigationDock from '@/components/NavigationDock';
import HeroEditorial from '@/components/HeroEditorial';
import StackMatrix from '@/components/StackMatrix';
import ProjectShowcase from '@/components/ProjectShowcase';
import SubstrateSection from '@/components/SubstrateSection';
import UpstreamSection from '@/components/UpstreamSection';
import FooterEditorial from '@/components/FooterEditorial';
import BackgroundV1 from '@/components/BackgroundV1';

export default function Home() {
  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden selection:bg-zinc-500/20 selection:text-foreground">
      <BackgroundV1 />

      {/* Floating Dynamic Navigation Capsule */}
      <NavigationDock />

      {/* Main Content Flow */}
      <main className="relative z-10 flex flex-col">
        {/* Section 00: Overview & Hero */}
        <HeroEditorial />

        {/* Section 01: Core Technologies (Moved to top per request) */}
        <StackMatrix />

        {/* Section 02: Selected Projects */}
        <ProjectShowcase />

        {/* Section 03: CS Substrate & GATE */}
        <SubstrateSection />

        {/* Section 04: Upstream Contributions & GitHub Activity */}
        <UpstreamSection />

        {/* Section 05: Contact & Colophon */}
        <FooterEditorial />
      </main>
    </div>
  );
}