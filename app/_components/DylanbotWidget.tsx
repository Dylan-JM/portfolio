'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { X, MessageCircle } from 'lucide-react';
import ChatInterface from './ChatInterface';

export default function DylanbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Start panel hidden
    gsap.set(panelRef.current, { opacity: 0, scale: 0.92, y: 16, pointerEvents: 'none' });

    // Animate the toggle button in after 1s
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, delay: 1, ease: 'back.out(1.7)' }
    );

    // Auto-open the panel after 2.5s
    const t = setTimeout(() => setIsOpen(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      gsap.to(panelRef.current, {
        opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)', pointerEvents: 'auto',
      });
    } else {
      gsap.to(panelRef.current, {
        opacity: 0, scale: 0.92, y: 16, duration: 0.25, ease: 'power2.in', pointerEvents: 'none',
      });
    }
  }, [isOpen]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
      {/* Chat panel — always mounted so ChatInterface retains conversation state */}
      <div
        ref={panelRef}
        className="w-80 bg-card/60 backdrop-blur-md border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ height: '440px' }}
      >
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border shrink-0 bg-card/30">
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-teal-500/40">
              <Image src="/ProfileImg.png" alt="DylanBot" fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">DylanBot</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                <p className="text-xs text-teal-500">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-foreground/10"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <ChatInterface />
        </div>

      {/* Toggle button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        style={{ opacity: 0 }}
        className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500/50 hover:border-teal-500 shadow-lg transition-colors group"
        aria-label="Chat with DylanBot"
      >
        <Image src="/ProfileImg.png" alt="DylanBot" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
      </button>
    </div>
  );
}
