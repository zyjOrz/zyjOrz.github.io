/**
 * Official MapMyVisitors image embed (the provider's non-JavaScript option).
 * Keep the request remote and eager: do not replace this with a local image,
 * next/image optimization, an iframe, or a second tracker running in parallel.
 * The legacy component name is kept so app/page.tsx does not need to change.
 */
export default function VisitorGlobe() {
  return (
    <section
      id="visitors"
      aria-label="Visitor locations"
      className="mx-auto mt-10 w-full max-w-[240px] scroll-mt-28 bg-transparent"
    >
      <a
        href="https://mapmyvisitors.com/web/1c8f1"
        title="Visit tracker"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img
          src="https://mapmyvisitors.com/map.png?d=lKHf8BqRebBB-StPHh2OO0tGiewbln-oYKxaOgftHfA&cl=ffffff"
          alt="Visitor locations on a world map — open visitor statistics"
          width={240}
          loading="eager"
          decoding="async"
          referrerPolicy="strict-origin-when-cross-origin"
          className="block h-auto w-full border-0"
        />
      </a>
    </section>
  );
}
