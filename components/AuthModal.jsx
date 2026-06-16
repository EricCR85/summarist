"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineClose, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInAnonymously,
  sendPasswordResetEmail,
} from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function AuthModal({ isOpen, onClose }) {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

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
      alert("Login/Register Error: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (error) {
      alert("Google Login Error: " + error.message);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      onClose();
      router.push("/for-you");
    } catch (error) {
      alert("Guest Login Error: " + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return alert("Please enter your email above first.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent to " + email);
    } catch (error) {
      alert("Reset Error: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
        >
          <AiOutlineClose />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Sign Up" : "Log In"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center border p-2 rounded focus-within:border-blue-500">
            <AiOutlineMail className="mr-2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>
          <div className="flex items-center border p-2 rounded focus-within:border-blue-500">
            <AiOutlineLock className="mr-2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
          >
            {isRegister ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={handleGoogleLogin}
            className="text-sm bg-red-500 text-white py-2 rounded"
          >
            Login with Google
          </button>
          <button
            onClick={handleGuestLogin}
            className="text-sm bg-gray-600 text-white py-2 rounded"
          >
            Continue as Guest
          </button>
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-500 underline mt-2"
          >
            Forgot Password?
          </button>
        </div>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="mt-4 w-full text-sm text-gray-600 hover:underline"
        >
          {isRegister
            ? "Already have an account? Log In"
            : "Need an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

