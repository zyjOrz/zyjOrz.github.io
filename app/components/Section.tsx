import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  index: string; // "02"
  title: ReactNode; // English heading (the accessible name)
  fr: string; // French label, e.g. "Nouvelles"
  zh: string; // Chinese title, e.g. "新闻"
  script?: string; // calligraphic subtitle
  count?: string; // right end of the panel bar, e.g. "Nº 09"
  note?: ReactNode;
  children: ReactNode;
};

// An archive page: tag, outlined numeral and Songti title above a paper panel
// with a navy bar.
export default function Section({ id, index, title, fr, zh, script, count, note, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section">
      <header className="section-head">
        <div className="section-mark" aria-hidden="true">
          <span className="tag-ink">
            {fr} · {index}
          </span>
          <span className="numeral">{index}</span>
          <span className="section-zh" lang="zh-Hans">
            {zh}
          </span>
        </div>
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
        {script ? (
          <p className="section-script" lang="fr" aria-hidden="true">
            {script}
          </p>
        ) : null}
      </header>

      <div className="panel">
        <div className="panel-bar" aria-hidden="true">
          <span className="panel-index">{index}</span>
          <span className="panel-label">
            {fr} · <span lang="zh-Hans">{zh}</span>
          </span>
          {count ? <span className="panel-count">{count}</span> : null}
        </div>
        <div className="panel-body">{children}</div>
        {note ? <p className="panel-note">{note}</p> : null}
      </div>
    </section>
  );
}
