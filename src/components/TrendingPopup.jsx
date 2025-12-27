function TrendingPopup({ posts, onSelect, onClose }) {
  // 🔥 Calculate total reactions per post
  const getTotalReactions = (post) =>
    Object.values(post.reactions || {}).reduce(
      (sum, arr) => sum + arr.length,
      0
    );

  // 🔥 Sort by total reactions (descending)
  const trendingPosts = [...posts]
    .map((post) => ({
      ...post,
      totalReactions: getTotalReactions(post),
    }))
    .filter((post) => post.totalReactions > 0)
    .sort(
      (a, b) => b.totalReactions - a.totalReactions
    )
    .slice(0, 5);

  return (
    <div className="fixed inset-0 z-90 bg-black/40 flex items-center justify-center">
      <div className="bg-white/60 backdrop-blur-2xl w-[95%] md:w-[40%] rounded-3xl p-5 text-black relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4 text-center">
          🔥 Trending Messages
        </h3>

        {trendingPosts.length === 0 ? (
          <p className="text-sm text-center text-black/60">
            No trending messages yet
          </p>
        ) : (
          <ul className="space-y-3">
            {trendingPosts.map((post) => (
              <li
                key={post.id}
                onClick={() => onSelect(post.id)}
                className="cursor-pointer bg-white/70 hover:bg-white rounded-xl px-4 py-3 transition"
              >
                <p className="text-sm font-medium">
                  {post.previewText}
                </p>

                <p className="text-xs text-black/60 mt-1">
                  🔥 {post.totalReactions} reactions · 🐾{" "}
                  {post.authorAnimalId}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TrendingPopup;
