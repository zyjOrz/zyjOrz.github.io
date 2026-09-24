export default function VisitorGlobe() {
  return (
    <section
      id="visitors"
      aria-label="Visitor locations"
      className="mx-auto mt-10 mb-4 w-full max-w-[260px]"
    >
      <iframe
        src="/visitor-globe.html"
        title="Visitor locations"
        width="260"
        height="260"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        className="block h-[260px] w-full border-0 bg-transparent"
      />
    </section>
  );
}
