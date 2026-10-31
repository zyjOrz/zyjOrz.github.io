import type { Metadata } from 'next';
import { Fragment } from 'react';
import { Lato } from 'next/font/google';
import CopyEmail from '../components/CopyEmail';
import { amount } from '../components/format';
import { bio, education, experience, honors, miscellaneous, news, profile, publications, SELF } from '../content';
import './classic.css';

// The plain one-column homepage, in the manner of Jon Barron's template:
// Lato, 800px wide, blue links, bracketed dates, figure-left paper rows.
const lato = Lato({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'Yujia Zeng',
  description:
    'Yujia Zeng is an undergraduate at USTC and a visiting scholar at UC Berkeley, working on dexterous hands and generative models.',
  alternates: { canonical: '/classic' },
};

function Authors({ names }: { names: string[] }) {
  return (
    <>
      {names.map((entry, index) => {
        const equal = entry.endsWith('*');
        const name = equal ? entry.slice(0, -1) : entry;
        return (
          <Fragment key={name}>
            {index > 0 ? ', ' : null}
            {name === SELF ? <strong>{name}</strong> : name}
            {equal ? '*' : null}
          </Fragment>
        );
      })}
    </>
  );
}

export default function ClassicPage() {
  return (
    <div className={`classic ${lato.variable}`}>
      <main className="classic-page">
        <section className="classic-intro" aria-labelledby="classic-name">
          <div className="classic-intro-text">
            <h1 id="classic-name">{profile.name}</h1>
            <div className="classic-bio">{bio}</div>
            <p className="classic-links">
              <CopyEmail parts={profile.email.split('@')} />
              {profile.links.map((link) => (
                <Fragment key={link.label}>
                  <span className="classic-bar" aria-hidden="true">
                    |
                  </span>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </Fragment>
              ))}
            </p>
            <p className="classic-switch">
              <a href="/">View the illustrated homepage</a>
            </p>
          </div>
          <div className="classic-photo">
            <img src="/images/photo-classic.webp" alt={`Photo of ${profile.name}`} width={1224} height={624} />
          </div>
        </section>

        <section aria-labelledby="classic-news">
          <h2 id="classic-news">News</h2>
          <ul className="classic-news">
            {news.map((item, index) => (
              <li key={`${item.date}-${index}`}>
                <span className="classic-date">[{item.date}]</span> {item.plain ?? item.body}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="classic-research">
          <h2 id="classic-research">Research</h2>
          <p className="classic-lead">
            Selected publications. * denotes equal contribution.
          </p>
          <div className="classic-papers">
            {publications.map((paper) => {
              const primary = paper.links.find((link) => link.label === 'Project page') ?? paper.links[0];
              return (
                <article key={paper.title} className="classic-paper">
                  <a href={primary.href} target="_blank" rel="noopener noreferrer" className="classic-figure" tabIndex={-1} aria-hidden="true">
                    <img src={paper.image} alt="" loading="lazy" decoding="async" />
                  </a>
                  <div>
                    <h3>
                      <a href={primary.href} target="_blank" rel="noopener noreferrer">
                        {paper.title}
                      </a>
                    </h3>
                    <p>
                      <Authors names={paper.authors} />
                    </p>
                    <p>
                      <em title={paper.venueDetail}>{paper.venue}</em>
                      {paper.location ? <>, {paper.location}</> : null}
                      {paper.highlight ? (
                        <>
                          , <strong className="classic-award">{paper.highlight}</strong>
                        </>
                      ) : null}
                      {paper.status ? <> ({paper.status.toLowerCase()})</> : null}
                    </p>
                    <p className="classic-paper-links">
                      {paper.links.map((link, index) => (
                        <Fragment key={link.label}>
                          {index > 0 ? ' / ' : null}
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label.toLowerCase()}
                          </a>
                        </Fragment>
                      ))}
                    </p>
                    <p className="classic-summary">{paper.summary}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="classic-experience">
          <h2 id="classic-experience">Experience</h2>
          <ul className="classic-list">
            {experience.map((entry) => (
              <li key={`${entry.org}-${entry.period}`}>
                <strong>{entry.org}</strong>, {entry.role}
                {entry.place ? <>, {entry.place}</> : null}
                <span className="classic-when"> · {entry.period}</span>
                {entry.note ? <span className="classic-sub">{entry.note}</span> : null}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="classic-education">
          <h2 id="classic-education">Education</h2>
          <ul className="classic-list">
            {education.map((entry) => (
              <li key={entry.org}>
                <strong>{entry.org}</strong>, {entry.role}
                <span className="classic-when"> · {entry.period}</span>
                {entry.note ? <span className="classic-sub">{entry.note}</span> : null}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="classic-awards">
          <h2 id="classic-awards">Awards</h2>
          <ul className="classic-list">
            {honors.map((item) => {
              // Award amounts are left out on this page.
              const [, rest] = amount(item.detail);
              return (
                <li key={item.title}>
                  {item.title}
                  {rest ? <span className="classic-note">, {rest.split(' · ').join(', ')}</span> : null}
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="classic-misc">
          <h2 id="classic-misc">Service and Miscellaneous</h2>
          <ul className="classic-list">
            {miscellaneous.map((group) => (
              <li key={group.label}>
                <strong>{group.label}:</strong>{' '}
                {group.items.map((item, index) => (
                  <Fragment key={index}>
                    {index > 0 ? ' ' : null}
                    {item}
                  </Fragment>
                ))}
              </li>
            ))}
          </ul>
        </section>

        <footer className="classic-footer">
          <a href="/">Illustrated homepage</a>
          <span aria-hidden="true"> · </span>
          Layout after{' '}
          <a href="https://jonbarron.info/" target="_blank" rel="noopener noreferrer">
            Jon Barron’s website
          </a>
          .
        </footer>
      </main>
    </div>
  );
}
