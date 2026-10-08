import type { ReactNode } from 'react';

// All homepage content lives in this file. Components only handle layout,
// so adding a news item or a paper never requires touching the markup.

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link">
      {children}
    </a>
  );
}

function Highlight({ children }: { children: ReactNode }) {
  return <span className="highlight">{children}</span>;
}

/* ------------------------------------------------------------------ profile */

export const profile = {
  name: 'Yujia Zeng',
  role: 'Undergraduate at USTC · Visiting Student at UC Berkeley',
  email: 'yujiazng@gmail.com',
  portrait: '/images/portrait.webp',
  links: [
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=3hZIwCoAAAAJ' },
    { label: 'GitHub', href: 'https://github.com/zyjOrz' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yujiazng/' },
  ],
};

export const bio: ReactNode = (
  <>
    <p>
      I am a fourth-year undergraduate student in the School of the Gifted Young{' '}
      <span className="whitespace-nowrap">
        (<span lang="zh-Hans">少年班</span>)
      </span>{' '}
      at the University of Science and Technology of China (USTC). I am currently a visiting student at the{' '}
      <ExtLink href="https://msc.berkeley.edu/">MSC Lab</ExtLink>, UC Berkeley, advised by{' '}
      <ExtLink href="https://msc.berkeley.edu/people/tomizuka.html">Prof. Masayoshi Tomizuka</ExtLink>,
      and I also work closely with <ExtLink href="https://yilundu.github.io/">Prof. Yilun Du</ExtLink> at
      Harvard University. Before this, I was an algorithm intern at{' '}
      <ExtLink href="https://www.baidu.com/">Baidu</ExtLink> and{' '}
      <ExtLink href="https://hidreamai.com/home">HiDream.ai</ExtLink>.
    </p>
    <p>
      My research focuses on dexterous hands and generative models. I am currently seeking PhD
      opportunities for Fall 2027.
    </p>
  </>
);

/* --------------------------------------------------------------------- news */

export type NewsItem = { date: string; body: ReactNode };

export const news: NewsItem[] = [
  {
    date: 'Oct 2026',
    body: (
      <>
        RoboSTAR received the <Highlight>Best Paper Award</Highlight> at the IROS 2026 NOC Workshop.
      </>
    ),
  },
  {
    date: 'Sep 2026',
    body: (
      <>
        Released <ExtLink href="https://www.yujiazeng.com/RoboSTAR/">RoboSTAR</ExtLink>.
      </>
    ),
  },
  {
    date: 'Jun 2026',
    body: (
      <>
        <ExtLink href="https://ringforcing.com/">Ring Forcing</ExtLink> was accepted to ECCV 2026.
      </>
    ),
  },
  {
    date: 'Apr 2026',
    body: <>ReconNet was accepted to ICIC 2026 as an oral presentation.</>,
  },
  {
    date: 'Mar 2026',
    body: (
      <>
        Arrived at the <ExtLink href="https://msc.berkeley.edu/">MSC Lab</ExtLink>, UC Berkeley, for
        on-site summer research.
      </>
    ),
  },
  {
    date: 'Sep 2025',
    body: (
      <>
        Received the Yang Ya Alumni Fund Scholarship (¥5,000, awarded to the top five female students in
        the School of the Gifted Young).
      </>
    ),
  },
  { date: 'Mar 2025', body: <>Joined Baidu as a research intern.</> },
  { date: 'Dec 2024', body: <>Won a silver medal at the ICPC Hong Kong Regional.</> },
  { date: 'Sep 2024', body: <>Awarded the National Scholarship (¥10,000, top 1% GPA).</> },
  { date: 'Apr 2024', body: <>Served as President of the Student Union, School of the Gifted Young.</> },
];

/* ------------------------------------------------------------- publications */

export type Publication = {
  title: string;
  // Mark equal contribution with a trailing "*". The site owner is highlighted automatically.
  authors: string[];
  venue: string;
  venueDetail?: string;
  location?: string;
  highlight?: string;
  status?: string;
  image: string;
  links: { label: string; href: string }[];
  summary: string;
};

export const SELF = 'Yujia Zeng';

export const publications: Publication[] = [
  {
    title: 'RoboSTAR: Next-Scale Autoregressive Sign Language Motion Translation for Humanoid Robots',
    authors: ['Yujia Zeng*', 'Chensheng Peng*', 'Yuxin Chen*', 'Alex Shao', 'Nathan Jew', 'Masayoshi Tomizuka'],
    venue: 'IROS 2026 Workshop',
    venueDetail: 'Workshop on Nonverbal Cues for Human-Robot Cooperative Intelligence',
    highlight: 'Best Paper Award',
    status: 'Under review',
    image: '/images/pubs/robostar.webp',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2609.32250' },
      { label: 'Project page', href: 'https://www.yujiazeng.com/RoboSTAR/' },
      { label: 'Code', href: 'https://github.com/zyjOrz/RoboSTAR' },
      { label: 'Model', href: 'https://huggingface.co/Ivystream/RoboSTAR' },
    ],
    summary:
      'RoboSTAR translates speech/text into continuous sign language motion using part-wise finite scalar quantization and next-scale autoregression, refining synchronized body and hand motion from coarse to fine before retargeting it for humanoid robot execution.',
  },
  {
    title: 'Ring Forcing: Towards Precise Long-Term Memory for Autoregressive Video Diffusion',
    authors: [
      'Bowen Xue',
      'Brandon Y. Feng',
      'Chenguo Lin',
      'Yuchen Lin',
      'Yujia Zeng',
      'Lvmin Zhang',
      'Maneesh Agrawala',
      'Honglei Yan',
      'Panwang Pan',
    ],
    venue: 'ECCV 2026',
    location: 'Malmö, Sweden',
    image: '/images/pubs/ringforcing.webp',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2608.26794' },
      { label: 'Project page', href: 'https://ringforcing.com/' },
    ],
    summary:
      'We present Ring Forcing, an autoregressive video diffusion framework designed to robustly construct and precisely utilize long-term memory, which achieves superior minutes-long coherence and object permanence, significantly outperforming state-of-the-art methods.',
  },
  {
    title: 'ReconNet: Generative Recommendation with Control-Guided Diffusion Models',
    authors: ['Yujia Zeng'],
    venue: 'ICIC 2026',
    location: 'Toronto, Canada',
    highlight: 'Oral',
    image: '/images/pubs/reconnet.webp',
    links: [{ label: 'Paper', href: 'https://link.springer.com/chapter/10.1007/978-981-92-3384-7_1' }],
    summary:
      'This work reformulates sequential recommendation as a control-guided diffusion generation task, allowing user preferences across multiple domains to act as control signals that guide personalized recommendation item generation.',
  },
  {
    title: 'StableWorld: Towards Stable and Consistent Long Interactive Video Generation',
    authors: [
      'Ying Yang',
      'Zhengyao Lv',
      'Yujia Zeng',
      'Tianlin Pan',
      'Haofan Wang',
      'Yueming Lyu',
      'Binxin Yang',
      'Hubery Yin',
      'Chen Li',
      'Jing Lyu',
      'Ziwei Liu',
      'Chenyang Si',
    ],
    venue: 'arXiv 2026',
    image: '/images/pubs/stableworld.webp',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2601.15281' },
      { label: 'Project page', href: 'https://sd-world.github.io/' },
      { label: 'Code', href: 'https://github.com/xbyym/StableWorld' },
    ],
    summary:
      'StableWorld introduces a model-agnostic Dynamic Frame Eviction Mechanism that filters degraded frames while retaining geometrically consistent ones, reducing cumulative drift and improving stability and temporal consistency across interactive video generation frameworks.',
  },
];

