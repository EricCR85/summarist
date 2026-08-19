"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  auth,
  googleProvider,
  signInAnonymously,
  signInWithPopup,
} from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function AuthModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      onClose();
      router.push("/for-you");
    } catch (error) {
      alert("Guest Login Error: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
      router.push("/for-you");
    } catch (error) {
      alert("Google Login Error: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (error) {
      alert("Auth Error: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-[360px] rounded-md bg-white px-8 py-7 text-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-xl font-light text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="mb-5 text-lg font-bold text-[#032b41]">
          {isRegister ? "Create your account" : "Log in to Summarist"}
        </h2>

        <button
          onClick={handleGuestLogin}
          className="mb-3 flex h-10 w-full items-center justify-center gap-3 rounded-sm bg-[#2d4f9e] text-sm font-semibold text-white transition hover:bg-[#243f7e]"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-white text-[#2d4f9e]">
            👤
          </span>
          Login as a Guest
        </button>

        <div className="mb-3 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-xs text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mb-3 flex h-10 w-full items-center justify-center gap-3 rounded-sm bg-[#4285f4] text-sm font-semibold text-white transition hover:bg-[#2f6fd8]"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-white font-bold text-[#4285f4]">
            G
          </span>
          Login with Google
        </button>

        <div className="mb-3 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-xs text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full rounded-sm border border-gray-300 px-3 text-sm outline-none focus:border-[#2bd97c]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-full rounded-sm border border-gray-300 px-3 text-sm outline-none focus:border-[#2bd97c]"
          />

          <button
            type="submit"
            className="mt-1 h-10 w-full rounded-sm bg-[#2bd97c] text-sm font-bold text-[#032b41] transition hover:bg-[#20ba68]"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        {!isRegister && (
          <button className="mt-4 text-xs text-blue-500 hover:underline">
            Forgot your password?
          </button>
        )}

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="mt-3 block w-full text-xs text-blue-500 hover:underline"
        >
          {isRegister ? "Already have an account?" : "Don't have an account?"}
        </button>
      </div>
    </div>
  );
}
