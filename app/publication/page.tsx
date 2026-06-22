import Image from "next/image";
import { ArrowLeft } from "lucide-react";

const publications = [
  {
    venue: "ICIC 2026",
    type: "Oral",
    title: "ReconNet: Generative Recommendation with Control-Guided Diffusion Models",
    authors: "Yujia Zeng",
    image: "/reconnet.png",
    description:
      "This work reformulates sequential recommendation as a control-guided diffusion generation task integrating ControlNEXT into the diffusion process, allowing user preferences across multiple domains to act as control signals that guide personalized recommendation item generation.",
  },
];

export default function PublicationPage() {
  return (
    <main className="site-canvas min-h-screen px-6 py-10 font-sans text-[#23161b]">
      <div className="mx-auto max-w-6xl">
        <a
          href="/#publications"
          className="soft-action mb-10 inline-flex items-center gap-2 rounded-full border border-[#e2bfd0] bg-white/60 px-4 py-2 text-sm font-medium text-[#7b4456] shadow-sm backdrop-blur-sm"
        >
          <ArrowLeft size={16} />
          Back to Home
        </a>

        <section className="section-shell rounded-[32px] border border-[#ebd2df] bg-white/65 px-6 py-8 shadow-[0_16px_44px_rgba(178,109,143,0.12)] backdrop-blur-sm sm:px-10 sm:py-12">
          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#b05c7c]">
              Selected Work
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-[#2d1820]">Publications</h1>
          </div>

          <div className="space-y-10">
            {publications.map((paper) => (
              <article
                key={paper.title}
                className="interactive-card publication-card group/paper grid grid-cols-1 gap-7 rounded-[28px] border border-[#eed4de] bg-[#fffafc]/80 p-5 shadow-[0_10px_30px_rgba(191,113,142,0.12)] md:grid-cols-[420px_1fr] md:p-6"
              >
                <div className="publication-media group/image relative overflow-hidden rounded-[22px] border border-[#ead5dd] bg-white shadow-[0_10px_26px_rgba(178,109,143,0.14)] transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-[0_22px_45px_rgba(191,113,142,0.24)]">
                  <div className="absolute left-0 top-0 z-10 rounded-br-xl bg-[#0b4cae] px-4 py-1.5 text-sm font-semibold text-white shadow-md">
                    {paper.venue}
                  </div>
                  <Image
                    src={paper.image}
                    alt={`${paper.title} overview`}
                    width={900}
                    height={380}
                    className="h-full min-h-[210px] w-full object-cover transition-transform duration-300 ease-out group-hover/image:scale-[1.02]"
                    priority
                  />
                </div>

                <div className="flex flex-col justify-center py-1">
                  <h2 className="text-[1.35rem] font-semibold leading-8 text-[#3a2b36]">
                    <span className="mr-2 text-[#e00000]">({paper.type})</span>
                    <span className="publication-title">{paper.title}</span>
                  </h2>
                  <p className="mt-3 text-base font-medium text-[#5c5260]">{paper.authors}</p>
                  <p className="mt-1 text-sm font-semibold text-[#7b4456]">{paper.venue}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[1rem] font-semibold">
                    <span className="text-[#1d4f91] underline decoration-[#a9bddb] underline-offset-4" aria-disabled="true">
                      Paper <span className="font-medium text-[#6f4b57]">(comming soon)</span>
                    </span>
                    <span className="text-[#8d6673]">|</span>
                    <span className="text-[#1d4f91] underline decoration-[#a9bddb] underline-offset-4" aria-disabled="true">
                      Code <span className="font-medium text-[#6f4b57]">(comming soon)</span>
                    </span>
                  </div>

                  <ul className="mt-4 list-disc space-y-2 pl-6 text-[1.05rem] leading-8 text-[#3d3842]">
                    <li>{paper.description}</li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
