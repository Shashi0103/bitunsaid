import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import PostsListener from "./components/PostsListener";
import AccountMenu from "./components/AccountMenu";
import AuthPage from "./components/AuthPage";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (!u) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setProfile(null);
      } else {
        setProfile(snap.data());
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return null;

  // 🔐 Not logged in → Auth
  if (!user) {
    return <AuthPage />;
  }

  // 👤 Logged in but profile missing → force profile setup
  if (!profile) {
    return <AuthPage />;
  }

  // 🫧 Main app
  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <AccountMenu userProfile={profile} />
      <PostsListener userProfile={profile} />
    </div>
  );
}

export default App;
