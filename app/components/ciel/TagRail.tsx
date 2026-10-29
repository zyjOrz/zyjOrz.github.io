'use client';

import { useEffect, useState } from 'react';
import { Compass, Feather, Flower2, GraduationCap, Music, Newspaper, Star } from 'lucide-react';

const tags = [
  { id: 'home', label: 'About', Icon: Flower2 },
  { id: 'news', label: 'News', Icon: Newspaper },
  { id: 'publications', label: 'Publications', Icon: Feather },
  { id: 'experiences', label: 'Experience', Icon: Compass },
  { id: 'education', label: 'Education', Icon: GraduationCap },
  { id: 'honors', label: 'Honors', Icon: Star },
  { id: 'miscellaneous', label: 'Miscs', Icon: Music },
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
        {tags.map(({ id, label, Icon }, index) => (
          <li key={id} style={{ '--i': index } as React.CSSProperties}>
            <a
              href={`/#${id}`}
              className={`hang-tag${active === id ? ' is-active' : ''}`}
              aria-current={active === id ? 'location' : undefined}
            >
              <Icon size={19} strokeWidth={1.3} aria-hidden="true" />
              <span className="hang-tag-label">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
