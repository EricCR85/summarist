"use client";

import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

export default function AuthModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      console.log("Registering with:", email, password);
    } else {
      console.log("Logging in with:", email, password);
    }
    onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
          aria-label="Close modal"
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
            className="bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
          >
            {isRegister ? "Register" : "Log In"}
          </button>
        </form>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="mt-4 text-sm text-blue-500 w-full hover:underline"
        >
          {isRegister
            ? "Already have an account? Log In"
            : "Need an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