/* --------------------------------------------------------------- experience */

export type Entry = {
  period: string;
  org: string;
  orgUrl?: string;
  place?: string;
  role: string;
  note?: ReactNode;
};

export const experience: Entry[] = [
  {
    period: 'Mar 2026 – Mar 2027',
    org: 'UC Berkeley',
    orgUrl: 'https://msc.berkeley.edu/',
    place: 'Berkeley, CA',
    role: 'Visiting Student, Mechanical Systems Control Lab',
    note: (
      <>
        J-1 summer research, advised by{' '}
        <ExtLink href="https://msc.berkeley.edu/people/tomizuka.html">Prof. Masayoshi Tomizuka</ExtLink>.
      </>
    ),
  },
  {
    period: 'Sep 2026 – Present',
    org: 'Harvard University',
    orgUrl: 'https://www.harvard.edu/',
    place: 'Cambridge, MA',
    role: 'Research Intern, Embodied Minds Lab',
    note: (
      <>
        Working with <ExtLink href="https://yilundu.github.io/">Prof. Yilun Du</ExtLink>.
      </>
    ),
  },
  {
    period: 'Aug 2025 – Feb 2026',
    org: 'Nanyang Technological University',
    orgUrl: 'https://www.ntu.edu.sg/',
    place: 'Singapore (remote)',
    role: 'Remote Research',
    note: (
      <>
        Advised by <ExtLink href="https://chenyangsi.top/">Prof. Chenyang Si</ExtLink> and{' '}
        <ExtLink href="https://liuziwei7.github.io/">Prof. Ziwei Liu</ExtLink>.
      </>
    ),
  },
  {
    period: 'Sep 2025 – Jan 2026',
    org: 'HiDream.ai',
    orgUrl: 'https://hidreamai.com/home',
    role: 'Algorithm Intern',
  },
  {
    period: 'Mar 2025 – Jul 2025',
    org: 'Baidu',
    orgUrl: 'https://www.baidu.com/',
    role: 'Algorithm Intern',
  },
];

