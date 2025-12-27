import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { generateAnimalId } from "../utils/animalId";

function ProfileSetup({ onComplete }) {
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const animalId = generateAnimalId();

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      animalId,
      branch,
      year,
      gender,
      status: "active",
      createdAt: new Date(),
    });

    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-2xl w-96"
      >
        <h2 className="text-xl font-bold mb-4">
          Set up your identity
        </h2>

        <input
          placeholder="Branch / Department"
          className="w-full p-2 mb-3 rounded text-black"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
        />

        <select
          className="w-full p-2 mb-3 rounded text-black"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        >
          <option value="">Select Year</option>
          <option>First Year</option>
          <option>Second Year</option>
          <option>Third Year</option>
          <option>Fourth Year</option>
        </select>

        <select
          className="w-full p-2 mb-4 rounded text-black"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
          <option>Prefer not to say</option>
        </select>

        <button className="w-full bg-indigo-600 py-2 rounded font-semibold">
          Continue
        </button>
      </form>
    </div>
  );
}

export default ProfileSetup;
