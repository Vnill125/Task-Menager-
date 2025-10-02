"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import Board from "../components/Board";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {!user ? (
          <div className="flex flex-col items-center justify-center mt-28 gap-6">
            <h1 className="text-4xl font-extrabold">🚀 Kanban Board</h1>
            <p className="text-gray-400 max-w-xl text-center">
              Simple kanban app — keep tasks, drag them between columns and
              collaborate via Firebase.
            </p>

            <button
              onClick={() => signInWithPopup(auth, provider)}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] transition"
            >
              Sign in with Google
            </button>

            <p className="text-sm text-gray-500 mt-6">
              (You need to sign in to access your board)
            </p>
          </div>
        ) : (
          <Board />
        )}
      </div>
    </main>
  );
}
