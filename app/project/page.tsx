export default function ProjectPage() {
    return (
      <div className="min-h-screen bg-[#f4ebe8] text-black font-sans px-6 py-10">
        <div className="max-w-4xl mx-auto bg-white/70 border border-black/20 shadow-md rounded-xl p-8 sm:p-12">
          <h1 className="text-4xl font-bold mb-6">Projects</h1>
          <a href="/" className="inline-block mb-6 text-sm text-blue-600 hover:underline">← Back to Home</a>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            This is the project page. Showcasing selected works, research efforts,
            and engineering explorations.
          </p>
        </div>
      </div>
    );
  }