import { MessageCircle, Palette, Sparkles, Trophy, UsersRound } from 'lucide-react';

const cardClassName =
  'interactive-card min-w-0 rounded-[24px] border border-[#eed4de] bg-[#fffafc]/80 p-5 shadow-[0_10px_30px_rgba(191,113,142,0.12)] sm:p-6';
const headingClassName =
  'mb-4 flex items-center gap-2.5 text-lg font-semibold text-[#3a2b36]';
const listClassName = 'space-y-3 text-[0.95rem] leading-7 text-[#5f4a55]';

export default function MiscellaneousSection() {
  return (
    <section
      id="miscellaneous"
      aria-labelledby="miscellaneous-heading"
      className="section-shell mx-auto mt-20 scroll-mt-28 max-w-5xl rounded-[32px] border border-[#ebd2df] bg-white/65 px-6 py-10 shadow-[0_16px_44px_rgba(178,109,143,0.12)] backdrop-blur-sm sm:px-12"
    >
      <div className="mb-8 flex items-center gap-3 text-[#2d2232]">
        <div className="shrink-0 rounded-xl bg-[#fde8f0] p-2 text-[#c15d82] shadow-sm">
          <Sparkles size={19} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 id="miscellaneous-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Miscellaneous
          </h2>
          <p className="mt-1 text-sm text-[#8b6473]">A little more about me beyond research</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <article className={cardClassName} aria-labelledby="misc-sports-heading">
          <h3 id="misc-sports-heading" className={headingClassName}>
            <Trophy size={19} className="shrink-0 text-[#b87924]" aria-hidden="true" />
            Sports
          </h3>
          <ul className={listClassName}>
            <li className="flex items-start gap-3">
              <span className="shrink-0" aria-hidden="true">🏃</span>
              <span>Received the Outstanding Physical Fitness Award (top 1% university-wide).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0" aria-hidden="true">🏸</span>
              <span>Won the university badminton team championship.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0" aria-hidden="true">🏃</span>
              <span>Placed sixth in the women&apos;s 200 m sprint at the university sports meet.</span>
            </li>
          </ul>
        </article>

        <article className={cardClassName} aria-labelledby="misc-arts-heading">
          <h3 id="misc-arts-heading" className={headingClassName}>
            <Palette size={19} className="shrink-0 text-[#a263b9]" aria-hidden="true" />
            Arts
          </h3>
          <ul className={listClassName}>
            <li className="flex items-start gap-3">
              <span className="shrink-0" aria-hidden="true">🎹</span>
              <span>I have played the piano for 10+ years and attained Grade 10 in piano.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0" aria-hidden="true">🎨</span>
              <span className="min-w-0">
                I also love drawing. Check out{' '}
                <a
                  href="https://github.com/zyjOrz/Hand-drawn-Anime-Style-LoRA-Expand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="academic-link [overflow-wrap:anywhere]"
                >
                  zyjOrz/Hand-drawn-Anime-Style-LoRA-Expand
                </a>{' '}
                for a LoRA trained on my artwork to capture my drawing style.
              </span>
            </li>
          </ul>
        </article>

        <article className={cardClassName} aria-labelledby="misc-social-heading">
          <h3 id="misc-social-heading" className={headingClassName}>
            <MessageCircle size={19} className="shrink-0 text-[#c15d82]" aria-hidden="true" />
            Social Media
          </h3>
          <p className="text-[0.95rem] leading-7 text-[#5f4a55]">
            My Xiaohongshu account:{' '}
            <a
              href="https://www.xiaohongshu.com/user/profile/5ce00f51000000001600bd54?xsec_token=ABarcBM9m82KvULRkEPPT9rkuVXIY2-OH9sybePLzfeo0%3D&xsec_source=pc_search"
              target="_blank"
              rel="noopener noreferrer"
              className="academic-link [overflow-wrap:anywhere]"
            >
              <span lang="zh-CN">左眼睛跳跳跳 - 小红书</span>
            </a>
            .
          </p>
        </article>

        <article className={cardClassName} aria-labelledby="misc-leadership-heading">
          <h3 id="misc-leadership-heading" className={headingClassName}>
            <UsersRound size={19} className="shrink-0 text-[#9b6585]" aria-hidden="true" />
            Student Leadership
          </h3>
          <ul className={`${listClassName} list-disc pl-5 marker:text-[#c58aa2]`}>
            <li>Former President of the Student Union, School of the Gifted Young, USTC.</li>
            <li>Former Deputy Head of the Academic Affairs Department, USTC Student Union.</li>
            <li>Led a summer social practice team in Xinjiang (Sanxiaxiang program).</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
