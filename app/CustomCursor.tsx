'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';

type CursorSpark = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  delay: number;
  symbol: '✦' | '♥';
};

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor="interactive"]';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const nextSparkId = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [sparks, setSparks] = useState<CursorSpark[]>([]);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-enabled');

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;

    const renderCursor = () => {
      ringX += (targetX - ringX) * 0.2;
      ringY += (targetY - ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameRef.current = window.requestAnimationFrame(renderCursor);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (markRef.current) {
        markRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      setHovering(target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    const handlePointerDown = (event: PointerEvent) => {
      setPressed(true);

      const burst = Array.from({ length: 7 }, (_, index) => {
        const angle = (Math.PI * 2 * index) / 7 - Math.PI / 2;
        const distance = 22 + (index % 3) * 5;

        return {
          id: nextSparkId.current++,
          x: event.clientX,
          y: event.clientY,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          delay: index * 12,
          symbol: index % 3 === 0 ? ('♥' as const) : ('✦' as const),
        };
      });

      setSparks((current) => [...current, ...burst]);
      window.setTimeout(() => {
        const burstIds = new Set(burst.map((spark) => spark.id));
        setSparks((current) => current.filter((spark) => !burstIds.has(spark.id)));
      }, 760);
    };

    const handlePointerUp = () => setPressed(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });

    animationFrameRef.current = window.requestAnimationFrame(renderCursor);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div aria-hidden="true" className="custom-cursor-layer">
      <div
        ref={ringRef}
        className={`custom-cursor-ring${visible ? ' is-visible' : ''}${hovering ? ' is-hovering' : ''}${pressed ? ' is-pressed' : ''}`}
      />
      <div
        ref={markRef}
        className={`custom-cursor-mark${visible ? ' is-visible' : ''}${hovering ? ' is-hovering' : ''}${pressed ? ' is-pressed' : ''}`}
      >
        ✦
      </div>
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="cursor-click-spark"
          style={
            {
              left: spark.x,
              top: spark.y,
              '--spark-x': `${spark.dx}px`,
              '--spark-y': `${spark.dy}px`,
              '--spark-delay': `${spark.delay}ms`,
            } as CSSProperties
          }
        >
          {spark.symbol}
        </span>
      ))}
    </div>
  );
}
