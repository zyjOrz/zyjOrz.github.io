import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./CustomCursor";

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
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
