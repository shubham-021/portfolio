'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  speedY: number;
  swaySpeed: number;
  swayAmp: number;
  phase: number;
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId: number;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    const PARTICLE_COUNT = 36;

    const isDarkMode = () => document.documentElement.classList.contains('dark');

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.6 + Math.random() * 1.0, // 0.6px to 1.6px
          baseAlpha: 0.12 + Math.random() * 0.22, // subtle 0.12 to 0.34
          speedY: 0.12 + Math.random() * 0.22, // slow upward float
          swaySpeed: 0.006 + Math.random() * 0.012,
          swayAmp: 0.3 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      if (particles.length === 0) {
        initParticles();
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = isDarkMode();
      const rgb = dark ? '244, 244, 245' : '39, 39, 42'; // zinc-100 in dark, zinc-800 in light

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.y -= p.speedY;
          p.x += Math.sin(p.phase) * p.swayAmp * 0.3;
          p.phase += p.swaySpeed;

          // Wrap around top to bottom
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        // Natural soft breathing alpha
        const breathingAlpha = p.baseAlpha * (0.8 + 0.2 * Math.sin(p.phase * 1.5));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${breathingAlpha})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* 1. Deep Ambient Orbital Glows (Breathing monochromatic orbs) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-Center Warm Luminescence */}
        <div
          className="absolute -top-[15%] left-[20%] w-[680px] h-[680px] rounded-full blur-[140px] opacity-70 bg-zinc-300/[0.07] dark:bg-zinc-200/[0.04] animate-ambient-slow"
        />

        {/* Mid-Right Counter-Drift Node */}
        <div
          className="absolute top-[35%] -right-[8%] w-[580px] h-[580px] rounded-full blur-[130px] opacity-60 bg-zinc-400/[0.06] dark:bg-zinc-300/[0.035] animate-ambient-reverse"
        />

        {/* Bottom-Left Calming Anchor */}
        <div
          className="absolute bottom-[5%] -left-[10%] w-[640px] h-[640px] rounded-full blur-[150px] opacity-75 bg-zinc-400/[0.06] dark:bg-zinc-100/[0.035] animate-ambient-pulse"
        />
      </div>

      {/* 2. Precision Architectural Drafting Grid with Radial Vignette Fade */}
      <div className="absolute inset-0 bg-atelier-grid radial-mask-vignette opacity-80 dark:opacity-65" />

      {/* 3. Subtle Horizontal Substrate Scan Line (Sweeps every 22s) */}
      <div className="absolute left-0 right-0 h-44 bg-gradient-to-b from-transparent via-zinc-400/[0.03] dark:via-zinc-100/[0.02] to-transparent animate-substrate-sweep" />

      {/* 4. Autonomous Micro-Motes (Stardust / Cleanroom particle field) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 dark:opacity-75"
      />

      {/* 5. Microscopic Studio Grain Overlay (Prevents OLED banding, gives physical depth) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.018] dark:opacity-[0.025] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
