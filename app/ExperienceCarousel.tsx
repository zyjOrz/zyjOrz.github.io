'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { BriefcaseBusiness, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const externalLinkClass = 'academic-link academic-link-violet';
const slideTransitionMs = 560;

type ExperienceItem = {
  id: string;
  date: string;
  category: string;
  role: string;
  organization: string;
  organizationUrl?: string;
  location?: string;
  logo: string;
  logoAlt: string;
  logoFallback: string;
  summary?: string;
  details: ReactNode[];
};

const experiences: ExperienceItem[] = [
  {
    id: 'berkeley-msc',
    date: 'Mar. 2026 – Jan. 2027',
    category: 'Research',
    role: 'J-1 Summer Research',
    organization: 'MSC Lab, UC Berkeley',
    organizationUrl: 'https://msc.berkeley.edu/',
    location: 'Berkeley, CA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/University_of_California%2C_Berkeley_logo.svg/500px-University_of_California%2C_Berkeley_logo.svg.png',
    logoAlt: 'UC Berkeley logo',
    logoFallback: 'Cal',
    summary: 'Visiting research experience at the Mechanical Systems Control Lab.',
    details: [
      <>
        Advised by{' '}
        <a
          href="https://msc.berkeley.edu/people/tomizuka.html"
          target="_blank"
          rel="noopener noreferrer"
          className={externalLinkClass}
        >
          Prof. Masayoshi Tomizuka
        </a>
        .
      </>,
    ],
  },
  {
    id: 'ntu-remote',
    date: 'Aug. 2025 – Feb. 2026',
    category: 'Research',
    role: 'Research Experience',
    organization: 'Nanyang Technological University / Singapore Remote',
    organizationUrl: 'https://www.ntu.edu.sg/',
    location: 'Singapore (Remote)',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Nanyang_Technological_University.svg/500px-Nanyang_Technological_University.svg.png',
    logoAlt: 'Nanyang Technological University logo',
    logoFallback: 'NTU',
    details: [
      <>
        Advised by{' '}
        <a
          href="https://chenyangsi.top/"
          target="_blank"
          rel="noopener noreferrer"
          className={externalLinkClass}
        >
          Prof. Chenyang Si
        </a>{' '}
        and{' '}
        <a
          href="https://liuziwei7.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className={externalLinkClass}
        >
          Prof. Ziwei Liu
        </a>
        .
      </>,
    ],
  },
  {
    id: 'hidream',
    date: 'Sep. 2025 – Jan. 2026',
    category: 'Industry',
    role: 'Algorithm Intern',
    organization: 'HiDream.ai',
    organizationUrl: 'https://hidreamai.com/home',
    logo: 'https://hidream.ai/assets/logos/hidream-logo-en.png',
    logoAlt: 'HiDream.ai logo',
    logoFallback: 'Hi',
    // summary: 'Algorithm internship in generative AI product and model development.',
    details: [],
  },
  {
    id: 'baidu',
    date: 'Mar. 2025 – Jul. 2025',
    category: 'Industry',
    role: 'Algorithm Intern',
    organization: 'Baidu',
    organizationUrl: 'https://www.baidu.com/',
    logo: 'https://www.vectorlogo.zone/logos/baidu/baidu-ar21.svg',
    logoAlt: 'Baidu logo',
    logoFallback: '度',
    details: [],
  },
  {
    id: 'ustc-student-union',
    date: 'Apr. 2024 – Apr. 2025',
    category: 'Leadership',
    role: 'President, Student Union',
    organization: 'School of the Gifted Young, USTC',
    organizationUrl: 'https://en.ustc.edu.cn/',
    logo: 'https://en.scgy.ustc.edu.cn/_upload/tpl/15/36/5430/template5430/htmlRes/logo.png',
    logoAlt: 'University of Science and Technology of China SGY logo',
    logoFallback: 'USTC',
    details: [],
  },
  {
    id: 'ustc-be',
    date: 'Sep. 2023 – Jun. 2027(Expected)',
    category: 'Education',
    role: 'B.E. in Artificial Intelligence',
    organization: 'School of the Gifted Young, USTC',
    organizationUrl: 'https://sgy.ustc.edu.cn/main.htm',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Logo_of_University_of_Science_and_Technology_of_China.svg/250px-Logo_of_University_of_Science_and_Technology_of_China.svg.png',
    logoAlt: 'University of Science and Technology of China logo',
    logoFallback: 'USTC',
    summary: 'Rank: Top 5%',
    details: [],
  },
];

