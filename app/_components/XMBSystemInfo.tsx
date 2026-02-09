"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function XMBSystemInfo() {
  const [time, setTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const achievementsCount = 39;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="fixed top-8 right-8 z-[100] flex items-start gap-2">
      <ThemeToggle />
      <div
        className="text-right text-foreground/80 cursor-pointer select-none rounded-lg border border-transparent hover:border-foreground/20 hover:bg-foreground/5 transition-colors p-2 -m-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Minimized: name + view cv + achievements | date & time */}
        <div className="flex items-center justify-end gap-6">
          <div className="flex flex-col items-end gap-0.5">
            <div className="text-sm font-medium text-foreground">
              Dylan Marley
            </div>
            <div className="text-xs opacity-70">view cv</div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="relative w-4 h-4">
                <Image
                  src="/icons/achievement-list.png"
                  alt="Achievements"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-medium">{achievementsCount}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-light tracking-wider">
              {formatTime(time)}
            </div>
            <div className="text-sm opacity-70">{formatDate(time)}</div>
          </div>
        </div>

        {/* Expanded content */}
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            transitionDelay: isExpanded ? "150ms" : "0ms",
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="mt-3 pt-3 space-y-3 min-w-0">
              <div
                className="relative h-px -mt-px -mx-3 mb-3 bg-foreground/10 origin-left transition-[transform] duration-200 ease-out"
                style={{
                  transform: isExpanded ? "scaleX(1)" : "scaleX(0)",
                  transitionDelay: isExpanded ? "0ms" : "200ms",
                }}
                aria-hidden
              />
              <div className="flex items-center justify-end gap-4">
                <div className="relative size-16 shrink-0 rounded-full overflow-hidden border-2 border-foreground/20">
                  <Image
                    src="/Graduate Picture.jpg"
                    alt="Dylan Marley"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex flex-col items-end gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-70">Achievements</span>
                    <div className="relative w-5 h-5 shrink-0">
                      <Image
                        src="/icons/achievement-list.png"
                        alt="Achievements"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium">{achievementsCount}</span>
                  </div>
                  <Link
                    href="/Dylan_Marley_CV_SE.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:text-blue-400 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View CV
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
