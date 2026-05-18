"use client";

import { useState, useRef, useEffect } from "react";

type Cursor = {
  x: number;
  y: number;
  visible: boolean;
};

type Drag = {
  active: boolean;
  startX: number;
  currentX: number;
};

export type HeroSlide = string | { src: string; poster?: string };

export default function HeroStack({ slides }: { slides: HeroSlide[] }) {
  const [cursor, setCursor] = useState({ x: 50, y: 50, visible: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const [drag, setDrag] = useState<Drag>({ active: false, startX: 0, currentX: 0 });

  const getSlide = (offset: number) => {
    const slide = slides[(activeIndex + offset + slides.length) % slides.length];
    if (typeof slide === "string") {
      return { src: slide, poster: undefined };
    }
    return slide;
  };
  const dragOffset = drag.active ? drag.currentX - drag.startX : 0;
  const rotation = dragOffset * 0.035;

  function updateCursor(event: React.PointerEvent<HTMLDivElement>, visible = true) {
    const rect = event.currentTarget.getBoundingClientRect();
    const isHoveringButton = !!(event.target as HTMLElement).closest('.heroPlayBtn');
    setCursor({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      visible: visible && !isHoveringButton,
    });
  }

  function finishSwipe(offset = dragOffset) {
    const threshold = 70;

    if (Math.abs(offset) > threshold) {
      setActiveIndex((current) => (
        offset < 0
          ? (current + 1) % slides.length
          : (current - 1 + slides.length) % slides.length
      ));
    }

    setDrag({ active: false, startX: 0, currentX: 0 });
  }

  return (
    <div
      className="heroStack"
      onPointerEnter={(event) => updateCursor(event)}
      onPointerLeave={() => {
        setCursor((current: Cursor) => ({ ...current, visible: false }));
        if (drag.active) {
          finishSwipe();
        }
      }}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateCursor(event);
        setDrag({ active: true, startX: event.clientX, currentX: event.clientX });
      }}
      onPointerMove={(event) => {
        updateCursor(event);
        if (drag.active) {
          setDrag((current) => ({ ...current, currentX: event.clientX }));
        }
      }}
      onPointerUp={(event) => {
        updateCursor(event);
        finishSwipe(drag.active ? event.clientX - drag.startX : 0);
      }}
      onPointerCancel={() => {
        setDrag({ active: false, startX: 0, currentX: 0 });
      }}
    >
      <SlideItem className="heroCard heroCardThird" src={getSlide(2).src} poster={getSlide(2).poster} alt="Previous content slide" isActive={false} />
      <SlideItem className="heroCard heroCardSecond" src={getSlide(1).src} poster={getSlide(1).poster} alt="Next content slide" isActive={false} />
      <SlideItem
        className={drag.active ? "heroCard heroCardMain isDragging" : "heroCard heroCardMain"}
        src={getSlide(0).src}
        poster={getSlide(0).poster}
        alt="Featured social media campaign"
        isActive={true}
        style={{
          transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
        }}
      />
      <div
        className={cursor.visible ? "heroSwipe isVisible" : "heroSwipe"}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      >
        <span>←</span>
        <b>Swipe</b>
        <span>→</span>
      </div>
    </div>
  );
}

function SlideItem({ src, className, style, alt, isActive, poster }: { src: string, className: string, style?: React.CSSProperties, alt?: string, isActive?: boolean, poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(isActive);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play().catch(e => console.log('Playback error:', e));
      } else {
        videoRef.current.pause();
        if (poster) {
          videoRef.current.load();
        }
      }
    }
  }, [isActive, src, isPlaying, poster]);

  useEffect(() => {
    // Reset to play when it becomes active
    if (isActive) {
      setIsPlaying(true);
    }
  }, [isActive]);

  const isVideo = src.toLowerCase().includes('.mp4') || src.toLowerCase().includes('.webm');

  const togglePlay = (e: React.PointerEvent) => {
    e.stopPropagation(); // Prevent swiping when clicking the button
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`${className} videoSlideWrapper`} style={{ ...style, overflow: 'hidden' }}>
      {isVideo ? (
        <video
          ref={videoRef}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} src={src} alt={alt} draggable={false} />
      )}
      
      {/* Show play/pause button ONLY on the active card */}
      {isActive && (
        <button 
          className={`heroPlayBtn ${isPlaying ? 'playing' : 'paused'}`}
          onPointerDown={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          <div className="playBtnInner">
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </button>
      )}
    </div>
  );
}
