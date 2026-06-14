"use client";

import React from "react";
import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineFileSearch,
  AiOutlineSetting,
  AiOutlineInfoCircle,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineBook,
} from "react-icons/ai";

export default function Sidebar() {
  const isLoggedIn = false;

  const handleLogout = () => {
    console.log("Logged out");
  };

  const openAuthModal = () => {
    console.log("Open Auth Modal");
  };

  return (
    <div className="w-64 h-screen border-r p-6">
      <nav className="flex flex-col gap-6">
        <Link href="/for-you" className="flex items-center gap-3">
          <AiOutlineHome /> For you
        </Link>
        <Link href="/library" className="flex items-center gap-3">
          <AiOutlineBook /> Library
        </Link>

        <div className="flex items-center gap-3 cursor-not-allowed opacity-50">
          <AiOutlineFileSearch /> Highlights
        </div>
        <div className="flex items-center gap-3 cursor-not-allowed opacity-50">
          <AiOutlineFileSearch /> Search
        </div>

        <Link href="/settings" className="flex items-center gap-3">
          <AiOutlineSetting /> Settings
        </Link>
        <div className="flex items-center gap-3 cursor-not-allowed opacity-50">
          <AiOutlineInfoCircle /> Help & Support
        </div>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="flex items-center gap-3">
            <AiOutlineLogout /> Logout
          </button>
        ) : (
          <button onClick={openAuthModal} className="flex items-center gap-3">
            <AiOutlineLogin /> Login
          </button>
        )}
      </nav>
    </div>
  );
}


