import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

import BubbleCanvas from "./BubbleCanvas";
import MessageModal from "./MessageModal";
import AllMessagesPopup from "./AllMessagesPopup";
import AllMessagesButton from "./AllMessagesButton";
import TrendingPopup from "./TrendingPopup";
import TrendingButton from "./TrendingButton";
import PostInput from "./PostInput";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const REPORT_LIMIT = 10;

function PostsListener({ userProfile }) {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showTrending, setShowTrending] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("hidden", "==", false)
    );

    const unsub = onSnapshot(q, (snap) => {
      const now = Date.now();

      const list = snap.docs
        .map((d) => ({
          id: d.id,
          ...d.data(),
        }))
        .filter((post) => {
          // ❌ No timestamp → hide
          if (!post.createdAt) return false;

          // ❌ Older than 7 days → hide
          const createdMs = post.createdAt.toMillis();
          if (now - createdMs >= SEVEN_DAYS_MS) return false;

          // ❌ Reached report limit → hide
          if (
            Array.isArray(post.reports) &&
            post.reports.length >= REPORT_LIMIT
          ) {
            return false;
          }

          return true;
        });

      setPosts(list);
    });

    return () => unsub();
  }, []);

  const selectedPost = posts.find(
    (p) => p.id === selectedPostId
  );

  return (
    <>
      {/* 🫧 Floating bubbles */}
      <BubbleCanvas
        posts={posts}
        onBubbleClick={(id) => setSelectedPostId(id)}
        paused={!!selectedPostId}
      />

      {/* 🔥 Trending */}
      <TrendingButton onClick={() => setShowTrending(true)} />

      {showTrending && (
        <TrendingPopup
          posts={posts}
          onSelect={(id) => {
            setSelectedPostId(id);
            setShowTrending(false);
          }}
          onClose={() => setShowTrending(false)}
        />
      )}

      {/* 💬 All Messages */}
      <AllMessagesButton onClick={() => setShowAll(true)} />

      {showAll && (
        <AllMessagesPopup
          posts={posts}
          onSelect={(id) => {
            setSelectedPostId(id);
            setShowAll(false);
          }}
          onClose={() => setShowAll(false)}
        />
      )}

      {/* 📄 Message modal */}
      {selectedPost && (
        <MessageModal
          post={selectedPost}
          onClose={() => setSelectedPostId(null)}
        />
      )}

      {/* ✍️ Post input */}
      <PostInput userProfile={userProfile} />
    </>
  );
}

export default PostsListener;
