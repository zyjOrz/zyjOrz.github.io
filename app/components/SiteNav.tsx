const items = [
  { label: 'News', href: '/#news' },
  { label: 'Publications', href: '/#publications' },
  { label: 'Experience', href: '/#experiences' },
  { label: 'Misc', href: '/#miscellaneous' },
];

export default function SiteNav() {
  return (
    <nav aria-label="Sections" className="site-nav">
      <a href="/" className="site-nav-home">
        Yujia Zeng
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
