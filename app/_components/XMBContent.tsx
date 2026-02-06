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
    <div 
      ref={contentRef}
      className={`absolute top-72 right-8 w-96 max-h-96 overflow-y-auto transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
        <div className="flex items-center mb-6">
          <span className="text-4xl mr-3">{icon}</span>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>

      </div>
      
      {/* Sub-content positioned to the right */}
      {children && (
        <div className="absolute top-0 left-1/2 ml-8 pl-8 border-l border-border/30 max-w-md">
          {children}
        </div>
      )}
    </div>
  );
}
