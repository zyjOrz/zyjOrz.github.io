'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ----------------------------------------------------------- scroll reveal */

// Marks [data-reveal] elements with .is-in as they scroll into view. Hidden
// states only apply under html.reveal, which is set here, after anything
// already on screen has been marked, so nothing visible ever blinks out.
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('motion')) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const fold = window.innerHeight;
    for (const item of items) {
      const top = item.getBoundingClientRect().top;
      if (top < fold * 0.92) item.classList.add('is-in');
    }
    root.classList.add('reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    items.filter((item) => !item.classList.contains('is-in')).forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return null;
}

/* ------------------------------------------------------------------- dial */

// Turns the dial slowly on its own and further as the page scrolls, easing
// towards the scroll position so the motion never jerks.
export function DialMotion({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    const spin = host?.querySelector<SVGGElement>('.dial-spin');
    if (!host || !spin || reduced()) return;

    let frame = 0;
    let visible = true;
    let last = performance.now();
    let drift = 0;
    let turned = window.scrollY * 0.22;

    const tick = (now: number) => {
      frame = 0;
      if (!visible) return;
      const dt = Math.min(64, now - last);
      last = now;
      drift += dt * 0.004; // about one turn every 90 s
      const target = window.scrollY * 0.22;
      turned += (target - turned) * (1 - Math.exp(-dt / 180));
      spin.style.transform = `rotate(${(turned + drift).toFixed(2)}deg)`;
      frame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) {
        last = performance.now();
        frame = window.requestAnimationFrame(tick);
      }
    });
    observer.observe(host);
    frame = window.requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}

/* ------------------------------------------------- status chip and numeral */

const statuses = [
  { tag: 'Currently', text: 'MSC Lab · UC Berkeley' },
  { tag: 'Also', text: 'Embodied Minds Lab · Harvard (remote)' },
  { tag: 'Seeking', text: 'PhD positions · Fall 2027' },
];

// Beside the arch: a numeral and a status chip that cross-fade, with a
// little blur, through what the visitor should know first.
export function StatusTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced()) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % statuses.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <span className="numeral numeral-arch" aria-hidden="true">
        {statuses.map((_, i) => (
          <span key={i} className={`swap${i === index ? ' is-on' : ''}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
        ))}
      </span>
      <p className="arch-chip" aria-hidden="true">
        {statuses.map((status, i) => (
          <span key={status.tag} className={`swap arch-chip-item${i === index ? ' is-on' : ''}`}>
            <span className="tag-ink">{status.tag}</span>
            {status.text}
          </span>
        ))}
      </p>
    </>
  );
}
