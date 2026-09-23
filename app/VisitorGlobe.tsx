'use client';

import { useEffect, useRef } from 'react';
import { Globe2 } from 'lucide-react';

const MAP_MY_VISITORS_SRC =
  'https://mapmyvisitors.com/globe.js?d=R3Qj_OgtGlT9u6JqS3wlp84xiJAHI2-aqgABYV5Yv58';

export default function VisitorGlobe() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetRef.current;

    if (!container) return;

    // 防止开发模式下重复加载
    container.replaceChildren();

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'mmvst_globe';
    script.src = MAP_MY_VISITORS_SRC;
    script.async = true;

    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return (
    <section
      id="visitors"
      aria-labelledby="visitors-heading"
      className="
        section-shell
        mx-auto mt-20
        max-w-5xl
        scroll-mt-28
        rounded-[32px]
        border border-[#ebd2df]
        bg-white/65
        px-6 py-10
        shadow-[0_16px_44px_rgba(178,109,143,0.12)]
        backdrop-blur-sm
        sm:px-12 sm:py-11
      "
    >
      <div className="mb-8 flex items-center gap-4">
        <div
          className="
            flex h-12 w-12 shrink-0 items-center justify-center
            rounded-2xl
            border border-[#e8d7e5]
            bg-gradient-to-br from-[#fff8fc] to-[#f3e7ff]
            shadow-[0_4px_12px_rgba(91,55,83,0.10)]
          "
          aria-hidden="true"
        >
          <Globe2
            size={23}
            strokeWidth={2}
            className="text-[#b44fd3]"
          />
        </div>

        <h2
          id="visitors-heading"
          className="
            m-0
            text-3xl
            font-semibold
            tracking-[-0.025em]
            text-[#2d2232]
          "
        >
          Visitors
        </h2>
      </div>

      <div
        className="
          flex min-h-[360px]
          items-center justify-center
          overflow-x-auto
          rounded-[28px]
          border border-[#eed4de]
          bg-[#fffafc]/80
          p-5
          shadow-[0_10px_30px_rgba(191,113,142,0.10)]
        "
      >
        <div
          ref={widgetRef}
          className="
            flex w-full justify-center
            [&_canvas]:max-w-full
            [&_iframe]:max-w-full
          "
        />
      </div>
    </section>
  );
}