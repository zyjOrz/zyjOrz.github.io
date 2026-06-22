'use client';

import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home', sectionId: 'home' },
  { label: 'News', href: '#news', sectionId: 'news' },
  { label: 'Publications', href: '#publications', sectionId: 'publications' },
  { label: 'Contact', href: '/contact' },
];

const observedSections = navItems.flatMap((item) => (item.sectionId ? [item.sectionId] : []));

export default function TopNav() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateNavigation = () => {
      frameId = 0;
      setScrolled(window.scrollY > 56);

      const marker = window.scrollY + Math.min(window.innerHeight * 0.28, 220);
      let currentSection = 'home';

      for (const sectionId of observedSections) {
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= marker) {
          currentSection = sectionId;
        }
      }

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateNavigation);
      }
    };

    updateNavigation();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <nav
      aria-label="Primary navigation"
      className={`site-nav mx-auto mb-12 flex max-w-4xl justify-center gap-16 text-[18px] font-extrabold uppercase tracking-wide sm:gap-[168px] sm:text-[20px]${
        scrolled ? ' is-scrolled' : ''
      }`}
    >
      {navItems.map((item) => {
        const isActive = item.sectionId === activeSection;

        return (
          <a
            key={item.label}
            href={item.href}
            aria-current={isActive ? 'location' : undefined}
            className={`site-nav-link relative text-[#3c2029]${isActive ? ' is-active' : ''}`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
