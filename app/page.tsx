import Image from 'next/image';
import {
  Award,
  BriefcaseBusiness,
  ChevronDown,
  Github,
  GraduationCap,
  MapPin,
  Newspaper,
} from 'lucide-react';
import { SiLinkedin } from 'react-icons/si';
import CopyEmailButton from './CopyEmailButton';
import NewsTimeline from './NewsTimeline';
import TopNav from './TopNav';

const externalLinkClass = 'academic-link';

function SocialLinks() {
  return (
    <div className="pt-4">
      <div className="flex items-center gap-4 text-xl text-[#4b2d38]">
        <a
          href="https://github.com/zyjOrz/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="transition hover:opacity-70"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/yujiazng/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="transition hover:opacity-70"
        >
          <SiLinkedin size={20} />
        </a>
      </div>
    </div>
  );
}

const publications = [
  {
    venue: 'ICIC 2026',
    location: 'Toronto, Canada',
    type: 'Oral',
    title: 'ReconNet: Generative Recommendation with Control-Guided Diffusion Models',
    authors: 'Yujia Zeng',
    image: '/reconnet.png',
    description:
      'This work reformulates sequential recommendation as a control-guided diffusion generation task, allowing user preferences across multiple domains to act as control signals that guide personalized recommendation item generation.',
  },
];

