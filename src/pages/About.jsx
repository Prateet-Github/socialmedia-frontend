export default function About() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 flex items-center justify-center overflow-hidden">
      <div className="max-w-5xl w-full grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-white pb-4">
            <h1 className="text-5xl font-bold mb-2">About</h1>
            <p className="text-gray-400 text-sm">
              A modern social platform built with passion
            </p>
          </div>

          {/* Creator */}
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">👨‍💻</span> The Creator
            </h2>
            <p className="text-sm leading-relaxed text-gray-300">
              Built by{" "}
              <span className="font-semibold text-white">Prateet Tiwari</span>,
              a full-stack developer passionate about creating clean, scalable
              applications that people actually want to use.
            </p>
          </div>

          {/* Why This Exists */}
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">🎯</span> The Mission
            </h2>
            <p className="text-sm leading-relaxed text-gray-300">
              To build a fast, privacy-focused social platform that respects
              users. No ads, no algorithms pushing content you don't want—just
              genuine connections.
            </p>
          </div>

          {/* Journey */}
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">🚀</span> The Journey
            </h2>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>→ Inspired by late-night scrolling</li>
              <li>→ Countless bugs (and fixes)</li>
              <li>→ Features users actually asked for</li>
              <li>→ Still evolving with your feedback</li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Tech Stack */}
          <div className="bg-white text-black p-5 rounded-lg">
            <h2 className="text-xl font-bold mb-3">⚙️ Built With</h2>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-black text-white rounded-full">
                Node.js
              </span>
              <span className="px-3 py-1 bg-black text-white rounded-full">
                Express
              </span>
              <span className="px-3 py-1 bg-black text-white rounded-full">
                MongoDB
              </span>
              <span className="px-3 py-1 bg-black text-white rounded-full">
                Redis
              </span>

              <span className="px-3 py-1 bg-black text-white rounded-full">
                Tailwind
              </span>
            </div>
          </div>

          {/* Guidelines */}
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">📜</span> Community Rules
            </h2>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>Be respectful to everyone</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>No spam or scams</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>Keep it appropriate</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-white">•</span>
                <span>Have fun and be yourself</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="border border-white p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Get in Touch</h2>
            <p className="text-sm text-gray-400 mb-3">
              Questions? Feedback? Want to collaborate?
            </p>
            <a
              href="https://github.com/Prateet-Github"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-gray-200 transition-colors"
            >
              GitHub Profile →
            </a>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 text-center">
            Made with ☕ and lots of debugging
          </p>
        </div>
      </div>
    </div>
  );
}
