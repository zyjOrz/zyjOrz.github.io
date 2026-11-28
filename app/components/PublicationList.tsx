import { Fragment } from 'react';
import { publications, SELF, type Publication } from '../content';
import { pad2, stagger } from './format';

function Authors({ names }: { names: string[] }) {
  return (
    <p className="pub-authors">
      {names.map((entry, index) => {
        const equal = entry.endsWith('*');
        const name = equal ? entry.slice(0, -1) : entry;

        return (
          <Fragment key={name}>
            {index > 0 ? ', ' : null}
            <span className={name === SELF ? 'pub-self' : undefined}>{name}</span>
            {equal ? <sup>*</sup> : null}
          </Fragment>
        );
      })}
    </p>
  );
}

function Chips({ paper }: { paper: Publication }) {
  return (
    <p className="chips">
      {paper.venue ? (
        <span className="chip chip-ink" title={paper.venueDetail}>
          {paper.venue}
        </span>
      ) : null}
      {paper.highlight ? <span className="chip chip-rose">{paper.highlight}</span> : null}
      {paper.status ? <span className="chip">{paper.status}</span> : null}
      {paper.location ? <span className="chip-plain">{paper.location}</span> : null}
    </p>
  );
}

// Short name for a figure placeholder: the part of the title before the colon.
const shortName = (title: string) => title.split(':')[0];

function Figure({ paper, index, href }: { paper: Publication; index: number; href?: string }) {
  const number = <span className="pub-figure-no">Nº {pad2(index + 1)}</span>;
  const body = paper.image ? (
    <img src={paper.image} alt="" loading="lazy" decoding="async" />
  ) : (
    <span className="pub-figure-pending">
      <span className="pub-figure-name">{shortName(paper.title)}</span>
      <span className="pub-figure-note">Figure coming soon</span>
    </span>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="pub-figure" tabIndex={-1} aria-hidden="true">
      {number}
      {body}
    </a>
  ) : (
    <div className={`pub-figure${paper.image ? '' : ' is-pending'}`} aria-hidden="true">
      {number}
      {body}
    </div>
  );
}

export default function PublicationList() {
  return (
    <ol className="pubs">
      {publications.map((paper, index) => {
        const primary = paper.links.find((link) => link.label === 'Project page') ?? paper.links[0];

        return (
          <li key={paper.title} className="pub" data-reveal="" style={stagger(index)}>
            <Figure paper={paper} index={index} href={primary?.href} />

            <div className="pub-text">
              <Chips paper={paper} />
              <h3 className="pub-title">
                {primary ? (
                  <a href={primary.href} target="_blank" rel="noopener noreferrer">
                    {paper.title}
                  </a>
                ) : (
                  paper.title
                )}
              </h3>
              <Authors names={paper.authors} />
              <p className="pub-summary">{paper.summary}</p>
              {paper.links.length ? (
                <p className="pub-links">
                  {paper.links.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="chip-link">
                      {link.label}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  ))}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
