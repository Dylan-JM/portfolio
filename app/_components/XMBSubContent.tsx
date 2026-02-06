'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface XMBSubContentProps {
  selectedIcon: string;
  selectedSubItem: string | null;
  subCategories: any;
}

export default function XMBSubContent({ selectedIcon, selectedSubItem, subCategories }: XMBSubContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedIcon && selectedSubItem && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [selectedIcon, selectedSubItem]);

  const selectedSubItemData = selectedSubItem ? 
    (subCategories[selectedIcon as keyof typeof subCategories] as any[])?.find((item: any) => item.id === selectedSubItem) : null;

  if (!selectedIcon || !selectedSubItem || !selectedSubItemData) return null;

  return (
    <div 
      ref={contentRef}
      className="absolute top-96 right-1/3 w-96 max-h-96 overflow-y-auto transition-opacity duration-500 opacity-100"
    >
      <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-3">{selectedSubItemData.icon}</span>
          <h3 className="text-xl font-semibold text-foreground">{selectedSubItemData.label}</h3>
        </div>
        <p className="text-muted-foreground mb-4">{selectedSubItemData.description}</p>
      </div>
    </div>
  );
}
