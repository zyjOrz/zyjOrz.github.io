const items = [
  { label: 'News', href: '/#news' },
  { label: 'Publications', href: '/#publications' },
  { label: 'Experience', href: '/#experiences' },
];

// Shown where the tag rail does not fit (narrow screens).
export default function SiteNav() {
  return (
    <nav aria-label="Sections" className="site-nav">
      <a href="/" className="site-nav-home">
        <span className="tag-ink">YZ</span>
        <span lang="fr">Archive du ciel</span>
      </a>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
