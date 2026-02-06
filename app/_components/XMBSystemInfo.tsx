'use client';

import { useState, useEffect } from 'react';

export default function XMBSystemInfo() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed top-8 right-8 text-right text-foreground/80">
      <div className="text-2xl font-light tracking-wider">
        {formatTime(time)}
      </div>
      <div className="text-sm opacity-70">
        {formatDate(time)}
      </div>
    </div>
  );
}
