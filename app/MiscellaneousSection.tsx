export default function MiscellaneousSection() {
  return (
    <section
      id="miscellaneous"
      aria-labelledby="miscellaneous-heading"
      className="section-shell miscellaneous-shell mx-auto mt-20 scroll-mt-28 max-w-5xl rounded-[32px] border px-6 py-10 sm:px-12 sm:py-11"
    >
      <div className="mb-7 sm:mb-8">
        <h2
          id="miscellaneous-heading"
          className="text-3xl font-semibold tracking-[-0.025em] text-[#2d2232]"
        >
          Miscellaneous
        </h2>
        <div className="misc-title-rule mt-3" aria-hidden="true" />
        <p className="mt-4 max-w-3xl text-[0.98rem] leading-7 text-[#745e68]">
          Beyond research
        </p>
      </div>

      <ul className="misc-list m-0 list-none p-0">
        <li className="misc-list-row grid gap-2 py-5 sm:grid-cols-[9.75rem_1fr] sm:gap-6">
  <div className="misc-category">
    <span className="misc-category-dot" aria-hidden="true" />
    Sports
  </div>

  <div className="space-y-1.5 text-[0.98rem] leading-7 text-[#4c3e45]">
    <p className="m-0">
      🏃 Received the Outstanding Physical Fitness Award (
      <span className="font-semibold text-[#3a2b33]">
        top 1% university-wide
      </span>
      ).
    </p>

    <p className="m-0">
      🏸 Won the university badminton team championship.
    </p>

    <p className="m-0">
      🏃 Placed sixth in the women&apos;s 200 m sprint at the university sports meet.
    </p>
  </div>
</li>

        <li className="misc-list-row grid gap-2 py-5 sm:grid-cols-[9.75rem_1fr] sm:gap-6">
  <div className="misc-category">
    <span className="misc-category-dot" aria-hidden="true" />
    Arts
  </div>

  <div className="space-y-1 text-[0.98rem] leading-7 text-[#4c3e45]">
    <p className="m-0">
      🎹 I have played the piano for 10+ years and attained Grade 10 in piano.
    </p>

    <p className="m-0">
      🎨 I also enjoy drawing; see{' '}
      <a
        href="https://github.com/zyjOrz/Hand-drawn-Anime-Style-LoRA-Expand"
        target="_blank"
        rel="noopener noreferrer"
        className="academic-link [overflow-wrap:anywhere]"
      >
        zyjOrz/Hand-drawn-Anime-Style-LoRA-Expand
      </a>{' '}
      for a LoRA trained on my own artwork to capture my drawing style.
    </p>
  </div>
</li>

        <li className="misc-list-row grid gap-2 py-5 sm:grid-cols-[9.75rem_1fr] sm:gap-6">
          <div className="misc-category">
            <span className="misc-category-dot" aria-hidden="true" />
            Social Media
          </div>
          <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.98rem] leading-7 text-[#4c3e45]">
            <span>My Xiaohongshu account:</span>
            <a
              href="https://www.xiaohongshu.com/user/profile/5ce00f51000000001600bd54?xsec_token=ABarcBM9m82KvULRkEPPT9rkuVXIY2-OH9sybePLzfeo0%3D&xsec_source=pc_search"
              target="_blank"
              rel="noopener noreferrer"
              className="misc-social-link"
              aria-label="Open 左眼睛跳跳跳 on Xiaohongshu"
            >
              <span className="misc-rednote-mark" aria-hidden="true">
                <img src="/rednote-xiaohongshu.svg" alt="" width="18" height="18" />
              </span>
              <span lang="zh-CN">左眼睛跳跳跳</span>
              <span className="misc-external-arrow" aria-hidden="true">↗</span>
            </a>
          </p>
        </li>

        <li className="misc-list-row grid gap-2 py-5 sm:grid-cols-[9.75rem_1fr] sm:gap-6">
          <div className="misc-category">
            <span className="misc-category-dot" aria-hidden="true" />
            Student Leadership
          </div>
          <p className="m-0 text-[0.98rem] leading-7 text-[#4c3e45]">
            I previously served as President of the Student Union at the School of the Gifted Young,
            Deputy Head of the Academic Affairs Department of the USTC Student Union, and team leader
            for a summer social practice program in Xinjiang.
          </p>
        </li>
      </ul>
    </section>
  );
}
