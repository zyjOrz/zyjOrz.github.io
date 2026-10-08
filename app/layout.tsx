import type { Metadata } from 'next';
import { Newsreader, Schibsted_Grotesk } from 'next/font/google';
import './globals.css';
import './cursors.css';

const serif = Newsreader({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-newsreader',
});

const sans = Schibsted_Grotesk({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-schibsted',
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
    // Color theme: "sage" (pale green), "blush" (pale pink) or "paper" (warm white).
    <html lang="en" data-theme="sage" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
