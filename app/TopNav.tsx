'use client';

import { useEffect, useState } from 'react';

type NavItem = {
  label: string;
  href: string;
  sectionId?: string;
  newTab?: boolean;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', sectionId: 'home' },
  { label: 'News', href: '#news', sectionId: 'news' },
  { label: 'Publication', href: '#publications', sectionId: 'publications' },
  { label: 'Experiences', href: '#experiences', sectionId: 'experiences' },
  { label: 'CV', href: '/resume.pdf', newTab: true },
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
      className={`site-nav mx-auto mb-12 flex w-full max-w-6xl items-center justify-between px-4 text-[18px] font-extrabold uppercase tracking-wide sm:px-6 sm:text-[20px]${
        scrolled ? ' is-scrolled' : ''
      }`}
    >
      {navItems.map((item) => {
        const isActive = item.sectionId === activeSection;

        return (
          <a
            key={item.label}
            href={item.href}
            target={item.newTab ? '_blank' : undefined}
            rel={item.newTab ? 'noopener noreferrer' : undefined}
            aria-label={item.newTab ? 'CV — preview PDF in a new tab' : undefined}
            title={item.newTab ? 'View CV (PDF)' : undefined}
            aria-current={isActive ? 'location' : undefined}
            className={`site-nav-link relative text-[#fff8fb]${isActive ? ' is-active' : ''}`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
