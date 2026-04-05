'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Github, MessageCircle, Newspaper } from "lucide-react";
import { SiTencentqq } from "react-icons/si";

function SocialLinks() {
  const [copiedMessage, setCopiedMessage] = useState("");

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessage(message);
      setTimeout(() => setCopiedMessage(""), 2000);
    });
  };

  return (
    <div className="space-y-2 pt-4">
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
        <button
          onClick={() => handleCopy("2124753995", "QQ number copied successfully")}
          aria-label="QQ"
          className="transition hover:opacity-70"
        >
          <SiTencentqq size={20} />
        </button>
        <button
          onClick={() => handleCopy("Ivystreammm", "WeChat ID copied successfully")}
          aria-label="WeChat"
          className="transition hover:opacity-70"
        >
          <MessageCircle size={20} />
        </button>
      </div>
      {copiedMessage && <p className="text-xs text-[#8d6673]">{copiedMessage}</p>}
    </div>
  );
}

const newsItems = [
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
          className="font-medium text-[#8f4dc7] underline decoration-[#d7b5f5] underline-offset-4 transition hover:text-[#7a38b6]"
        >
          MSC Lab
        </a>{' '}
        in person for summer research.
      </>
    ),
  },
  {
    date: '2510',
    emoji: '🏃',
    content: <>Received the Outstanding Physical Fitness Award (top &lt;1% university-wide).</>,
  },
  {
    date: '2504',
    emoji: '💼',
    content: <>Joined Baidu as a Research Intern.</>,
  },
  {
    date: '2409',
    emoji: '🏅',
    content: <>Awarded the National Scholarship.</>,
  },
  {
    date: '2404',
    emoji: '🌟',
    content: <>Served as President of the School Student Union.</>,
  },
];

export default function Home() {
  const newsRef = useRef<HTMLElement | null>(null);
  const [isNewsVisible, setIsNewsVisible] = useState(false);

  useEffect(() => {
    const node = newsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNewsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff3f7] via-[#ffe8f0] to-[#fce6ee] px-6 py-10 font-sans text-[#23161b]">
      <nav className="mx-auto mb-16 flex max-w-4xl justify-center gap-16 text-[18px] font-extrabold uppercase tracking-wide sm:gap-[168px] sm:text-[20px]">
        {["Home", "Project", "Publication", "Blog"].map((label) => (
          <a
            key={label}
            href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
            className="relative text-[#3c2029] after:absolute after:bottom-[-6px] after:left-0 after:block after:h-[2px] after:w-0 after:bg-[#9f586f] after:transition-all after:duration-300 hover:after:w-full"
          >
            {label}
          </a>
        ))}
      </nav>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 rounded-3xl border border-[#e9becd] bg-white/60 p-8 shadow-[0_12px_40px_rgba(186,110,140,0.14)] backdrop-blur-sm sm:p-12 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#2d1820]">Yujia Zeng</h1>
          <p className="text-lg leading-8 text-[#6f4b57]">
            I am a third-year undergraduate student in the School of the Gifted Young (少年班),
            University of Science and Technology of China (USTC). Before this, I was an algorithm
            intern at Baidu and HiDream.ai. Now I am a visiting student at{' '}
            <a
              href="https://msc.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#a44d6d] underline decoration-[#d7a0b5] underline-offset-4 transition hover:text-[#8f3d5d]"
            >
              MSC Lab
            </a>{' '}
            in UC Berkeley, advised by{' '}
            <a
              href="https://msc.berkeley.edu/people/tomizuka.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#a44d6d] underline decoration-[#d7a0b5] underline-offset-4 transition hover:text-[#8f3d5d]"
            >
              Prof. Masayoshi Tomizuka
            </a>
            . Outside of research, I enjoy playing the piano and painting. I’m exploring AIGC and
            seeking PhD opportunities for Fall 2027.
          </p>

          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2">
              <p className="select-all text-sm font-medium text-[#6f4b57]">yujiazng@gmail.com</p>
              <button
                onClick={() => navigator.clipboard.writeText("yujiazng@gmail.com")}
                className="rounded-full border border-[#dfb5c4] px-3 py-1 text-xs text-[#7b4456] transition hover:bg-[#fff0f5]"
              >
                Copy
              </button>
            </div>
            <SocialLinks />
          </div>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex flex-col items-center">
            <div className="group rounded-[28px] bg-gradient-to-br from-white/75 to-[#ffdbe8]/80 p-3 shadow-[0_10px_30px_rgba(191,113,142,0.18)] transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-[0_22px_45px_rgba(191,113,142,0.28)]">
              <Image
                src="/1.png"
                alt="Portrait"
                width={320}
                height={320}
                className="rounded-[22px] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.015]"
              />
            </div>
            <p className="mt-5 text-sm text-[#9f8ac3]">
              Also check out:{' '}
              <a
                href="https://bowenxue.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#8f78ba] underline decoration-[#cabce5] underline-offset-4 transition hover:text-[#7d63ad]"
              >
                Bowen
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-8 flex max-w-6xl justify-center">
        <a
          href="#news"
          className="inline-flex items-center gap-2 rounded-full border border-[#e2bfd0] bg-white/55 px-4 py-2 text-sm text-[#855262] shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/75"
        >
          Scroll for News
          <ChevronDown size={16} />
        </a>
      </div>

      <section
        id="news"
        ref={newsRef}
        className={`mx-auto mt-20 max-w-5xl rounded-[32px] border border-[#ebd2df] bg-white/65 px-8 py-10 shadow-[0_16px_44px_rgba(178,109,143,0.12)] backdrop-blur-sm transition-all duration-700 ease-out sm:px-12 ${
          isNewsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="mb-8 flex items-center gap-3 text-[#2d2232]">
          <div className="rounded-xl bg-[#f3e5fb] p-2 text-[#8f4dc7] shadow-sm">
            <Newspaper size={18} />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight">News</h2>
        </div>

        <div className="relative ml-2 border-l-2 border-[#b26ce1] pl-7 sm:pl-10">
          {newsItems.map((item) => (
            <div key={item.date} className="relative mb-9 last:mb-0">
              <span className="absolute -left-[35px] top-2 h-3.5 w-3.5 rounded-full border-4 border-[#f8ebff] bg-[#a14ee5] shadow-[0_0_0_4px_rgba(161,78,229,0.08)] sm:-left-[44px]" />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-7">
                <div className="min-w-[96px] text-xl font-bold tracking-wide text-[#9a98a7]">{item.date}</div>
                <div className="text-[1.15rem] leading-8 text-[#1f2030]">
                  <span className="mr-3 align-middle">{item.emoji}</span>
                  <span className="align-middle">{item.content}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
