'use client';

import { useEffect, useRef, useState } from 'react';

// Keep the existing site token. Changing the presentation must not create a
// different counter or send traffic to the reference website's counter.
const STATS_URL = 'https://mapmyvisitors.com/web/1c8f1';
const WIDGET_URL =
  'https://mapmyvisitors.com/map.js' +
  '?d=lKHf8BqRebBB-StPHh2OO0tGiewbln-oYKxaOgftHfA' +
  '&w=300&t=n' +
  '&cl=ffffff&co=bcd6f2&cmo=a7b0bb&cmn=e8800c&ct=23262a';

/**
 * Direct JavaScript map, using the reference site's light-mode display options.
 * IMPORTANT: These are presentation options, NOT a verified all-time filter.
 * The provider still determines the displayed data's reporting period.
 * Render this component only once per page. Do not add a parallel map.png tag.
 */
export default function VisitorGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let script: HTMLScriptElement | null = null;

    // Defer by one task so React's development-only setup/cleanup check does not
    // immediately start two external script requests.
    const timer = window.setTimeout(() => {
      if (disposed) return;

      if (document.getElementById('mapmyvisitors')) {
        console.warn('Only one MapMyVisitors script should be installed per page.');
        setLoadFailed(true);
        return;
      }

      script = document.createElement('script');
      script.id = 'mapmyvisitors';
      script.type = 'text/javascript';
      script.src = WIDGET_URL;
      script.async = true;
      script.referrerPolicy = 'strict-origin-when-cross-origin';
      script.onerror = () => {
        if (!disposed) setLoadFailed(true);
      };
      mount.appendChild(script);
    }, 0);

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      if (script) script.onerror = null;
      mount.replaceChildren();
    };
  }, []);

  return (
    <section
      id="visitors"
      aria-label="Visitor locations"
      className="mx-auto mt-10 pb-6 w-full max-w-[300px] scroll-mt-28 bg-transparent"
    >
      <div
        ref={mountRef}
        className="w-full [&_img]:max-w-full [&_canvas]:max-w-full [&_svg]:max-w-full"
      />
      {loadFailed && (
        <p className="py-3 text-center text-xs">
          <a
            href={STATS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Visitor map unavailable — view statistics
          </a>
        </p>
      )}
      <noscript>
        <a href={STATS_URL} target="_blank" rel="noopener noreferrer">
          View visitor statistics
        </a>
      </noscript>
    </section>
  );
}
