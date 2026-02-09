"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="fixed top-8 right-8 z-[100]">
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
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-foreground/10 space-y-2 opacity-100 transition-opacity duration-200">
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs opacity-70">Achievements</span>
              <div className="relative w-6 h-6">
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
              className="block text-sm text-blue-500 hover:text-blue-400 hover:underline text-right"
              onClick={(e) => e.stopPropagation()}
            >
              View CV
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