function clampSlideIndex(index: number) {
  return ((index - 1 + experiences.length) % experiences.length) + 1;
}

function ExperienceCard({ item, active }: { item: ExperienceItem; active: boolean }) {
  return (
    <article
      className={`interactive-card experience-carousel-card h-full rounded-[30px] border border-[#ead2dd] bg-[#fffafc]/90 p-6 shadow-[0_16px_42px_rgba(191,113,142,0.13)] transition-opacity sm:p-8 ${
        active ? 'opacity-100' : 'opacity-70'
      }`}
    >
      <div className="flex h-full flex-col gap-7 lg:flex-row lg:items-center lg:gap-9">
        <a
          href={item.organizationUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${item.organization}`}
          className="experience-logo-link group/logo flex min-h-40 w-full shrink-0 items-center justify-center rounded-[28px] border border-[#ead6df] bg-white/78 p-6 shadow-[0_12px_34px_rgba(174,92,126,0.1)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#dba7bb] hover:shadow-[0_20px_42px_rgba(174,92,126,0.16)] lg:w-56"
        >
          <img
            src={item.logo}
            alt={item.logoAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            draggable={false}
            className="max-h-24 max-w-full object-contain transition-transform duration-300 ease-out group-hover/logo:scale-[1.04]"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
              const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
              fallback?.classList.remove('hidden');
            }}
          />
          <span className="hidden rounded-2xl bg-[#fff2f6] px-5 py-4 text-2xl font-bold tracking-tight text-[#9a4bc7]">
            {item.logoFallback}
          </span>
        </a>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full border border-[#e7c3d1] bg-[#fff2f6] px-3 py-1 text-sm font-semibold text-[#99526c]">
              {item.date}
            </span>
            <span className="inline-flex rounded-full border border-[#dfcdf0] bg-[#f8efff] px-3 py-1 text-sm font-semibold text-[#8f4dc7]">
              {item.category}
            </span>
          </div>

          <h3 className="mt-5 text-2xl font-semibold leading-tight text-[#382931] sm:text-3xl">
            {item.role}
          </h3>

          <p className="mt-3 flex flex-wrap items-center gap-2 text-lg font-semibold leading-7 text-[#5f4a55]">
            {item.organizationUrl ? (
              <a
                href={item.organizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkClass}
              >
                {item.organization}
              </a>
            ) : (
              item.organization
            )}
            {item.organizationUrl ? <ExternalLink size={16} className="text-[#b36a86]" /> : null}
          </p>

          {item.location ? <p className="mt-1 text-sm font-medium text-[#8b6473]">{item.location}</p> : null}

          {item.summary ? <p className="mt-4 leading-7 text-[#5f4a55]">{item.summary}</p> : null}

          {item.details.length ? (
            <div className="mt-4 space-y-2 leading-7 text-[#5f4a55]">
              {item.details.map((detail, index) => (
                <p key={`${item.id}-detail-${index}`}>{detail}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ExperienceCarousel() {
  const slides = useMemo(() => [experiences[experiences.length - 1], ...experiences, experiences[0]], []);
  const [slideIndex, setSlideIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const resetTimerRef = useRef<number | null>(null);
  const motionRestoreTimerRef = useRef<number | null>(null);
  const isMovingRef = useRef(false);
  const pointerStartXRef = useRef<number | null>(null);

  const activeIndex = ((slideIndex - 1 + experiences.length) % experiences.length);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      if (motionRestoreTimerRef.current !== null) {
        window.clearTimeout(motionRestoreTimerRef.current);
      }
    };
  }, []);

  const jumpWithoutAnimation = (targetIndex: number) => {
    setIsAnimating(false);
    setSlideIndex(targetIndex);

    if (motionRestoreTimerRef.current !== null) {
      window.clearTimeout(motionRestoreTimerRef.current);
    }

    motionRestoreTimerRef.current = window.setTimeout(() => {
      setIsAnimating(true);
      isMovingRef.current = false;
    }, 24);
  };

  const goToSlide = (nextIndex: number) => {
    if (isMovingRef.current) {
      return;
    }

    isMovingRef.current = true;
    setIsAnimating(true);
    setSlideIndex(nextIndex);

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      if (nextIndex === 0) {
        jumpWithoutAnimation(experiences.length);
        return;
      }

      if (nextIndex === experiences.length + 1) {
        jumpWithoutAnimation(1);
        return;
      }

      isMovingRef.current = false;
    }, slideTransitionMs + 20);
  };

  const moveBy = (delta: number) => {
    goToSlide(slideIndex + delta);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    pointerStartXRef.current = event.clientX;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartXRef.current === null) {
      return;
    }

    const distance = event.clientX - pointerStartXRef.current;
    pointerStartXRef.current = null;

    if (Math.abs(distance) < 48) {
      return;
    }

    moveBy(distance > 0 ? -1 : 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveBy(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveBy(1);
    }
  };

  return (
    <section
      id="experience"
      className="section-shell mx-auto mt-20 scroll-mt-28 max-w-6xl rounded-[32px] border border-[#ebd2df] bg-white/65 px-6 py-9 shadow-[0_16px_44px_rgba(178,109,143,0.12)] backdrop-blur-sm sm:px-10 lg:px-12"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.7fr] lg:items-stretch">
        <div className="flex flex-col justify-between rounded-[30px] border border-[#ead2dd] bg-[#fffafc]/70 p-6 shadow-[0_10px_30px_rgba(191,113,142,0.1)] sm:p-8">
          <div>
            <div className="mb-6 inline-flex rounded-xl bg-[#f3e5fb] p-2 text-[#8f4dc7] shadow-sm">
              <BriefcaseBusiness size={20} />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b05c7b]">Selected</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-[#2d2232] sm:text-5xl">
              Experience
            </h2>
            <p className="mt-4 max-w-sm leading-7 text-[#725766]">
              Research, industry, education and leadership experiences.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-3" aria-label="Experience carousel controls">
              <button
                type="button"
                onClick={() => moveBy(-1)}
                className="soft-action inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e2bfd0] bg-white/70 text-[#855262] shadow-sm backdrop-blur-sm"
                aria-label="Previous experience"
              >
                <ChevronLeft size={19} />
              </button>
              <button
                type="button"
                onClick={() => moveBy(1)}
                className="soft-action inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e2bfd0] bg-white/70 text-[#855262] shadow-sm backdrop-blur-sm"
                aria-label="Next experience"
              >
                <ChevronRight size={19} />
              </button>
              <span className="text-sm font-semibold text-[#8b6473]">
                {String(activeIndex + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex flex-wrap gap-2" aria-label="Jump to experience">
              {experiences.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => goToSlide(index + 1)}
                  aria-label={`Show ${item.role} at ${item.organization}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-9 bg-[#c15d82]' : 'w-2.5 bg-[#e8c8d6] hover:bg-[#d9a9bc]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div
            className="experience-carousel-viewport overflow-hidden rounded-[32px] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#d78dac]"
            role="region"
            aria-label="Experience carousel. Use left and right arrow keys or buttons to navigate."
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerStartXRef.current = null;
            }}
          >
            <div
              className="flex will-change-transform"
              style={{
                transform: `translate3d(-${slideIndex * 100}%, 0, 0)`,
                transition: isAnimating
                  ? `transform ${slideTransitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
                  : 'none',
              }}
            >
              {slides.map((item, index) => {
                const realIndex = clampSlideIndex(index);

                return (
                  <div key={`${item.id}-${index}`} className="min-w-full px-1 sm:px-2">
                    <ExperienceCard item={item} active={realIndex - 1 === activeIndex} />
                  </div>
                );
              })}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {experiences[activeIndex].role} at {experiences[activeIndex].organization}
          </p>
        </div>
      </div>
    </section>
  );
}
