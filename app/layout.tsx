import type { Metadata } from 'next';
import './globals.css';
import MouseRipple from './MouseRipple';

export const metadata: Metadata = {
  title: 'Yujia Zeng',
  description: 'Personal homepage of Yujia Zeng',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="site-backdrop" aria-hidden="true" />
        <MouseRipple />
        {children}
      </body>
    </html>
  );
}
