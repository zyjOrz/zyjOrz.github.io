import type { ReactNode } from 'react';

export type PublicationEntry = {
  venue: string;
  location?: string;
  type: string | null;
  title: string;
  authors: ReactNode;
  authorsNote?: string;
  image: string;
  paperUrl: string | null;
  projectUrl: string | null;
  codeUrl: string | null;
  modelUrl?: string | null;
  codeComingSoon?: boolean;
  description: string;
  status?: string;
  venueDetail?: string;
};

// Shared by the homepage and /publication so RoboSTAR stays consistent.
// Title, authors, and equal contributions follow the supplied September 6 CV.
export const robostar: PublicationEntry = {
  venue: 'IROS 2026 Workshop',
  type: 'Best Paper',
  status: 'Under Review',
  venueDetail:
    'Best Paper Award at the Workshop on Nonverbal Cues for Human-Robot Cooperative Intelligence.',
  title:
    'RoboSTAR: Next-Scale Autoregressive Sign Language Motion Translation for Humanoid Robots',
  authors: (
    <>
      <strong className="font-extrabold text-[#35242d]">
        Yujia Zeng<sup>*</sup>
      </strong>
      {', Chensheng Peng'}<sup>*</sup>
      {', Yuxin Chen'}<sup>*</sup>
      {', Alex Shao, Nathan Jew, and Masayoshi Tomizuka'}
    </>
  ),
  authorsNote: '* Equal contribution.',
  image: '/robostar-method.png',

  paperUrl: 'https://arxiv.org/abs/2609.32250',
  projectUrl: 'https://www.yujiazeng.com/RoboSTAR/',
  codeUrl: 'https://github.com/zyjOrz/RoboSTAR',
  modelUrl: 'https://huggingface.co/Ivystream/RoboSTAR',

  description:
    'RoboSTAR translates speech/text into continuous sign language motion using part-wise finite scalar quantization and next-scale autoregression, refining synchronized body and hand motion from coarse to fine before retargeting it for humanoid robot execution.',
};