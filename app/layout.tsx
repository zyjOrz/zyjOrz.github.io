import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yujia Zeng",
  description: "Personal homepage of Yujia Zeng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
