'use client';

import { useEffect, useRef, useState } from 'react';

// Keep the existing site token. Changing the presentation must not create a
// different counter or send traffic to the reference website's counter.
const STATS_URL = 'https://mapmyvisitors.com/web/1c8f1';
const MAP_TOKEN = 'lKHf8BqRebBB-StPHh2OO0tGiewbln-oYKxaOgftHfA';

// Map colors follow the page theme (CSS variables in globals.css).
function widgetUrl() {
  const css = getComputedStyle(document.documentElement);
  const color = (name: string, fallback: string) =>
    (css.getPropertyValue(name).trim() || fallback).replace('#', '');

  const params = new URLSearchParams({
    d: MAP_TOKEN,
    w: '240',
    t: 'n',
    cl: color('--underline', 'c9d2c6'), // land
    co: color('--paper', 'f8faf6'), // ocean
    cmo: color('--soft', '5c6a5f'), // earlier visitors
    cmn: color('--accent', '3d6e52'), // recent visitors
    ct: color('--ink', '1c251e'), // labels
  });
  return `https://mapmyvisitors.com/map.js?${params}`;
}

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
      script.src = widgetUrl();
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
    <div id="visitors" aria-label="Visitor locations" className="visitor-map">
      <div ref={mountRef} />
      {loadFailed && (
        <p>
          <a href={STATS_URL} target="_blank" rel="noopener noreferrer" className="link">
            Visitor map unavailable — view statistics
          </a>
        </p>
      )}
      <noscript>
        <a href={STATS_URL} target="_blank" rel="noopener noreferrer" className="link">
          View visitor statistics
        </a>
      </noscript>
    </div>
  );
}
