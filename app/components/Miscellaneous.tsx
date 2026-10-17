'use client';

import type { ReactNode } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Section from './Section';

type Group = { label: string; notes: ReactNode };
type Snapshot = { height: number; labels: DOMRect[] };

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Rects as currently painted, so an animation interrupted halfway continues
// from where it visibly is.
function measure(list: HTMLElement): Snapshot {
  return {
    height: list.getBoundingClientRect().height,
    labels: Array.from(list.querySelectorAll('dt'), (dt) => dt.getBoundingClientRect()),
  };
}

function cancel(animations: Animation[]) {
  animations.forEach((animation) => animation.cancel());
  animations.length = 0;
}

// Folded by default: only the topic labels show, run together on one line.
// Opening slides each label into the left column (FLIP) and fades the notes
// in beside it; folding fades the notes out first, then slides the labels back.
export default function Miscellaneous({ groups }: { groups: Group[] }) {
  const [open, setOpen] = useState(false); // what the toggle shows
  const [shown, setShown] = useState(false); // whether the notes are laid out
  const listRef = useRef<HTMLDListElement>(null);
  const snapshot = useRef<Snapshot | null>(null);
  const motion = useRef<Animation[]>([]);
  const fades = useRef<Animation[]>([]);
  const run = useRef(0);

  // A link to #miscellaneous lands on the section already open.
  useEffect(() => {
    function reveal() {
      if (window.location.hash !== '#miscellaneous') return;
      setOpen(true);
      setShown(true);
    }
    reveal();
    window.addEventListener('hashchange', reveal);
    return () => window.removeEventListener('hashchange', reveal);
  }, []);

  useLayoutEffect(() => {
    const list = listRef.current;
    const first = snapshot.current;
    snapshot.current = null;
    if (!list || !first) return;

    cancel(motion.current);
    cancel(fades.current);
    // Measuring the folded layout shortens the page for a moment, which can
    // clamp the scroll position; it is put back once the height is held.
    const scrollTop = window.scrollY;
    const last = measure(list);
    const timing = { duration: shown ? 560 : 460, easing: EASE };

    list.style.overflow = 'hidden';
    const height = list.animate(
      [{ height: `${first.height}px` }, { height: `${last.height}px` }],
      timing,
    );
    height.onfinish = () => list.style.removeProperty('overflow');
    motion.current.push(height);
    window.scrollTo({ top: scrollTop, behavior: 'instant' });

    list.querySelectorAll('dt').forEach((dt, index) => {
      const from = first.labels[index];
      const to = last.labels[index];
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      if (!dx && !dy) return;
      motion.current.push(
        dt.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], timing),
      );
    });

    if (shown) {
      list.querySelectorAll('dd').forEach((dd, index) => {
        fades.current.push(
          dd.animate(
            [
              { opacity: 0, transform: 'translateY(0.35rem)' },
              { opacity: 1, transform: 'none' },
            ],
            {
              duration: 380,
              delay: 140 + index * 45,
              easing: 'cubic-bezier(0.2, 0, 0, 1)',
              fill: 'backwards',
            },
          ),
        );
      });
    }
  }, [shown]);

  function fadeNotes(list: HTMLElement, to: number) {
    const dds = Array.from(list.querySelectorAll('dd'));
    const from = dds.map((dd) => getComputedStyle(dd).opacity);
    cancel(fades.current);
    fades.current = dds.map((dd, index) =>
      dd.animate([{ opacity: from[index] }, { opacity: to }], {
        duration: 160,
        easing: 'ease-out',
        fill: 'forwards',
      }),
    );
    return Promise.all(fades.current.map((animation) => animation.finished));
  }

  function toggle() {
    const list = listRef.current;
    if (!list) return;
    const next = !open;
    const current = ++run.current;
    setOpen(next);

    if (reducedMotion()) {
      cancel(motion.current);
      cancel(fades.current);
      setShown(next);
      return;
    }

    if (next) {
      // Reopened while the notes were still fading out: just bring them back.
      if (shown) {
        fadeNotes(list, 1);
        return;
      }
      snapshot.current = measure(list);
      setShown(true);
      return;
    }

    fadeNotes(list, 0)
      .then(() => {
        if (run.current !== current) return;
        snapshot.current = measure(list);
        setShown(false);
      })
      .catch(() => {
        // Cancelled by a newer toggle, which takes over from here.
      });
  }

  return (
    <Section
      id="miscellaneous"
      title={
        <button
          type="button"
          className="fold-toggle"
          aria-expanded={open}
          aria-controls="miscellaneous-list"
          onClick={toggle}
        >
          Miscellaneous
          <span className="fold-icon" aria-hidden="true" />
        </button>
      }
    >
      <dl
        ref={listRef}
        id="miscellaneous-list"
        className={`misc${shown ? ' is-open' : ''}`}
        onClick={shown ? undefined : toggle}
      >
        {groups.map((group) => (
          <div key={group.label} className="misc-row">
            <dt>{group.label}</dt>
            <dd>{group.notes}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
