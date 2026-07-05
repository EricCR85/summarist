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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          width: "350px",
          textAlign: "center",
        }}
      >
        <button onClick={onClose} style={{ float: "right" }}>
          Close
        </button>

        <h2>{isRegister ? "Sign Up" : "Log In"}</h2>

        <button
          onClick={handleGuestLogin}
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: "10px",
            background: "#333",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Continue as Guest
        </button>

        <button
          onClick={handleGoogleLogin}
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: "10px",
            background: "#4285F4",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Login with Google
        </button>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              margin: "10px 0",
              padding: "8px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              margin: "10px 0",
              padding: "8px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {isRegister ? "Sign Up" : "Log In"}
          </button>
        </form>

        <button
          onClick={() => setIsRegister(!isRegister)}
          style={{
            marginTop: "10px",
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          {isRegister ? "Already have an account?" : "Need an account?"}
        </button>
      </div>
    </div>
  );
}

