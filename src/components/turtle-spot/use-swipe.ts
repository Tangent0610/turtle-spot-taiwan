"use client";

import type { PointerEvent } from "react";
import { useRef } from "react";
import { swipeThreshold } from "@/config/ui";

export type SwipeEvent = PointerEvent<HTMLElement>;

export const useSwipe = ({
  onTap,
  onNext,
  onPrevious,
}: {
  onTap?: (event: SwipeEvent) => void;
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const start = useRef<{ x: number; y: number } | null>(null);

  const reset = () => {
    start.current = null;
  };

  const startSwipe = (x: number, y: number) => {
    start.current = { x, y };
  };

  const endSwipe = (x: number, y: number, event: SwipeEvent) => {
    if (!start.current) {
      return;
    }

    const dx = x - start.current.x;
    const dy = y - start.current.y;
    reset();

    if (Math.abs(dx) < swipeThreshold && Math.abs(dy) < swipeThreshold) {
      onTap?.(event);
      return;
    }

    if (Math.abs(dx) < swipeThreshold || Math.abs(dx) < Math.abs(dy)) {
      return;
    }

    if (dx < 0) {
      onNext();
      return;
    }

    onPrevious();
  };
  return {
    onPointerCancel: reset,
    onPointerDown: (event: PointerEvent<HTMLElement>) =>
      startSwipe(event.clientX, event.clientY),
    onPointerLeave: reset,
    onPointerUp: (event: PointerEvent<HTMLElement>) =>
      endSwipe(event.clientX, event.clientY, event),
  };
};
