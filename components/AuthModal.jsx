"use client";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function AuthModal({ closeModal }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-[400px] relative shadow-2xl">
        {/* Close Button - Calls the prop function */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
          className="absolute top-4 right-4 text-2xl hover:text-red-500"
        >
          <AiOutlineClose className="pointer-events-none" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Log in to Summarist" : "Sign up to Summarist"}
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border-2 border-gray-300 p-3 mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border-2 border-gray-300 p-3 mb-6 rounded"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700">
          {isLogin ? "Login" : "Sign up"}
        </button>

        <p className="mt-6 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            className="text-blue-600 font-bold cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
}
