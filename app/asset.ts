import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

// Appends a short fingerprint of a file in public/ to its URL ("/photo.jpg" ->
// "/photo.jpg?v=92265d7e"). GitHub Pages lets browsers and its CDN cache files
// for hours, so a photo or CV replaced under the same name would otherwise keep
// showing the old version; with the fingerprint, every change gets a new URL.
// Runs at build time only (server components); other URLs pass through.
export function versioned(url: string) {
  if (!url.startsWith('/')) return url;
  try {
    const file = readFileSync(path.join(process.cwd(), 'public', decodeURIComponent(url)));
    return `${url}?v=${createHash('sha1').update(file).digest('hex').slice(0, 8)}`;
  } catch {
    return url;
  }
}
