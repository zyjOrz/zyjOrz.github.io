import type { CSSProperties } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "Oct 2026" -> "2026.10"; anything else is returned unchanged.
export function dotted(date: string) {
  const match = date.trim().match(/^([A-Za-z]{3})\w*\.?\s+(\d{4})$/);
  if (!match) return date.trim().replace(/^present$/i, 'Now');
  const month = MONTHS.indexOf(match[1][0].toUpperCase() + match[1].slice(1, 3).toLowerCase());
  return month < 0 ? date : `${match[2]}.${String(month + 1).padStart(2, '0')}`;
}

// "Mar 2026 – Mar 2027" -> ["2026.03", "2027.03"].
export function span(period: string): [string, string] {
  const [from, to = ''] = period.split(/\s+[–—-]\s+/);
  return [dotted(from), to ? dotted(to) : ''];
}

// "¥10,000 · top 1% · …" -> ["¥10,000", "top 1% · …"].
export function amount(detail?: string): [string, string] {
  if (!detail) return ['', ''];
  const [first, ...rest] = detail.split(' · ');
  return /^[¥$€£]/.test(first) ? [first, rest.join(' · ')] : ['', detail];
}

export const pad2 = (n: number) => String(n).padStart(2, '0');

// Delay step for rows that scroll into view together (see [data-reveal] in globals.css).
export const stagger = (i: number) => ({ '--i': Math.min(i, 10) }) as CSSProperties;
