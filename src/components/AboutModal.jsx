function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-120 bg-black/50 flex items-center justify-center">
      <div className="bg-white/60 backdrop-blur-2xl w-[90%] md:w-[65%] max-h-[80vh] overflow-y-auto p-6 rounded-3xl relative text-black">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          About BitUnsaid
        </h2>
        <p className="font-semibold text-black mb-2">
         It is not only a confession platform, but also a space for ideas,
         opinions, questions, emotions, and honest conversations.
        </p>

        <section className="space-y-4 text-sm leading-relaxed">
          <p>
            <strong>BitUnsaid</strong> is a campus-only, real-time
            expression platform built exclusively for students of
            <strong> BIT Deoghar</strong>.
          </p>
          <p className="font-bold text-black mb-2">
            Anonymity is the core feature of BitUnsaid.
          </p>
          <p>
            It is designed to give students a safe space to share
            thoughts, confessions, ideas, opinions, and feelings that
            often remain <em>unsaid</em>.
          </p>

          <hr />

          <h3 className="font-semibold text-lg">
            🎯 Objective
          </h3>
          <p>
            To create a shared digital campus where students can
            express themselves freely, without fear of judgment,
            while still remaining accountable.
          </p>

          <hr />

          <h3 className="font-semibold text-lg">
            🫧 Floating Bubble System
          </h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              Every message appears as a floating bubble on the main
              screen.
            </li>
            <li>
              Bubbles move continuously and bounce within the screen.
            </li>
            <li>
              Clicking a bubble opens the full message.
            </li>
            <li>
              All users see the same bubbles in real time.
            </li>
          </ul>

          <hr />

          <h3 className="font-semibold text-lg">
            👤 Identity & Privacy
          </h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              Users are identified by a unique animal-based ID.
            </li>
            <li>
              Branch, year, and gender are shown for context.
            </li>
            <li>
              Real name, email, and roll number are never shown.
            </li>
            <li>
              <strong>BitUnsaid is anonymous — not fake.</strong>
            </li>
          </ul>

          <hr />

          <h3 className="font-semibold text-lg">
            😀 Emoji Reactions
          </h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              React using emojis instead of comments.
            </li>
            <li>
              One reaction per user per message.
            </li>
            <li>
              Reactions update live for everyone.
            </li>
          </ul>

          <hr />

          <h3 className="font-semibold text-lg">
            🔥 Trending Messages
          </h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              Messages with high engagement become trending.
            </li>
            <li>
              Trending messages are highlighted visually.
            </li>
            <li>
              Only active messages are eligible.
            </li>
          </ul>

          <hr />

          <h3 className="font-semibold text-lg">
            ⏳ Message Lifetime
          </h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              Every message on BitUnsaid is temporary.
            </li>
            <li>
              Messages are automatically deleted after
              <strong> 7 days</strong>.
            </li>
            <li>
              This encourages honest, in-the-moment expression.
            </li>
          </ul>

          <hr />

          <h3 className="font-semibold text-lg">
            🚩 Safety & Moderation
          </h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              Any user can report a message once.
            </li>
            <li>
              Messages are hidden after <strong>10</strong> reports.
            </li>
            <li>
              Harassment, abuse, and hate speech are not tolerated.
            </li>
          </ul>

          <hr />

          <h3 className="font-semibold text-lg">
            🧑‍🎓 Who Is This For?
          </h3>
          <p>
            BitUnsaid is built by Shashi Kumar Sahu, for students of BIT
            Deoghar. It is not a social media platform, but a shared
            emotional and intellectual campus space.
          </p>

          <p className="italic text-center mt-4">
            “Say what you feel. Someone out there feels it too.”
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutModal;
