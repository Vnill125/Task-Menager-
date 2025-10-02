"use client";

import { useState, useEffect } from "react";
import { auth, provider } from "../lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

export default function LoginButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      {user ? (
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL || "/avatar.png"}
            alt="user avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-700 dark:text-gray-300">{user.displayName}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Login with Google
        </button>
      )}
    </div>
  );
}
