export default function MiscellaneousSection() {
  return (
    <section
      id="miscellaneous"
      aria-labelledby="miscellaneous-heading"
      className="mx-auto mt-20 max-w-5xl px-8 pb-6 sm:px-12"
    >
      {/* Section title */}
      <div className="mb-7">
        <h2
          id="miscellaneous-heading"
          className="inline-block border-b-2 border-[#c56b8a] pb-1 text-3xl font-semibold tracking-tight text-[#2d2232]"
        >
          Miscellaneous
        </h2>

        <p className="mt-4 max-w-3xl text-[0.98rem] leading-7 text-[#6b5962]">
          Beyond research, I enjoy sports, music, drawing, and student activities.
        </p>
      </div>

      {/* Content */}
      <ul className="space-y-5 pl-5 text-[1rem] leading-[1.8] text-[#3f343a] marker:text-[#8b6876]">
        <li>
          <strong className="font-semibold text-[#2d2232]">Sports.</strong>{' '}
          🏃 Received the Outstanding Physical Fitness Award (
          <span className="font-medium">top 1% university-wide</span>); 🏸 won the
          university badminton team championship; and 🏃 placed sixth in the
          women&apos;s 200 m sprint at the university sports meet.
        </li>

        <li>
          <strong className="font-semibold text-[#2d2232]">Arts.</strong>{' '}
          🎹 I have been playing the piano for over 10 years and attained
          Grade 10 in piano. 🎨 I also enjoy drawing; you can explore{' '}
          <a
            href="https://github.com/zyjOrz/Hand-drawn-Anime-Style-LoRA-Expand"
            target="_blank"
            rel="noopener noreferrer"
            className="academic-link"
          >
            zyjOrz/Hand-drawn-Anime-Style-LoRA-Expand
          </a>
          , a LoRA trained on my own artwork to capture my drawing style.
        </li>

        <li>
          <strong className="font-semibold text-[#2d2232]">
            Social Media.
          </strong>{' '}
          You can also find me on Xiaohongshu at{' '}
          <a
            href="https://www.xiaohongshu.com/user/profile/5ce00f51000000001600bd54?xsec_token=ABarcBM9m82KvULRkEPPT9rkuVXIY2-OH9sybePLzfeo0%3D&xsec_source=pc_search"
            target="_blank"
            rel="noopener noreferrer"
            className="academic-link"
          >
            <span lang="zh-CN">左眼睛跳跳跳</span>
          </a>
          .
        </li>

        <li>
          <strong className="font-semibold text-[#2d2232]">
            Student Leadership.
          </strong>{' '}
          I previously served as President of the Student Union at the School
          of the Gifted Young, Deputy Head of the Academic Affairs Department
          of the USTC Student Union, and team leader for a summer social
          practice program in Xinjiang.
        </li>
      </ul>
    </section>
  );
}