function AllMessagesPopup({ posts, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-90 bg-black/40 flex items-center justify-center">
      <div className="bg-white/60 backdrop-blur-2xl w-[95%] md:w-[45%] max-h-[80vh] rounded-3xl p-5 text-black relative overflow-y-auto">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4 text-center">
          💬 All Messages
        </h3>

        {posts.length === 0 ? (
          <p className="text-sm text-center text-black/60">
            No messages yet
          </p>
        ) : (
          <ul className="space-y-3">
            {[...posts]
              .sort(
                (a, b) =>
                  b.createdAt?.seconds -
                  a.createdAt?.seconds
              )
              .map((post) => (
                <li
                  key={post.id}
                  onClick={() => onSelect(post.id)}
                  className="cursor-pointer bg-white/70 hover:bg-white rounded-xl px-4 py-3 transition"
                >
                  <p className="text-sm font-medium">
                    {post.previewText}
                  </p>
                  <p className="text-xs text-black/60 mt-1">
                    🐾 {post.authorAnimalId} · 🎓 {post.branch} · 📅{" "}
                    {post.year}
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AllMessagesPopup;
