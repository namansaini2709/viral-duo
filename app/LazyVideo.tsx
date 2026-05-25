"use client";

import React, { useRef, useEffect, useState } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
}

export default function LazyVideo({ src, poster, className, style, ...props }: LazyVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
            setIsReady(false);
          }
        });
      },
      { 
        root: null, // use viewport
        rootMargin: '200px', // start loading/playing before it rolls on screen
        threshold: 0.05
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        ...style
      }}
    >
      {/* Background layer: Static poster image */}
      {poster && (
        <img
          src={poster}
          alt=""
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: (style?.objectFit as any) || 'cover',
            borderRadius: 'inherit',
            opacity: isReady ? 0 : 1,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}

      {/* Foreground layer: Video is only mounted when in viewport */}
      {isInView && (
        <video
          src={src}
          poster={poster}
          onPlaying={() => setIsReady(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
            opacity: poster ? (isReady ? 1 : 0) : 1,
            transition: 'opacity 0.3s ease',
            position: poster ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            zIndex: 2,
            ...style
          }}
          {...props}
        />
      )}
    </div>
  );
}

