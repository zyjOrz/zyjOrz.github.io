import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff3f7] via-[#ffe8f0] to-[#fce6ee] px-6 py-16 font-sans text-[#23161b]">
      <section className="mx-auto max-w-6xl rounded-[30px] border border-[#e9becd] bg-white/60 px-8 py-16 text-center shadow-[0_20px_70px_rgba(186,110,140,0.14)] backdrop-blur-sm sm:px-12 md:py-20">
        <h1 className="text-4xl font-semibold tracking-tight text-[#2d1820] sm:text-5xl">Get In Touch</h1>
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[#6f4b57] sm:text-[1.45rem]">
          Always interested in exchanging ideas and exploring research collaborations.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="mailto:yujiazeng@berkeley.edu"
            className="inline-flex items-center gap-4 rounded-2xl border border-[#dfb5c4] bg-[#fff0f5]/90 px-8 py-5 text-lg text-[#7b4456] shadow-[0_10px_30px_rgba(191,113,142,0.15)] transition hover:-translate-y-0.5 hover:bg-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c15d82] text-white shadow-sm">
              <Mail size={20} />
            </span>
            <span className="break-all">yujiazeng [AT] berkeley [DOT] edu</span>
          </a>
        </div>
      </section>
    </div>
  );
}
