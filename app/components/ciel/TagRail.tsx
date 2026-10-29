'use client';

import { useEffect, useState } from 'react';
import { Compass, Feather, Flower2, GraduationCap, Music, Newspaper, Star } from 'lucide-react';

const tags = [
  { id: 'home', fr: 'À propos', zh: '关于', Icon: Flower2 },
  { id: 'news', fr: 'Nouvelles', zh: '新闻', Icon: Newspaper },
  { id: 'publications', fr: 'Publications', zh: '论文', Icon: Feather },
  { id: 'experiences', fr: 'Parcours', zh: '经历', Icon: Compass },
  { id: 'education', fr: 'Formation', zh: '教育', Icon: GraduationCap },
  { id: 'honors', fr: 'Distinctions', zh: '荣誉', Icon: Star },
  { id: 'miscellaneous', fr: 'Divers', zh: '杂记', Icon: Music },
];

// Luggage tags hanging from a string down the left edge; the tag of the
// section in view hangs a little lower.
export default function TagRail() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.scrollY + window.innerHeight * 0.3;
      let current = 'home';
      for (const tag of tags) {
        const section = document.getElementById(tag.id);
        if (section && section.offsetTop <= marker) current = tag.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className="tag-rail" aria-label="Sections">
      <ul>
        {tags.map(({ id, fr, zh, Icon }) => (
          <li key={id}>
            <a href={`/#${id}`} className={`hang-tag${active === id ? ' is-active' : ''}`} aria-current={active === id ? 'location' : undefined}>
              <Icon size={19} strokeWidth={1.3} aria-hidden="true" />
              <span className="hang-tag-label">
                {fr} <span lang="zh-Hans">· {zh}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
