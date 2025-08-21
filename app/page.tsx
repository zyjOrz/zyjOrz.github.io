'use client';

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, MessageCircle, QrCode } from "lucide-react";
import { SiTencentqq } from "react-icons/si";


function SocialLinks() {
  const [copiedMessage, setCopiedMessage] = useState("");

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessage(message);
      setTimeout(() => setCopiedMessage(""), 2000);
    });
  };

  return (
    <div className="space-y-2 pt-4">
      <div className="flex gap-4 text-xl items-center">
        <a
          href="https://github.com/zyjOrz/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:opacity-70"
        >
          <Github size={20} />
        </a>
        <button
          onClick={() => handleCopy("2124753995", "QQ number copied successfully")}
          aria-label="QQ"
          className="hover:opacity-70"
        >
          <SiTencentqq size={20} />
        </button>


        <button
          onClick={() => handleCopy("Ivystreammm", "WeChat ID copied successfully")}
          aria-label="WeChat"
          className="hover:opacity-70"
        >
          <MessageCircle  size={20} />
        </button>
      </div>
      {copiedMessage && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{copiedMessage}</p>
      )}
    </div>
  );
}

  


export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4ebe8] text-black font-sans px-6 py-10">
      {/* 顶部导航栏 */}
      <nav className="mx-auto max-w-4xl flex justify-center gap-16 sm:gap-[168px] text-[18px] sm:text-[20px] font-extrabold tracking-wide uppercase mb-16">

  {["Home", "Project", "Publication", "Blog"].map((label) => (
    <a
      key={label}
      href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
      className="relative after:block after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
    >
      {label}
    </a>
  ))}
</nav>





      {/* 图文卡片 */}
      <div className="max-w-6xl mx-auto border border-black/30 bg-[#f4ebe8] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 items-center gap-10 rounded-xl shadow-sm">
        {/* 左侧文字介绍 */}
        <div className="space-y-6">
        <h1 className="font-sans text-4xl">Yujia Zeng</h1>
          <p className="font-sans text-lg text-gray-600 dark:text-gray-400">
          I am a second-year undergraduate student in the  School of the Gifted Young (SGY), University of Science and Technology of China (USTC).
           Currently an algorithm intern at Baidu. 
           On campus, I am currently conducting research at the LDS Lab under the supervision of Prof. Xiangnan He. 
           I’m exploring AIGC and seeking PhD opportunities for Fall 2027.
          </p>

          {/* 下载简历按钮 */}
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-2 mt-2 rounded-full bg-black text-white text-sm font-semibold shadow hover:bg-gray-800 transition"
          >
            Download CV
          </motion.a>

          {/* 社交链接 */}
          <div className="space-y-2 pt-4">
          <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 select-all">
            yujiazng@gmail.com
          </p>
          <button
            onClick={() => navigator.clipboard.writeText("yujiazng@gmail.com")}
            className="text-xs px-2 py-0.5 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Copy
            </button>
    </div>

    {/* 社交图标 */}
    <SocialLinks />
  </div>
</div>  {/* ✅ 👈 补上这个闭合 div！ */}

{/* 右侧图像 */}
        <div className="w-full flex justify-center">
          <Image
            src="/1.png"
            alt="Portrait"
            width={320}  // ← 缩小图片尺寸
            height={320}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
