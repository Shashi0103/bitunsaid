import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const MAX_POSTS_PER_DAY = 5;

function PostInput({ userProfile }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(MAX_POSTS_PER_DAY);

  useEffect(() => {
    const checkLimit = async () => {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const q = query(
        collection(db, "posts"),
        where("authorUID", "==", auth.currentUser.uid),
        where("createdAt", ">=", startOfDay)
      );

      const snap = await getDocs(q);
      setRemaining(MAX_POSTS_PER_DAY - snap.size);
    };

    checkLimit();
  }, []);

  const submitPost = async () => {
    if (!text.trim() || loading || remaining <= 0) return;

    setLoading(true);

    await addDoc(collection(db, "posts"), {
      content: text.trim(),
      previewText: text.trim().slice(0, 40),
      authorAnimalId: userProfile.animalId,
      authorUID: auth.currentUser.uid,
      branch: userProfile.branch,
      year: userProfile.year,
      gender: userProfile.gender,
      reactions: {},
      reports: [],
      hidden: false,
      openedBy: [],
      createdAt: serverTimestamp(),
    });

    setText("");
    setRemaining((r) => r - 1);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-3xl">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-white/30 backdrop-blur-xl border border-white/20 rounded-full px-5 py-3 shadow-lg">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something unsaid…"
            disabled={remaining <= 0}
            className="flex-1 bg-transparent outline-none text-black placeholder-black/60 disabled:opacity-50"
          />

          {/* Send button */}
          <button
            onClick={submitPost}
            disabled={remaining <= 0 || loading}
            className="
              px-4 py-1.5 rounded-full
              bg-black/70 text-white
              transition-all duration-300
              hover:scale-110
              hover:bg-black
              hover:shadow-[0_0_14px_rgba(0,0,0,0.4)]
              active:scale-95
              disabled:opacity-40
              disabled:hover:scale-100
              disabled:hover:shadow-none
            "
          >
            Send
          </button>
        </div>

        {/* ✅ Proper place for limit message */}
        {remaining <= 0 && (
          <p className="text-xs text-red-600 text-center">
            Daily post limit reached (5/day)
          </p>
        )}
      </div>
    </div>
  );
}

export default PostInput;
