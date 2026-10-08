import VisitorGlobe from './VisitorGlobe';

// Rendered at build time, so the date tracks the last deploy.
const updated = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} Yujia Zeng
        <br />
        Last updated {updated}
      </p>
      <VisitorGlobe />
    </footer>
  );
}
