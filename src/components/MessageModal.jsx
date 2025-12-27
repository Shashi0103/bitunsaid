import { auth, db } from "../firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const EMOJIS = ["❤️", "😂", "😢", "😮", "🔥", "👍", "👀"];

function MessageModal({ post, onClose }) {
  const userId = auth.currentUser.uid;

  const alreadyReported =
    post.reports?.includes(userId);

  // 🔥 REPORT
  const reportPost = async () => {
    if (alreadyReported) return;

    await updateDoc(doc(db, "posts", post.id), {
      reports: arrayUnion(userId),
    });
  };

  // 🔗 SHARE
  const sharePost = async () => {
    const link = `${window.location.origin}/?post=${post.id}`;
    await navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  // 😀 SINGLE EMOJI REACTION PER USER
  const toggleReaction = async (emoji) => {
    const postRef = doc(db, "posts", post.id);

    // Find existing reaction (if any)
    let existingEmoji = null;

    EMOJIS.forEach((e) => {
      if (post.reactions?.[e]?.includes(userId)) {
        existingEmoji = e;
      }
    });

    // If clicking the same emoji → remove it
    if (existingEmoji === emoji) {
      await updateDoc(postRef, {
        [`reactions.${emoji}`]: arrayRemove(userId),
      });
      return;
    }

    const updates = {};

    // Remove user from previous emoji
    if (existingEmoji) {
      updates[`reactions.${existingEmoji}`] =
        arrayRemove(userId);
    }

    // Add user to new emoji
    updates[`reactions.${emoji}`] =
      arrayUnion(userId);

    await updateDoc(postRef, updates);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-xl rounded-2xl bg-white/40 backdrop-blur-2xl border border-white/30 p-6 shadow-xl">

        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold text-black/70 hover:text-black transition"
        >
          ✕
        </button>

        {/* 📄 Content */}
        <p className="text-black text-lg mb-4">
          {post.content}
        </p>

        {/* 🧾 Meta */}
        <div className="text-sm text-black/70 mb-4 space-y-1">
          <p>🐾 {post.authorAnimalId}</p>
          <p>🎓 {post.branch}</p>
          <p>📅 {post.year}</p>
          <p>🧑 {post.gender}</p>
        </div>

        {/* 😀 Emoji Reactions */}
        <div className="flex flex-wrap gap-2 mb-5">
          {EMOJIS.map((emoji) => {
            const users = post.reactions?.[emoji] || [];
            const reacted = users.includes(userId);

            return (
              <button
                key={emoji}
                onClick={() => toggleReaction(emoji)}
                className={`
                  px-3 py-1.5 rounded-full text-sm
                  border transition-all
                  ${
                    reacted
                      ? "bg-black text-white scale-110"
                      : "bg-white/70 text-black hover:bg-white"
                  }
                `}
              >
                {emoji} {users.length > 0 && users.length}
              </button>
            );
          })}
        </div>

        {/* 🔘 Actions */}
        <div className="flex gap-4 justify-end">
          {/* 🔗 Share */}
          <button
            onClick={sharePost}
            className="
              px-4 py-2 rounded-lg
              bg-white/60 text-black
              border border-white/40
              transition-all duration-200
              hover:scale-105
              hover:bg-white/80
              hover:shadow-[0_0_12px_rgba(0,0,0,0.2)]
              active:scale-95
            "
          >
            🔗 Share
          </button>

          {/* 🚩 Report */}
          <button
            onClick={reportPost}
            disabled={alreadyReported}
            className={`
              px-4 py-2 rounded-lg
              border transition-all duration-200
              ${
                alreadyReported
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-500/80 text-white border-red-600 hover:scale-105 hover:bg-red-600 hover:shadow-[0_0_14px_rgba(255,0,0,0.4)]"
              }
              active:scale-95
            `}
          >
            {alreadyReported ? "Reported" : "🚩 Report"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;
