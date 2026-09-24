'use client';

export default function BackgroundV1() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* Static gradient layers — museum overhead lighting */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 80% 50% at 50% 12%, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 78% 65%, rgba(139, 92, 246, 0.03) 0%, transparent 65%)',
            'radial-gradient(ellipse 45% 45% at 12% 78%, rgba(251, 191, 36, 0.02) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* Top edge light spill — like overhead lighting hitting a surface */}
      <div
        className="absolute top-0 left-0 right-0 h-[40vh] opacity-50 dark:opacity-100"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.018) 0%, transparent 100%)',
        }}
      />

      {/* Fine dot grid — spatial structure at 48px intervals */}
      <div className="absolute inset-0 bg-dot-grid-fine opacity-[0.03] dark:opacity-[0.04]" />

      {/* Film grain — analog texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.018] dark:opacity-[0.028] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ mixBlendMode: 'overlay' }}
      >
        <filter id="grain-v1">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-v1)" />
      </svg>

      {/* Edge vignette — dark mode only */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 30%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}