function EducationSection() {
  return (
    <section
      id="education"
      className="section-shell mx-auto mt-20 scroll-mt-28 max-w-5xl rounded-[32px] border border-[#ebd2df] bg-white/65 px-8 py-10 shadow-[0_16px_44px_rgba(178,109,143,0.12)] backdrop-blur-sm sm:px-12"
    >
      <div className="mb-8 flex items-center gap-3 text-[#2d2232]">
        <div className="rounded-xl bg-[#fde8f0] p-2 text-[#c15d82] shadow-sm">
          <GraduationCap size={19} />
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Education</h2>
          <p className="mt-1 text-sm text-[#8b6473]">Academic background</p>
        </div>
      </div>

      <article className="interactive-card rounded-[28px] border border-[#eed4de] bg-[#fffafc]/80 p-6 shadow-[0_10px_30px_rgba(191,113,142,0.12)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b05c7b]">B.E.</p>
            <h3 className="mt-2 text-xl font-semibold leading-8 text-[#3a2b36]">
              Bachelor of Engineering in Artificial Intelligence
            </h3>
            <p className="mt-2 max-w-3xl leading-7 text-[#5f4a55]">
              School of the Gifted Young (少年班), University of Science and Technology of China
              (USTC)
            </p>
          </div>
          <div className="shrink-0 text-left sm:text-right">
            <p className="font-semibold text-[#7b4456]">2023 – 2027 (Expected)</p>
            <p className="mt-2 inline-flex rounded-full border border-[#e7c3d1] bg-[#fff2f6] px-3 py-1 text-sm font-semibold text-[#99526c]">
              GPA: Top 5%
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function ExperienceSection() {
  const cardClass =
    'interactive-card rounded-[24px] border border-[#ead2dd] bg-[#fffafc]/85 p-6 shadow-[0_10px_28px_rgba(191,113,142,0.1)]';

  const dateClass =
    'inline-flex rounded-full border border-[#e7c3d1] bg-[#fff2f6] px-3 py-1 text-sm font-semibold text-[#99526c]';

  return (
    <section
      id="experience"
      className="section-shell mx-auto mt-20 scroll-mt-28 max-w-5xl rounded-[32px] border border-[#ebd2df] bg-white/65 px-8 py-10 shadow-[0_16px_44px_rgba(178,109,143,0.12)] backdrop-blur-sm sm:px-12"
    >
      <div className="mb-8 flex items-center gap-3 text-[#2d2232]">
        <div className="rounded-xl bg-[#f3e5fb] p-2 text-[#8f4dc7] shadow-sm">
          <BriefcaseBusiness size={19} />
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Experience</h2>
          <p className="mt-1 text-sm text-[#8b6473]">Research, industry, and leadership</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className={cardClass}>
          <p className={dateClass}>Mar. 2026 – Jan. 2027</p>
          <h3 className="mt-4 text-xl font-semibold text-[#382931]">J-1 Summer Research</h3>
          <p className="mt-2 leading-7 text-[#5f4a55]">
            <a
              href="https://msc.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              MSC Lab
            </a>
            , UC Berkeley
          </p>
          <p className="mt-1 leading-7 text-[#5f4a55]">
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
          </p>
        </article>

        <article className={cardClass}>
          <p className={dateClass}>Aug. 2025 – Feb. 2026</p>
          <h3 className="mt-4 text-xl font-semibold text-[#382931]">Research Experience</h3>
          <p className="mt-2 leading-7 text-[#5f4a55]">Singapore (Remote)</p>
          <p className="mt-1 leading-7 text-[#5f4a55]">
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
          </p>
        </article>

        <article className={cardClass}>
          <p className={dateClass}>Sep. 2025 – Jan. 2026</p>
          <h3 className="mt-4 text-xl font-semibold text-[#382931]">Algorithm Intern</h3>
          <p className="mt-2 leading-7 text-[#5f4a55]">
            <a
              href="https://hidreamai.com/home"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              HiDream.ai
            </a>
          </p>
        </article>

        <article className={cardClass}>
          <p className={dateClass}>Mar. 2025 – Jul. 2025</p>
          <h3 className="mt-4 text-xl font-semibold text-[#382931]">Algorithm Intern</h3>
          <p className="mt-2 leading-7 text-[#5f4a55]">
            <a
              href="https://www.baidu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              Baidu
            </a>
          </p>
        </article>

        <article className={cardClass}>
          <p className={dateClass}>Apr. 2024 – Apr. 2025</p>
          <h3 className="mt-4 text-xl font-semibold text-[#382931]">President, Student Union</h3>
          <p className="mt-2 leading-7 text-[#5f4a55]">School of the Gifted Young, USTC</p>
        </article>
      </div>
    </section>
  );
}

function AwardsSection() {
  const awards = ['The National Scholarship (Top 1%)', 'A Silver Medal at the ICPC Hong Kong Regional'];

  return (
    <section
      id="awards"
      className="section-shell mx-auto mt-20 scroll-mt-28 max-w-5xl rounded-[32px] border border-[#ebd2df] bg-white/65 px-8 py-10 shadow-[0_16px_44px_rgba(178,109,143,0.12)] backdrop-blur-sm sm:px-12"
    >
      <div className="mb-8 flex items-center gap-3 text-[#2d2232]">
        <div className="rounded-xl bg-[#fff0d9] p-2 text-[#b87924] shadow-sm">
          <Award size={19} />
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Awards</h2>
          <p className="mt-1 text-sm text-[#8b6473]">Honors and distinctions</p>
        </div>
      </div>

      <div className="space-y-4">
        {awards.map((award, index) => (
          <article
            key={award}
            className="interactive-card flex items-center gap-5 rounded-[24px] border border-[#ead2dd] bg-[#fffafc]/85 px-6 py-5 shadow-[0_10px_28px_rgba(191,113,142,0.09)] sm:px-7"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#efd6b0] bg-[#fff7e9] text-sm font-semibold text-[#a66a18]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-lg font-semibold leading-7 text-[#382931] sm:text-xl">{award}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function PublicationSection() {
  return (
    <section
      id="publications"
      className="section-shell mx-auto mt-20 scroll-mt-28 max-w-5xl rounded-[32px] border border-[#ebd2df] bg-white/65 px-8 py-10 shadow-[0_16px_44px_rgba(178,109,143,0.12)] backdrop-blur-sm sm:px-12"
    >
      <div className="mb-8 flex items-center gap-3 text-[#2d2232]">
        <div className="rounded-xl bg-[#fde8f0] p-2 text-[#c15d82] shadow-sm">
          <Newspaper size={18} />
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Publications</h2>
          <p className="mt-1 text-sm text-[#8b6473]">Selected research papers</p>
        </div>
      </div>

      <div className="space-y-10">
        {publications.map((paper) => (
          <article
            key={paper.title}
            className="interactive-card publication-card group/paper grid grid-cols-1 gap-7 rounded-[28px] border border-[#eed4de] bg-[#fffafc]/80 p-5 shadow-[0_10px_30px_rgba(191,113,142,0.12)] md:grid-cols-[390px_1fr] md:p-6"
          >
            <div className="publication-media group/image relative aspect-[800/560] overflow-hidden rounded-[22px] border border-[#ead5dd] bg-white shadow-[0_10px_26px_rgba(178,109,143,0.14)] transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-[0_22px_45px_rgba(191,113,142,0.24)]">
              <div className="absolute left-0 top-0 z-10 rounded-br-xl bg-[#0b4cae] px-4 py-1.5 text-sm font-semibold text-white shadow-md">
                {paper.venue}
              </div>
              <Image
                src={paper.image}
                alt={`${paper.title} overview`}
                width={800}
                height={600}
                className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover/image:scale-[1.02]"
              />
            </div>

            <div className="flex flex-col justify-center py-1">
              <h2 className="text-[1.15rem] font-semibold leading-7 text-[#3a2b36]">
                <span className="mr-2 text-[#e00000]">({paper.type})</span>
                <span className="publication-title">{paper.title}</span>
              </h2>
              <p className="mt-2 text-sm font-medium text-[#5c5260]">{paper.authors}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7b4456]">
                {paper.venue}
                <span className="text-[#c79cac]">·</span>
                <MapPin size={14} className="text-[#b86380]" />
                <span>{paper.location}</span>
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#3d3842]">
                <li>{paper.description}</li>
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="site-canvas min-h-screen px-6 py-10 font-sans text-[#23161b]">
      <TopNav />

      <section
        id="home"
        className="hero-card mx-auto grid scroll-mt-28 max-w-6xl grid-cols-1 items-center gap-10 rounded-3xl border border-[#e9becd] bg-white/60 p-8 shadow-[0_12px_40px_rgba(186,110,140,0.14)] backdrop-blur-sm sm:p-12 md:grid-cols-2"
      >
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#2d1820]">Yujia Zeng (曾昱嘉)</h1>
          <p className="text-lg leading-8 text-[#6f4b57]">
            I am a third-year undergraduate student in the School of the Gifted Young (少年班),
            University of Science and Technology of China (USTC). Before this, I was an algorithm
            intern at{' '}
            <a
              href="https://www.baidu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              Baidu
            </a>{' '}
            and{' '}
            <a
              href="https://hidreamai.com/home"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              HiDream.ai
            </a>
            . Now I am a visiting student at{' '}
            <a
              href="https://msc.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              MSC Lab
            </a>{' '}
            in UC Berkeley, advised by{' '}
            <a
              href="https://msc.berkeley.edu/people/tomizuka.html"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              Prof. Masayoshi Tomizuka
            </a>
            . My research focuses on Robotics and Video-generation WorldModel and I am currently
            seeking PhD opportunities for Fall 2027.
          </p>

          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2">
              <p className="select-all text-sm font-medium text-[#6f4b57]">yujiazng@gmail.com</p>
              <CopyEmailButton />
            </div>
            <SocialLinks />
          </div>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex flex-col items-center">
            <div className="portrait-card group rounded-[28px] bg-gradient-to-br from-white/75 to-[#ffdbe8]/80 p-3 shadow-[0_10px_30px_rgba(191,113,142,0.18)] transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-[0_22px_45px_rgba(191,113,142,0.28)]">
              <Image
                src="/1.png"
                alt="Portrait"
                width={320}
                height={320}
                priority
                className="rounded-[22px] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.015]"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-8 flex max-w-6xl justify-center">
        <a
          href="#news"
          className="soft-action inline-flex items-center gap-2 rounded-full border border-[#e2bfd0] bg-white/55 px-4 py-2 text-sm text-[#855262] shadow-sm backdrop-blur-sm"
        >
          Scroll for News
          <ChevronDown size={16} />
        </a>
      </div>

      <section
        id="news"
        className="section-shell mx-auto mt-20 scroll-mt-28 max-w-5xl rounded-[32px] border border-[#ebd2df] bg-white/65 px-8 py-10 shadow-[0_16px_44px_rgba(178,109,143,0.12)] backdrop-blur-sm sm:px-12"
      >
        <div className="mb-8 flex items-center gap-3 text-[#2d2232]">
          <div className="rounded-xl bg-[#f3e5fb] p-2 text-[#8f4dc7] shadow-sm">
            <Newspaper size={18} />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight">News</h2>
        </div>

        <NewsTimeline />
      </section>

      <PublicationSection />
      <ExperienceSection />
    </div>
  );
}
