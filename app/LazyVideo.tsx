"use client";

import React, { useRef, useEffect } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export default function LazyVideo({ src, ...props }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use IntersectionObserver to play/pause video dynamically based on visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { 
        root: null, // use viewport
        rootMargin: '100px', // start loading/playing slightly before it rolls on screen
        threshold: 0.05 // play when at least 5% is visible
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      preload="none" // do not pre-fetch full video data until observer binds
      {...props}
    />
  );
}
