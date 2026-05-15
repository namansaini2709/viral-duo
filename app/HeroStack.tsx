"use client";

import { useState } from "react";

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

export default function HeroStack({ slides }: { slides: string[] }) {
  const [cursor, setCursor] = useState({ x: 50, y: 50, visible: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const [drag, setDrag] = useState<Drag>({ active: false, startX: 0, currentX: 0 });

  const getSlide = (offset: number) => slides[(activeIndex + offset + slides.length) % slides.length];
  const dragOffset = drag.active ? drag.currentX - drag.startX : 0;
  const rotation = dragOffset * 0.035;

  function updateCursor(event: React.PointerEvent<HTMLDivElement>, visible = true) {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      visible,
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
      <img className="heroCard heroCardThird" src={getSlide(2)} alt="Previous content slide" draggable={false} />
      <img className="heroCard heroCardSecond" src={getSlide(1)} alt="Next content slide" draggable={false} />
      <img
        className={drag.active ? "heroCard heroCardMain isDragging" : "heroCard heroCardMain"}
        src={getSlide(0)}
        alt="Featured social media campaign"
        draggable={false}
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
