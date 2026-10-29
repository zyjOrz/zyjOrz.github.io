import type { Metadata } from 'next';
import TagRail from '../components/ciel/TagRail';
import { RevealObserver } from '../components/ciel/Motion';
import { pad2 } from '../components/format';
import PublicationList from '../components/PublicationList';
import Section from '../components/Section';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';
import { publications } from '../content';

export const metadata: Metadata = {
  title: 'Publications · Yujia Zeng',
  alternates: { canonical: '/publication' },
};

export default function PublicationPage() {
  return (
    <>
      <TagRail />
      <RevealObserver />
      <div className="page">
        <SiteNav />

        <main className="pt-12 md:pt-16">
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
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
