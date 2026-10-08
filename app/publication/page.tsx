import type { Metadata } from 'next';
import PublicationList from '../components/PublicationList';
import Section from '../components/Section';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';

export const metadata: Metadata = {
  title: 'Publications · Yujia Zeng',
  alternates: { canonical: '/publication' },
};

export default function PublicationPage() {
  return (
    <div className="page">
      <SiteNav />

      <main className="pt-12 md:pt-16">
        <Section id="publications" title="Publications" note="* Equal contribution">
          <PublicationList />
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
