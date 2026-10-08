import { Fragment } from 'react';
import { publications, SELF, type Publication } from '../content';

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

function Venue({ paper }: { paper: Publication }) {
  return (
    <p className="pub-venue">
      <span title={paper.venueDetail}>{paper.venue}</span>
      {paper.location ? <span className="pub-meta">, {paper.location}</span> : null}
      {paper.highlight ? (
        <>
          <span className="pub-sep" aria-hidden="true">
            ·
          </span>
          <span className="highlight">{paper.highlight}</span>
        </>
      ) : null}
      {paper.status ? (
        <>
          <span className="pub-sep" aria-hidden="true">
            ·
          </span>
          <span className="pub-meta">{paper.status}</span>
        </>
      ) : null}
    </p>
  );
}

export default function PublicationList() {
  return (
    <ol className="pubs">
      {publications.map((paper) => {
        const primary = paper.links.find((link) => link.label === 'Project page') ?? paper.links[0];

        return (
          <li key={paper.title} className="pub">
            <a
              href={primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-figure"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img src={paper.image} alt="" loading="lazy" decoding="async" />
            </a>

            <div className="pub-text">
              <h3 className="pub-title">
                <a href={primary.href} target="_blank" rel="noopener noreferrer">
                  {paper.title}
                </a>
              </h3>
              <Authors names={paper.authors} />
              <Venue paper={paper} />
              <p className="pub-links">
                {paper.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="link">
                    {link.label}
                  </a>
                ))}
              </p>
              <p className="pub-summary">{paper.summary}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
