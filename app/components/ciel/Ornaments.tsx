// Decorative pieces for the "ciel" (sky archive) look, drawn as SVG so the
// page needs no illustration assets. All of them are hidden from assistive tech.

/* -------------------------------------------------------------- column */

// A broken Ionic column in pale marble.
export function Column({ className }: { className?: string }) {
  const flutes = Array.from({ length: 7 }, (_, i) => {
    const t = (i + 1) / 8;
    return { top: 58 + 104 * t, bottom: 52 + 116 * t };
  });
  const dentils = Array.from({ length: 15 }, (_, i) => 18 + i * 10);

  return (
    <svg className={className} viewBox="0 0 220 640" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="marble-shaft" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#b5c0da" />
          <stop offset="0.18" stopColor="#dde4f1" />
          <stop offset="0.42" stopColor="#ffffff" />
          <stop offset="0.62" stopColor="#f0f3fa" />
          <stop offset="0.86" stopColor="#c9d2e6" />
          <stop offset="1" stopColor="#a9b5d0" />
        </linearGradient>
        <linearGradient id="marble-slab" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d3dbec" />
        </linearGradient>
      </defs>
      <g stroke="#a8b4cf" strokeWidth="0.8" strokeLinejoin="round">
        {/* broken entablature */}
        <path d="M14 18 H206 V40 L194 47 L183 41 L174 58 H14 Z" fill="url(#marble-slab)" />
        {dentils.map((x) => (
          <rect key={x} x={x} y="58" width="6" height="8" fill="#e6ebf5" />
        ))}
        {/* capital */}
        <rect x="34" y="70" width="152" height="12" fill="url(#marble-slab)" />
        <path d="M52 84 Q110 116 168 84 L168 101 Q110 130 52 101 Z" fill="url(#marble-slab)" />
        {[52, 168].map((cx) => (
          <g key={cx} fill="none">
            <circle cx={cx} cy="98" r="18" fill="url(#marble-slab)" />
            <circle cx={cx} cy="98" r="12" />
            <circle cx={cx} cy="98" r="7" />
            <circle cx={cx} cy="98" r="2.6" fill="#a8b4cf" />
          </g>
        ))}
        <rect x="56" y="118" width="108" height="8" fill="url(#marble-slab)" />
        {/* shaft */}
        <path d="M58 126 H162 L168 572 H52 Z" fill="url(#marble-shaft)" />
      </g>
      {flutes.map((f, i) => (
        <g key={i}>
          <line x1={f.top} y1="128" x2={f.bottom} y2="570" stroke="#b1bdd7" strokeWidth="1.3" />
          <line x1={f.top + 2.2} y1="128" x2={f.bottom + 2.4} y2="570" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
        </g>
      ))}
      <path d="M118 300 l6 18 l-5 14 l8 21 l-3 12" fill="none" stroke="#a3afca" strokeWidth="0.8" />
      <path d="M86 430 l-4 16 l5 10" fill="none" stroke="#a3afca" strokeWidth="0.8" />
      {/* base */}
      <g stroke="#a8b4cf" strokeWidth="0.8">
        <rect x="46" y="572" width="128" height="14" rx="7" fill="url(#marble-slab)" />
        <rect x="40" y="586" width="140" height="10" rx="4" fill="url(#marble-slab)" />
        <rect x="30" y="596" width="160" height="26" fill="url(#marble-slab)" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------- ladder */

// A ladder climbing into the clouds; it fades out towards the top.
export function Ladder({ className }: { className?: string }) {
  const H = 700;
  const leftX = (y: number) => 14 + 26 * (1 - y / H);
  const rightX = (y: number) => 126 - 26 * (1 - y / H);
  const rungs: number[] = [];
  for (let y = H - 40, gap = 58; y > 30; gap *= 0.93, y -= gap) rungs.push(y);

  return (
    <svg className={className} viewBox={`0 0 140 ${H}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ladder-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="ladder-mask">
          <rect width="140" height={H} fill="url(#ladder-fade)" />
        </mask>
      </defs>
      <g mask="url(#ladder-mask)" fill="#ffffff" stroke="#aebad4" strokeWidth="0.9">
        <path d={`M14 ${H} h11 L44 0 h-6 Z`} />
        <path d={`M115 ${H} h11 L102 0 h-6 Z`} />
        {rungs.map((y) => (
          <rect key={y} x={leftX(y) + 6} y={y} width={rightX(y) - leftX(y) - 12} height="6" rx="2" />
        ))}
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- dove */

export function Dove({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 48" aria-hidden="true" focusable="false">
      <path
        d="M8 30 C18 24 32 22 42 26 C50 17 61 9 80 5 C71 15 65 23 61 29 C71 29 80 33 86 40 C73 40 63 38 55 36 C47 42 33 44 21 40 C15 38 10 35 8 30 Z"
        fill="#ffffff"
        stroke="#a9b5cf"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="29" r="4.6" fill="#ffffff" stroke="#a9b5cf" strokeWidth="1" />
      <path d="M7.5 29 L3 30.6 L7.6 31.4" fill="#d9c08a" />
    </svg>
  );
}

/* ---------------------------------------------------------------- dial */

// A compass ring with the section names running round it.
export function Dial({ className }: { className?: string }) {
  const ticks = Array.from({ length: 120 }, (_, i) => i * 3);
  const label =
    '01 NOUVELLES · 新闻 · 02 PUBLICATIONS · 论文 · 03 PARCOURS · 经历 · 04 FORMATION · 教育 · 05 DISTINCTIONS · 荣誉 · ';

  return (
    <svg className={className} viewBox="-230 -230 460 460" aria-hidden="true" focusable="false">
      <defs>
        <path id="dial-path" d="M0,-178 a178,178 0 1,1 0,356 a178,178 0 1,1 0,-356" />
      </defs>
      <g fill="none" stroke="#18224a" strokeWidth="0.8">
        <line x1="-228" y1="0" x2="228" y2="0" opacity="0.22" />
        <line x1="0" y1="-228" x2="0" y2="228" opacity="0.22" />
        <circle r="204" opacity="0.28" />
        <circle r="160" opacity="0.32" />
      </g>
      <g className="dial-spin">
        <g stroke="#18224a" strokeWidth="0.8">
          {ticks.map((deg) => (
            <line
              key={deg}
              x1="0"
              y1={-160}
              x2="0"
              y2={deg % 30 === 0 ? -171 : -165}
              opacity={deg % 30 === 0 ? 0.55 : 0.3}
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
        <text className="dial-text">
          <textPath href="#dial-path">{label}</textPath>
        </text>
      </g>
      {[
        [-222, 0],
        [222, 0],
        [0, -222],
        [0, 222],
      ].map(([x, y]) => (
        <path key={`${x},${y}`} d={`M${x - 5} ${y} h10 M${x} ${y - 5} v10`} stroke="#18224a" strokeWidth="0.9" opacity="0.5" />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------- stamp, postmark */

export function Stamp({ className }: { className?: string }) {
  return (
    <div className={`stamp ${className ?? ''}`} aria-hidden="true">
      <div className="stamp-face">
        <span className="stamp-top">La Poste du Ciel</span>
        <svg className="stamp-art" viewBox="0 0 60 44">
          <path d="M14 44 V22 a16 16 0 0 1 32 0 V44" fill="#ffffff" stroke="#18224a" strokeWidth="1" />
          <path d="M19 44 V23 a11 11 0 0 1 22 0 V44" fill="#c9d6f0" stroke="#18224a" strokeWidth="0.7" />
          <path d="M22 34 q4 -3 8 0 q4 -3 8 0" fill="none" stroke="#ffffff" strokeWidth="1.2" />
          <path d="M6 44 h48" stroke="#18224a" strokeWidth="1" />
        </svg>
        <span className="stamp-value">27</span>
        <span className="stamp-bottom">USTC · Berkeley</span>
      </div>
    </div>
  );
}

export function Postmark({ className, month, year }: { className?: string; month: string; year: string }) {
  return (
    <svg className={className} viewBox="0 0 190 80" aria-hidden="true" focusable="false">
      <defs>
        <path id="postmark-path" d="M40,10 a30,30 0 1,1 0,60 a30,30 0 1,1 0,-60" />
      </defs>
      <g fill="none" stroke="#18224a" strokeWidth="1" opacity="0.62">
        <circle cx="40" cy="40" r="37" />
        <circle cx="40" cy="40" r="24" />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M84 ${22 + i * 12} q12 -6 24 0 t24 0 t24 0 t24 0`}
          />
        ))}
      </g>
      <g fill="#18224a" opacity="0.7">
        <text className="postmark-ring">
          <textPath href="#postmark-path">UC BERKELEY · CALIFORNIE · </textPath>
        </text>
        <text className="postmark-date" x="40" y="38" textAnchor="middle">
          {month}
        </text>
        <text className="postmark-date" x="40" y="50" textAnchor="middle">
          {year}
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------- barcode */

export function Barcode({ className }: { className?: string }) {
  // Bar widths in px; dark and light alternate.
  const bars = [2, 1, 1, 2, 3, 1, 1, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 1, 2, 2, 1, 1, 3, 2, 1, 1, 2, 1, 1, 3, 1, 2, 2];
  let x = 0;
  const rects = bars.map((w, i) => {
    const rect = i % 2 === 0 ? <rect key={i} x={x} y="0" width={w} height="22" /> : null;
    x += w;
    return rect;
  });
  return (
    <svg className={className} viewBox={`0 0 ${x} 22`} width={x} height="22" aria-hidden="true" focusable="false">
      <g fill="#18224a">{rects}</g>
    </svg>
  );
}
