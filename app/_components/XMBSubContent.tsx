'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface XMBSubContentProps {
  icon: string;
  title: string;
  description: string;
  tech?: string[];
  link?: string;
  isActive: boolean;
}

export default function XMBSubContent({ icon, title, description, tech, link, isActive }: XMBSubContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div ref={contentRef} className="absolute top-72 right-8 w-96 max-h-96 overflow-y-auto">
      <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-3">{icon}</span>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>
        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-500/20 text-blue-500 text-xs rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span className="mr-2">🔗</span>
            <span className="text-sm">View Project</span>
          </a>
        )}
      </div>
    </div>
  );
}
