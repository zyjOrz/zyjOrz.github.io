export default function VisitorGlobe() {
  return (
    <section
      id="visitors"
      aria-label="Visitor locations"
      className="mx-auto mt-6 mb-2 w-full max-w-[260px]"
    >
      <iframe
        src="/visitor-globe-v2.html"
        title="Visitor locations"
        width="260"
        height="270"
        scrolling="no"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        className="block h-[270px] w-full overflow-hidden border-0 bg-transparent"
      />
    </section>
  );
}