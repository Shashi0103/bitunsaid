import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import logo from "../assets/logo.png";
import AboutModal from "./AboutModal";

/* ----------------- RANDOM ANIMAL ID ----------------- */
const ADJECTIVES = [
  "sleepy",
  "happy",
  "curious",
  "chaotic",
  "gentle",
  "cosmic",
  "shy",
  "brave",
  "sunny",
  "midnight",
  "playful",
  "quiet",
  "clever",
  "dreamy",
  "soft",
];

const ANIMALS = [
  "panda",
  "fox",
  "otter",
  "koala",
  "owl",
  "cat",
  "dog",
  "turtle",
  "dolphin",
  "penguin",
  "hamster",
  "bunny",
  "axolotl",
  "seal",
  "wolf",
];

const generateAnimalId = () => {
  const adjective =
    ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal =
    ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const number = Math.floor(100 + Math.random() * 900); // 3-digit

  return `${adjective}_${animal}_${number}`;
};
/* ---------------------------------------------------- */

const YEARS = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
];

const GENDERS = ["Male", "Female"];

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [needsProfile, setNeedsProfile] = useState(false);
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");

  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setNeedsProfile(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) {
        setNeedsProfile(true);
      }
    });

    return () => unsub();
  }, []);

  const submit = async () => {
    if (!email || !password || loading) return;

    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setMessage(err.message);
    }

    setLoading(false);
  };

  const saveProfile = async () => {
    if (!branch || !year || !gender) {
      setMessage("Please complete all fields");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    setMessage("");

    try {
      await setDoc(doc(db, "users", user.uid), {
        userUID: user.uid,
        email: user.email,
        animalId: generateAnimalId(), // ✅ NEW RANDOM ID
        branch,
        year,
        gender,
        status: "active",
        createdAt: new Date(),
      });

      // Enter main app
      window.location.reload();
    } catch (err) {
      setMessage(err.message);
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    if (!email || loading) {
      setMessage("Please enter your email first");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent");
    } catch (err) {
      setMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-linear-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">

      {/* About icon */}
      <button
        onClick={() => setShowAbout(true)}
        className="fixed top-4 left-4 z-40 w-11 h-11 rounded-full bg-white/30 backdrop-blur-lg border border-white/30 flex items-center justify-center text-black text-lg hover:bg-white/50 transition"
      >
        ℹ️
      </button>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl px-8 py-10 text-black">

          <div className="flex flex-col items-center mb-4">
            <img src={logo} alt="BitUnsaid Logo" className="w-20 h-20 mb-2" />
            <h1 className="text-3xl font-bold">BitUnsaid</h1>
          </div>

          <p className="text-center text-sm mb-6 text-black/70">
            The Unsaid Voices of BIT Deoghar
          </p>

          {!needsProfile && (
            <>
              <input
                className="w-full mb-4 px-4 py-3 rounded-xl bg-white/60 border"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />

              <div className="relative mb-3">
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {isLogin && (
                <p
                  onClick={forgotPassword}
                  className={`text-sm text-right mb-4 ${
                    loading
                      ? "cursor-not-allowed text-black/40"
                      : "cursor-pointer"
                  }`}
                >
                  Forgot password?
                </p>
              )}

              <button
                onClick={submit}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-black text-white flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
              >
                {loading && (
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login"
                  : "Create Account"}
              </button>

              <p
                className="text-sm text-center cursor-pointer underline mt-4"
                onClick={() => {
                  if (!loading) {
                    setIsLogin(!isLogin);
                    setMessage("");
                  }
                }}
              >
                {isLogin
                  ? "New here? Create an account"
                  : "Already have an account? Login"}
              </p>
            </>
          )}

          {needsProfile && (
            <>
              <h2 className="text-lg font-semibold text-center mb-4">
                Complete your profile
              </h2>

              <input
                placeholder="Branch / Department"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full mb-3 px-4 py-3 rounded-xl bg-white/60 border"
              />

              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full mb-3 px-4 py-3 rounded-xl bg-white/60 border"
              >
                <option value="">Select Year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full mb-4 px-4 py-3 rounded-xl bg-white/60 border"
              >
                <option value="">Select Gender</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>

              <button
                onClick={saveProfile}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-black text-white flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
              >
                {loading && (
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {loading ? "Saving..." : "Save & Continue"}
              </button>
            </>
          )}

          {message && (
            <p className="text-sm text-center text-red-600 mt-4">
              {message}
            </p>
          )}
        </div>
      </div>

      <footer className="text-center text-xs font-bold text-white/70 py-4">
        Created by – Shashi Kumar Sahu (BTECH/60073/23)
      </footer>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}

export default AuthPage;
