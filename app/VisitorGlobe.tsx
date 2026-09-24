export default function VisitorGlobe() {
  return (
    <section
      id="visitors"
      aria-label="Visitor locations"
      className="mx-auto mt-10 mb-4 w-full max-w-[260px]"
    >
      <iframe
        src="/visitor-globe-v2.html"
        title="Visitor locations"
        width="260"
        height="320"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        className="block w-full border-0 bg-transparent"
      />
    </section>
  );
}
