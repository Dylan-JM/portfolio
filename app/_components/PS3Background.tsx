'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Wave from 'react-wavify';
import { Meteors } from '@/components/ui/meteors';

const PARTICLE_COUNT = 80;

const WAVE_LAYERS = [
  {
    fill: 'rgba(30, 58, 95, 0.22)',
    height: 24,
    amplitude: 28,
    speed: 0.08,
    points: 4,
    opacity: 0.28,
    top: '35%',
  },
  {
    fill: 'rgba(75, 42, 107, 0.2)',
    height: 20,
    amplitude: 22,
    speed: 0.12,
    points: 5,
    opacity: 0.25,
    top: '42%',
  },
  {
    fill: 'rgba(92, 74, 155, 0.26)',
    height: 28,
    amplitude: 32,
    speed: 0.06,
    points: 6,
    opacity: 0.32,
    top: '48%',
  },
  {
    fill: 'rgba(107, 90, 186, 0.18)',
    height: 18,
    amplitude: 20,
    speed: 0.1,
    points: 4,
    opacity: 0.2,
    top: '55%',
  },
  {
    fill: 'rgba(74, 53, 133, 0.3)',
    height: 22,
    amplitude: 26,
    speed: 0.07,
    points: 5,
    opacity: 0.35,
    top: '62%',
  },
];

export default function PS3Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const particlesRef = useRef<SVGCircleElement[]>([]);

  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      cx: Math.random() * 1920,
      cy: 200 + Math.random() * 680,
      r: 0.5 + Math.random() * 1.5,
      opacity: 0.2 + Math.random() * 0.5,
    }))
  );

  useLayoutEffect(() => {
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background:
            'linear-gradient(135deg, #0a0a0c 0%, #0f0a12 25%, #1a0f1e 50%, #1e0a14 75%, #2a0a12 100%)',
        }}
      />
      <Meteors
        number={12}
        minDuration={4}
        maxDuration={12}
        angle={200}
        className="opacity-35"
      />
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
              fill={layer.fill}
              paused={false}
              options={{
                height: layer.height,
                amplitude: layer.amplitude,
                speed: layer.speed,
                points: layer.points,
              }}
              style={{
                opacity: layer.opacity,
                width: '100%',
                height: '100%',
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
        <g fill="#f5e6c8" opacity={0.6}>
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
        className="absolute inset-0 animate-gradient-shift pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(40,10,15,0.15) 100%)',
          animationDelay: '-6s',
        }}
      />
    </div>
  );
}
