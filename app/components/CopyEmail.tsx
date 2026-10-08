'use client';

import { useEffect, useRef, useState } from 'react';

// Shows "Email" instead of the address; clicking copies the address.
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard unavailable (e.g. permissions): fall back to the mail client.
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button type="button" onClick={copy} className="copy-email" aria-label="Copy email address">
      <span className="link">Email</span>
      <span className={`copy-email-note${copied ? ' is-visible' : ''}`} aria-hidden="true">
        Copied
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied' : ''}
      </span>
    </button>
  );
}
