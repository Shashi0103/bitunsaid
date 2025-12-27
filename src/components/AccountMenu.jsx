import { useState } from "react";
import { auth } from "../firebase";
import AboutModal from "./AboutModal";

function AccountMenu({ userProfile }) {
  const [open, setOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      {/* LEFT SIDE ICONS */}
      <div className="fixed top-4 left-4 z-40 flex gap-3 items-center">

        {/* Account icon */}
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-full bg-white/30 backdrop-blur-lg border border-white/30 flex items-center justify-center text-black text-xl hover:bg-white/50 transition"
          title="Account"
        >
          👤
        </button>

        {/* About icon */}
        <button
          onClick={() => setShowAbout(true)}
          className="w-11 h-11 rounded-full bg-white/30 backdrop-blur-lg border border-white/30 flex items-center justify-center text-black text-lg hover:bg-white/50 transition"
          title="About BitUnsaid"
        >
          ℹ️
        </button>

        {/* Account dropdown */}
        {open && (
          <div className="absolute left-0 top-14 bg-white/60 backdrop-blur-xl rounded-xl p-4 text-sm text-black shadow-xl min-w-57.5 space-y-1">

            <p className="font-semibold">
              🐾 {userProfile.animalId}
            </p>

            {/* 🔴 EMAIL (PRIVATE, ONLY HERE) */}
            <p className="text-xs">
              📧 {auth.currentUser?.email}
            </p>

            <p className="text-xs">
              🎓 {userProfile.branch}
            </p>
            <p className="text-xs">
              📅 {userProfile.year}
            </p>
            <p className="text-xs mb-3">
              🧑 {userProfile.gender}
            </p>

            {/* Logout with hover */}
            <button
              onClick={() => auth.signOut()}
              className="
                w-full text-left text-sm
                px-3 py-2 rounded-lg
                text-red-600
                transition
                hover:bg-red-100
                hover:text-red-700
              "
            >
              Log out
            </button>
          </div>
        )}
      </div>

      {/* About modal */}
      {showAbout && (
        <AboutModal onClose={() => setShowAbout(false)} />
      )}
    </>
  );
}

export default AccountMenu;