export const education: Entry[] = [
  {
    period: 'Sep 2023 – Jun 2027',
    org: 'University of Science and Technology of China',
    orgUrl: 'https://sgy.ustc.edu.cn/main.htm',
    place: 'Hefei, China',
    role: 'B.E. in Artificial Intelligence, School of the Gifted Young',
    note: <>Expected June 2027. Rank: top 5%.</>,
  },
];

/* ------------------------------------------------------------------- honors */

export const honors: { year: string; body: ReactNode }[] = [
  {
    year: '2026',
    body: <>Best Paper Award, IROS 2026 Workshop on Nonverbal Cues for Human-Robot Cooperative Intelligence</>,
  },
  {
    year: '2025',
    body: <>Yang Ya Alumni Fund Scholarship, awarded to the top five female students in the School of the Gifted Young</>,
  },
  { year: '2024', body: <>Silver Medal, ICPC Hong Kong Regional</> },
  { year: '2024', body: <>National Scholarship, top 1% GPA</> },
];

/* ------------------------------------------------------------ miscellaneous */

export const miscellaneous: { label: string; items: ReactNode[] }[] = [
  {
    label: 'Academic Service',
    items: [<>Reviewer for ICLR.</>],
  },
  {
    label: 'Student Leadership',
    items: [
      <>
        President of the Student Union at the School of the Gifted Young{' '}
        <span className="whitespace-nowrap">(2024–2025)</span>.
      </>,
      <>Deputy Head of the Academic Affairs Department of the USTC Student Union.</>,
      <>Team leader for a summer social practice program in Xinjiang.</>,
    ],
  },
  {
    label: 'Sports',
    items: [
      <>Received the Outstanding Physical Fitness Award (top 1% university-wide).</>,
      <>Won the university badminton team championship.</>,
      <>Placed sixth in the women’s 200 m sprint at the university sports meet.</>,
    ],
  },
  {
    label: 'Arts',
    items: [
      <>I have played the piano for more than ten years and attained Grade 10.</>,
      <>
        I also enjoy drawing; see{' '}
        <ExtLink href="https://github.com/zyjOrz/Hand-drawn-Anime-Style-LoRA-Expand">
          Hand-drawn Anime Style LoRA
        </ExtLink>
        , trained on my own artwork to capture my drawing style.
      </>,
    ],
  },
  {
    label: 'Social Media',
    items: [
      <>
        Find me on{' '}
        <ExtLink href="https://www.xiaohongshu.com/user/profile/5ce00f51000000001600bd54?xsec_token=ABarcBM9m82KvULRkEPPT9rkuVXIY2-OH9sybePLzfeo0%3D&xsec_source=pc_search">
          RedNote
        </ExtLink>
        .
      </>,
    ],
  },
];
