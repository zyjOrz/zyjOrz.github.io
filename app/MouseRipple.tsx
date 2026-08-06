'use client';

import { useEffect, useRef } from 'react';

type Ripple = {
  x: number;
  y: number;
  bornAt: number;
  lifetime: number;
  maximumRadius: number;
  opacity: number;
  lineWidth: number;
};

const MAX_RIPPLES = 72;

export default function MouseRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');

    if (reducedMotion.matches || !finePointer.matches) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let ripples: Ripple[] = [];
    let animationFrame = 0;
    let lastX = Number.NaN;
    let lastY = Number.NaN;
    let lastRippleAt = 0;
    let devicePixelRatio = 1;

    const resizeCanvas = () => {
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * devicePixelRatio);
      canvas.height = Math.round(window.innerHeight * devicePixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const draw = (timestamp: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const remaining: Ripple[] = [];
      context.lineCap = 'round';

      for (const ripple of ripples) {
        const elapsed = timestamp - ripple.bornAt;
        if (elapsed < 0) {
          remaining.push(ripple);
          continue;
        }

        const progress = elapsed / ripple.lifetime;
        if (progress >= 1) {
          continue;
        }

        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const radius = 5 + ripple.maximumRadius * easedProgress;
        const opacity = ripple.opacity * Math.pow(1 - progress, 1.7);

        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(211, 79, 131, ${opacity})`;
        context.lineWidth = ripple.lineWidth * (1 - progress * 0.35);
        context.stroke();

        context.beginPath();
        context.arc(ripple.x, ripple.y, radius * 0.72, 0, Math.PI * 2);
        context.strokeStyle = `rgba(218, 199, 255, ${opacity * 0.54})`;
        context.lineWidth = Math.max(0.65, ripple.lineWidth * 0.58);
        context.stroke();

        remaining.push(ripple);
      }

      ripples = remaining;
      animationFrame = ripples.length ? window.requestAnimationFrame(draw) : 0;
    };

    const startAnimation = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const addRipple = (ripple: Ripple) => {
      ripples.push(ripple);
      if (ripples.length > MAX_RIPPLES) {
        ripples = ripples.slice(ripples.length - MAX_RIPPLES);
      }
      startAnimation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return;
      }

      const now = performance.now();
      const distance = Number.isNaN(lastX)
        ? Number.POSITIVE_INFINITY
        : Math.hypot(event.clientX - lastX, event.clientY - lastY);

      if (distance >= 22 || now - lastRippleAt >= 72) {
        addRipple({
          x: event.clientX,
          y: event.clientY,
          bornAt: now,
          lifetime: 820,
          maximumRadius: 34 + Math.min(distance, 46) * 0.18,
          opacity: 0.23,
          lineWidth: 1.25,
        });

        lastX = event.clientX;
        lastY = event.clientY;
        lastRippleAt = now;
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return;
      }

      const now = performance.now();
      [0, 95, 190].forEach((delay, index) => {
        addRipple({
          x: event.clientX,
          y: event.clientY,
          bornAt: now + delay,
          lifetime: 1_080 + index * 90,
          maximumRadius: 62 + index * 18,
          opacity: 0.34 - index * 0.055,
          lineWidth: 1.7 - index * 0.18,
        });
      });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="mouse-ripple-canvas" aria-hidden="true" />;
}
