import type { CSSProperties } from 'react';
import { DateStamp, Greeting } from './components/ciel/Clock';
import { DialMotion, RevealObserver, StatusTicker } from './components/ciel/Motion';
import { Column, Dial, Dove, Ladder, Postmark, Stamp } from './components/ciel/Ornaments';
import TagRail from './components/ciel/TagRail';
import CopyEmail from './components/CopyEmail';
import EntryList from './components/EntryList';
import { amount, dotted, pad2, stagger } from './components/format';
import Miscellaneous from './components/Miscellaneous';
import PublicationList from './components/PublicationList';
import Section from './components/Section';
import SiteFooter from './components/SiteFooter';
import SiteNav from './components/SiteNav';
import { bio, education, experience, honors, miscellaneous, news, profile, publications } from './content';

// Build time, shown until the visitor's own clock takes over.
const built = new Date();
const builtDate = `${built.getFullYear()}/${pad2(built.getMonth() + 1)}/${pad2(built.getDate())}`;
const builtMonth = built.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

// Entrance order for the hero: each element rises out of the light in turn.
const enter = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="hero">
      <Ladder className="orn-ladder" />
      <Dove className="orn-dove" />

      <div className="hero-head">
        <div className="hero-title">
          <span className="tag-ink" data-enter="" style={enter(150)}>
            Academic homepage · {built.getFullYear()}
          </span>
          <div className="hero-name-wrap">
            <span className="numeral numeral-xl" data-enter="ghost" style={enter(250)} aria-hidden="true">
              YZ
            </span>
            <h1 id="home-title" className="hero-name" data-enter="" style={enter(380)}>
              {profile.name}
            </h1>
          </div>
          <p className="kicker" data-enter="" style={enter(500)}>
            Dexterous hands · Generative models
          </p>
        </div>
        <div className="hero-greeting" data-enter="write" style={enter(650)}>
          <Greeting />
        </div>
        <div data-enter="" style={enter(300)}>
          <DateStamp built={builtDate}>
            Index · {publications.length} papers · {news.length} updates
          </DateStamp>
        </div>
      </div>

      <div className="hero-stage">
        <div className="hero-left" aria-hidden="true">
          <div data-enter="" style={enter(200)}>
            <Column className="orn-column" />
          </div>
          <figure className="quote-card" data-enter="card" style={enter(900)}>
            <span className="quote-label">Research vision</span>
            <p className="quote-en">Teaching robot hands to speak.</p>
          </figure>
        </div>

        <div className="hero-center">
          <DialMotion className="orn-dial">
            <Dial />
          </DialMotion>
          <div className="arch" data-enter="arch" style={enter(320)}>
            <img src={profile.portrait} alt={`Portrait of ${profile.name}`} width={560} height={799} />
          </div>
          <StatusTicker />
        </div>

        <div className="hero-right">
          <div className="panel panel-bio" data-enter="" style={enter(560)}>
            <div className="panel-bar" aria-hidden="true">
              <span className="panel-index">01</span>
              <span className="panel-label">About</span>
              <span className="panel-count">Nº 01</span>
            </div>
            <div className="panel-body">
              <div className="hero-bio">{bio}</div>
              <ul className="hero-links">
                <li>
                  <CopyEmail parts={profile.email.split('@')} />
                </li>
                {profile.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="chip-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hero-stamp" data-enter="stamp" style={enter(1100)}>
            <Stamp />
          </div>
          <div className="hero-postmark" data-enter="" style={enter(1350)}>
            <Postmark month={builtMonth} year={String(built.getFullYear())} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <TagRail />
      <RevealObserver />
      <div className="page">
        <SiteNav />

        <main>
          <Hero />

          <Section
            id="news"
            index="02"
            title="News"
            tag="News"
            script="Recent updates"
            bar="News · latest first"
            count={`Nº ${pad2(news.length)}`}
          >
            <ol className="rows">
              {news.map((item, index) => (
                <li
                  key={`${item.date}-${index}`}
                  className={`row${index === 0 ? ' is-current' : ''}`}
                  data-reveal=""
                  style={stagger(index)}
                >
                  <span className="row-index" aria-hidden="true">
                    {pad2(index + 1)}
                  </span>
                  <p className="row-main">{item.body}</p>
                  <p className="row-date">{dotted(item.date)}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section
            id="publications"
            index="03"
            title="Publications"
            tag="Publications"
            script="Selected papers"
            bar="Publications · selected"
            count={`Nº ${pad2(publications.length)}`}
            note="* Equal contribution"
          >
            <PublicationList />
          </Section>

          <Section
            id="experiences"
            index="04"
            title="Experience"
            tag="Experience"
            script="Research & industry"
            count={`Nº ${pad2(experience.length)}`}
          >
            <EntryList entries={experience} />
          </Section>

          <Section id="education" index="05" title="Education" tag="Education" script="Academic training">
            <EntryList entries={education} />
          </Section>

          <Section
            id="honors"
            index="06"
            title="Honors"
            tag="Honors"
            script="Awards & scholarships"
            count={`Nº ${pad2(honors.length)}`}
          >
            <ol className="rows">
              {honors.map((item, index) => {
                const [value, rest] = amount(item.detail);
                return (
                  <li key={item.title} className="row" data-reveal="" style={stagger(index)}>
                    <span className="row-index" aria-hidden="true">
                      {pad2(index + 1)}
                    </span>
                    <div className="row-main">
                      <p className="honor-title">{item.title}</p>
                      {rest ? <p className="honor-detail">{rest}</p> : null}
                    </div>
                    <p className="row-date row-amount">{value}</p>
                  </li>
                );
              })}
            </ol>
          </Section>

          <Miscellaneous
            groups={miscellaneous.map((group) => ({
              label: group.label,
              notes: group.items.map((item, index) => <p key={index}>{item}</p>),
            }))}
          />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
