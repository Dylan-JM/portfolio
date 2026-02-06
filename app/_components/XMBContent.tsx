'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface XMBContentProps {
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  children?: React.ReactNode;
}

export default function XMBContent({ title, description, icon, isActive, children }: XMBContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div ref={contentRef} className="absolute top-72 left-1/2 transform -translate-x-1/2 text-center max-w-4xl">
      <div className="flex items-center justify-center mb-6">
        <span className="text-6xl mr-4">{icon}</span>
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
          {title}
        </h1>
      </div>
      <p className="text-xl text-muted-foreground mb-8">{description}</p>
      {children}
    </div>
  );
}
