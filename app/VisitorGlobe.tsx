export default function VisitorGlobe() {
  return (
    <section
      id="visitors"
      aria-label="Visitor locations"
      className="mx-auto mt-3 mb-0 w-full max-w-[260px]"
    >
      <iframe
        src="/visitor-globe-v2.html?v=3"
        title="Visitor locations"
        width="260"
        height="240"
        scrolling="no"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        className="block h-[240px] w-full overflow-hidden border-0 bg-transparent"
      />
    </section>
  );
}