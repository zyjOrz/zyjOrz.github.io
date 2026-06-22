'use client';

import { useState } from 'react';

const EMAIL = 'yujiazng@gmail.com';

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      aria-label="Copy email address"
      className="rounded-full border border-[#dfb5c4] px-3 py-1 text-xs text-[#7b4456] transition hover:bg-[#fff0f5]"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
