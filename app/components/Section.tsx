import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  index: string; // "02"
  title: ReactNode; // the heading, set large over the numeral
  tag: string; // navy label above the heading, e.g. "News"
  script?: string; // calligraphic subtitle on the right
  bar?: string; // panel bar label; defaults to the tag
  count?: string; // right end of the panel bar, e.g. "Nº 09"
  note?: ReactNode;
  children: ReactNode;
};

// An archive page: tag and outlined numeral behind a heavy heading, above a
// paper panel with a navy bar.
export default function Section({ id, index, title, tag, script, bar, count, note, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section">
      <header className="section-head" data-reveal="">
        <div className="section-mark">
          <span className="tag-ink" aria-hidden="true">
            {tag} · {index}
          </span>
          <span className="numeral" aria-hidden="true">
            {index}
          </span>
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
        </div>
        {script ? (
          <p className="section-script" aria-hidden="true">
            {script}
          </p>
        ) : null}
      </header>

      <div className="panel" data-reveal="">
        <div className="panel-bar" aria-hidden="true">
          <span className="panel-index">{index}</span>
          <span className="panel-label">{bar ?? tag}</span>
          {count ? <span className="panel-count">{count}</span> : null}
        </div>
        <div className="panel-body">{children}</div>
        {note ? <p className="panel-note">{note}</p> : null}
      </div>
    </section>
  );
}
