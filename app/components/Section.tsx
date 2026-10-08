import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  note?: ReactNode;
  children: ReactNode;
};

// Two-column section: the title sits in the left rail (sticky on wide screens),
// the content in the main column.
export default function Section({ id, title, note, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section">
      <div className="section-rail">
        <div className="section-rail-inner">
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
          {note ? <p className="section-note">{note}</p> : null}
        </div>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
