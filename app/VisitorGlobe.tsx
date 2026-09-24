import { Globe2 } from 'lucide-react';

/**
 * Keep the legacy visitor script outside React's lifecycle. The iframe loads
 * ordinary HTML so parser-time scripts and document-ready handlers can work.
 * This is DOM/lifecycle separation, not a security sandbox.
 */
export default function VisitorGlobe() {
  return (
    <section
      id="visitors"
      aria-labelledby="visitors-heading"
      className="section-shell mx-auto mt-10 w-full max-w-lg scroll-mt-28 rounded-[24px] border border-[#ebd2df] p-5 sm:p-6"
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#e8d7e5] bg-gradient-to-br from-[#fff8fc] to-[#f3e7ff] shadow-[0_3px_10px_rgba(91,55,83,0.08)]"
          aria-hidden="true"
        >
          <Globe2 size={19} strokeWidth={2} className="text-[#b44fd3]" />
        </div>
        <h2
          id="visitors-heading"
          className="m-0 text-xl font-semibold tracking-[-0.025em] text-[#2d2232]"
        >
          Visitors
        </h2>
      </div>

      <div className="mx-auto w-full max-w-[260px]">
        <iframe
          src="/visitor-globe.html"
          title="Visitor locations — MapMyVisitors"
          width="260"
          height="280"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          className="block h-[280px] w-full border-0 bg-transparent"
        />
      </div>
    </section>
  );
}
