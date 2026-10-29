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
      <span className="chip chip-ink" title={paper.venueDetail}>
        {paper.venue}
      </span>
      {paper.highlight ? <span className="chip chip-rose">{paper.highlight}</span> : null}
      {paper.status ? <span className="chip">{paper.status}</span> : null}
      {paper.location ? <span className="chip-plain">{paper.location}</span> : null}
    </p>
  );
}

export default function PublicationList() {
  return (
    <ol className="pubs">
      {publications.map((paper, index) => {
        const primary = paper.links.find((link) => link.label === 'Project page') ?? paper.links[0];

        return (
          <li key={paper.title} className="pub" data-reveal="" style={stagger(index)}>
            <a
              href={primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-figure"
              tabIndex={-1}
              aria-hidden="true"
            >
              <span className="pub-figure-no">Nº {pad2(index + 1)}</span>
              <img src={paper.image} alt="" loading="lazy" decoding="async" />
            </a>

            <div className="pub-text">
              <Chips paper={paper} />
              <h3 className="pub-title">
                <a href={primary.href} target="_blank" rel="noopener noreferrer">
                  {paper.title}
                </a>
              </h3>
              <Authors names={paper.authors} />
              <p className="pub-summary">{paper.summary}</p>
              <p className="pub-links">
                {paper.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="chip-link">
                    {link.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                ))}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
