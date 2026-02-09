'use client';

import { useEffect, useRef } from 'react';

export default function PS3Background() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video properties
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;

    // Attempt to play video (may be blocked by browser policies)
    video.play().catch(error => {
      console.log('Video autoplay failed:', error);
    });

    return () => {
      if (video) {
        video.pause();
        video.src = '';
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/vid.mp4"
      />
      
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
