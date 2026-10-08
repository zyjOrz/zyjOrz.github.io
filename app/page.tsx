import CopyEmail from './components/CopyEmail';
import EntryList from './components/EntryList';
import PublicationList from './components/PublicationList';
import Section from './components/Section';
import SiteFooter from './components/SiteFooter';
import SiteNav from './components/SiteNav';
import { bio, education, experience, honors, miscellaneous, news, profile } from './content';

function Hero() {
  return (
    <section id="home" aria-label="About" className="hero">
      <div className="hero-portrait">
        <img src={profile.portrait} alt={`Portrait of ${profile.name}`} width={560} height={799} />
      </div>

      <div className="hero-text">
        <h1 className="hero-name">{profile.name}</h1>
        <div className="hero-bio">{bio}</div>
        <ul className="hero-links">
          <li>
            <CopyEmail email={profile.email} />
          </li>
          {profile.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="page">
      <SiteNav />

      <main>
        <Hero />

        <Section id="news" title="News">
          <ul className="dated">
            {news.map((item, index) => (
              <li key={`${item.date}-${index}`}>
                <p className="date">{item.date}</p>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="publications" title="Publications" note="* Equal contribution">
          <PublicationList />
        </Section>

        <Section id="experiences" title="Experience">
          <EntryList entries={experience} />
        </Section>

        <Section id="education" title="Education">
          <EntryList entries={education} />
        </Section>

        <Section id="honors" title="Honors">
          <ul className="dated">
            {honors.map((item, index) => (
              <li key={index}>
                <p className="date">{item.year}</p>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="miscellaneous" title="Miscellaneous">
          <dl className="misc">
            {miscellaneous.map((group) => (
              <div key={group.label} className="misc-row">
                <dt>{group.label}</dt>
                <dd>
                  {group.items.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
