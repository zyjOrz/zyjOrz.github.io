'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';

const newsItems = [
  {
    date: '2606',
    emoji: '🎉',
    content: <>One paper got accepted to ECCV’26.</>,
  },
  {
    date: '2604',
    emoji: '🎉',
    content: <>One paper got accepted to ICIC’26.</>,
  },
  {
    date: '2603',
    emoji: '✈️',
    content: (
      <>
        Arrived at{' '}
        <a
          href="https://msc.berkeley.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="academic-link academic-link-violet"
        >
          MSC Lab
        </a>{' '}
        for onsite summer research.
      </>
    ),
  },
  {
    date: '2510',
    emoji: '🏃',
    content: <>Received the Outstanding Physical Fitness Award (top &lt;1% university-wide).</>,
  },
  {
    date: '2412',
    emoji: '🥈',
    content: <>Won a silver medal at the ICPC Hong Kong Regional.</>,
  },
  {
    date: '2409',
    emoji: '🏆',
    content: <>Awarded the National Scholarship (Top 1%).</>,
  },
  {
    date: '2404',
    emoji: '🌟',
    content: <>Served as President of the School Student Union.</>,
  },
  {
    date: '2503',
    emoji: '💼',
    content: <>Joined Baidu as a Research Intern.</>,
  },
];

export default function NewsTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReady(true);

    if (reducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    observer.observe(timeline);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={timelineRef}
      className={`news-timeline relative ml-2 pl-7 sm:pl-10${ready ? ' is-ready' : ''}${
        visible ? ' is-visible' : ''
      }`}
    >
      {newsItems.map((item, index) => (
        <article
          key={`${item.date}-${item.emoji}`}
          className="news-item relative mb-9 last:mb-0"
          style={{ '--news-delay': `${80 + index * 68}ms` } as CSSProperties}
        >
          <span className="news-dot absolute -left-[35px] top-2 h-3.5 w-3.5 rounded-full border-4 border-[#f8ebff] bg-[#a14ee5] shadow-[0_0_0_4px_rgba(161,78,229,0.08)] sm:-left-[44px]" />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-7">
            <div className="min-w-[96px] text-xl font-bold tracking-wide text-[#9a98a7]">
              {item.date}
            </div>
            <div className="text-[1.15rem] leading-8 text-[#1f2030]">
              <span className="mr-3 align-middle">{item.emoji}</span>
              <span className="align-middle">{item.content}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
