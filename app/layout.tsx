import type { Metadata } from 'next';
import { Bodoni_Moda, IBM_Plex_Mono, Newsreader, Pinyon_Script } from 'next/font/google';
import './globals.css';
import './cursors.css';

// Body text.
const serif = Newsreader({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-newsreader',
});

// Name, dates, big numerals and letter-spaced labels.
const display = Bodoni_Moda({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-bodoni',
});

// French calligraphy.
const script = Pinyon_Script({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-pinyon',
});

// Dates, indices and other small metadata.
const mono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const description =
  'Yujia Zeng is an undergraduate at USTC and a visiting student at UC Berkeley, working on dexterous hands and generative models.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yujiazeng.com'),
  title: 'Yujia Zeng',
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Yujia Zeng',
    title: 'Yujia Zeng',
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The inline script adds a class before first paint; suppressHydrationWarning
    // keeps React from reporting that difference on <html>.
    <html
      lang="en"
      data-theme="ciel"
      className={`${serif.variable} ${display.variable} ${script.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Animations are opt-in: without JavaScript, or with reduced motion, everything just shows. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')",
          }}
        />
      </head>
      <body>
        <div className="sky-drift" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="intro-veil" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
