'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Wave from 'react-wavify';
import { Meteors } from '@/components/ui/meteors';

const PARTICLE_COUNT = 80;

const WAVE_LAYERS = [
  { fillVar: '--ps3-wave-fill-1', opacityVar: '--ps3-wave-opacity-1', height: 24, amplitude: 28, speed: 0.08, points: 4, top: '35%' },
  { fillVar: '--ps3-wave-fill-2', opacityVar: '--ps3-wave-opacity-2', height: 20, amplitude: 22, speed: 0.12, points: 5, top: '42%' },
  { fillVar: '--ps3-wave-fill-3', opacityVar: '--ps3-wave-opacity-3', height: 28, amplitude: 32, speed: 0.06, points: 6, top: '48%' },
  { fillVar: '--ps3-wave-fill-4', opacityVar: '--ps3-wave-opacity-4', height: 18, amplitude: 20, speed: 0.1, points: 4, top: '55%' },
  { fillVar: '--ps3-wave-fill-5', opacityVar: '--ps3-wave-opacity-5', height: 22, amplitude: 26, speed: 0.07, points: 5, top: '62%' },
];

export default function PS3Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const particlesRef = useRef<SVGCircleElement[]>([]);

  const [particles, setParticles] = useState<Array<{ id: number; cx: number; cy: number; r: number; opacity: number }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        cx: Math.random() * 1920,
        cy: 200 + Math.random() * 680,
        r: 0.5 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.5,
      }))
    );
  }, []);

  useLayoutEffect(() => {
    if (particles.length === 0) return;
    const particleEls = particlesRef.current.filter(Boolean);
    if (particleEls.length === 0) return;

    const particleTween = gsap.to(particleEls, {
      opacity: 'random(0.15, 0.55)',
      duration: 4,
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.08 },
      ease: 'sine.inOut',
    });

    return () => { particleTween.kill(); };
  }, [particles.length]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 animate-gradient-shift transition-[background] duration-400 ease-out"
        style={{ background: 'var(--ps3-bg-gradient)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400 ease-out"
        style={{ opacity: 'var(--ps3-meteor-opacity)' }}
      >
        <Meteors
          number={12}
          minDuration={4}
          maxDuration={12}
          angle={200}
          className="absolute inset-0"
        />
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {WAVE_LAYERS.map((layer, i) => (
          <div
            key={i}
            ref={(el) => { waveWrappersRef.current[i] = el; }}
            className="absolute left-0 right-0 h-[40%]"
            style={{
              top: layer.top,
              minHeight: 200,
            }}
          >
            <Wave
              fill={`var(${layer.fillVar})`}
              paused={false}
              options={{
                height: layer.height,
                amplitude: layer.amplitude,
                speed: layer.speed,
                points: layer.points,
              }}
              style={{
                opacity: `var(${layer.opacityVar})`,
                width: '100%',
                height: '100%',
                transition: 'opacity 0.4s ease-out',
              }}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="particleGlow">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>
        <g fill="var(--ps3-particle-colour)" opacity={0.6} style={{ transition: 'fill 0.4s ease-out' }}>
          {particles.map((p, i) => (
            <circle
              key={p.id}
              ref={(el) => { if (el) particlesRef.current[i] = el; }}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              filter="url(#particleGlow)"
              style={{ opacity: p.opacity }}
            />
          ))}
        </g>
      </svg>
      <div
        className="absolute inset-0 animate-gradient-shift pointer-events-none transition-[background] duration-400 ease-out"
        style={{
          background: 'var(--ps3-bg-overlay)',
          animationDelay: '-6s',
        }}
      />
    </div>
  );
}
