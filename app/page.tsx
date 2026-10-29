import { DateStamp, Greeting } from './components/ciel/Clock';
import { Column, Dial, Dove, Ladder, Postmark, Stamp } from './components/ciel/Ornaments';
import TagRail from './components/ciel/TagRail';
import CopyEmail from './components/CopyEmail';
import EntryList from './components/EntryList';
import { amount, dotted, pad2 } from './components/format';
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

function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="hero">
      <Ladder className="orn-ladder" />
      <Dove className="orn-dove" />

      <div className="hero-head">
        <div className="hero-title">
          <span className="tag-ink">Portfolio · {built.getFullYear()}</span>
          <div className="hero-name-wrap">
            <span className="numeral numeral-xl" aria-hidden="true">
              YZ
            </span>
            <h1 id="home-title" className="hero-name">
              {profile.name}
            </h1>
          </div>
          <p className="kicker">Dexterous hands · Generative models</p>
        </div>
        <Greeting />
        <DateStamp built={builtDate}>
          Index · {publications.length} papers · {news.length} nouvelles
        </DateStamp>
      </div>

      <div className="hero-stage">
        <div className="hero-left" aria-hidden="true">
          <Column className="orn-column" />
          <figure className="quote-card">
            <p lang="zh-Hans">让机器人的手，也学会说话。</p>
            <p className="quote-en">Teaching robot hands to speak.</p>
          </figure>
        </div>

        <div className="hero-center">
          <Dial className="orn-dial" />
          <div className="arch">
            <img src={profile.portrait} alt={`Portrait of ${profile.name}`} width={560} height={799} />
          </div>
          <span className="numeral numeral-arch" aria-hidden="true">
            01
          </span>
          <p className="arch-chip">
            <span className="tag-ink">Maintenant</span>
            MSC Lab · UC Berkeley
          </p>
        </div>

        <div className="hero-right">
          <div className="panel panel-bio">
            <div className="panel-bar" aria-hidden="true">
              <span className="panel-index">01</span>
              <span className="panel-label">
                À propos · <span lang="zh-Hans">关于</span>
              </span>
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
          <Stamp className="hero-stamp" />
          <Postmark className="hero-postmark" month={builtMonth} year={String(built.getFullYear())} />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <TagRail />
      <div className="page">
        <SiteNav />

        <main>
          <Hero />

          <Section
            id="news"
            index="02"
            title="News"
            fr="Nouvelles"
            zh="新闻"
            script="Nouvelles du ciel"
            count={`Nº ${pad2(news.length)}`}
          >
            <ol className="rows">
              {news.map((item, index) => (
                <li key={`${item.date}-${index}`} className={`row${index === 0 ? ' is-current' : ''}`}>
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
            fr="Publications"
            zh="论文"
            script="Écrire dans le ciel"
            count={`Nº ${pad2(publications.length)}`}
            note="* Equal contribution"
          >
            <PublicationList />
          </Section>

          <Section
            id="experiences"
            index="04"
            title="Experience"
            fr="Parcours"
            zh="经历"
            script="Chemins parcourus"
            count={`Nº ${pad2(experience.length)}`}
          >
            <EntryList entries={experience} />
          </Section>

          <Section id="education" index="05" title="Education" fr="Formation" zh="教育" script="Années d’étude">
            <EntryList entries={education} />
          </Section>

          <Section
            id="honors"
            index="06"
            title="Honors"
            fr="Distinctions"
            zh="荣誉"
            script="Petites étoiles"
            count={`Nº ${pad2(honors.length)}`}
          >
            <ol className="rows">
              {honors.map((item, index) => {
                const [value, rest] = amount(item.detail);
                return (
                  <li key={item.title} className="row">
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
