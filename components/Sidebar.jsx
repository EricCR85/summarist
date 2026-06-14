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
    <div className="w-64 h-screen border-r p-6 sticky top-0 bg-gray-50 flex flex-col justify-between">
      <figure className="mb-16">
        <img src="/assets/logo.png" alt="Summarist Logo"  className="w-32" />
      </figure>
      <nav className="flex flex-col gap-6 flex-grow py-10">
        <Link href="/for-you" className="flex items-center gap-3 font-medium text-gray-700 hover:text-black transition-colors">
          <AiOutlineHome size={20} /> For you
        </Link>
        <Link href="/library" className="flex items-center gap-3 font-medium text-gray-700 hover:text-black transition-colors">
          <AiOutlineBook size={20} /> Library
        </Link>

        <div className="flex items-center gap-3 cursor-not-allowed opacity-50">
          <AiOutlineFileSearch size={20} /> Highlights
        </div>
        <div className="flex items-center gap-3 cursor-not-allowed opacity-50">
          <AiOutlineFileSearch size={20} /> Search
        </div>

        <Link href="/settings" className="flex items-center gap-3">
          <AiOutlineSetting size={20} /> Settings
        </Link>
        <div className="flex items-center gap-3 cursor-not-allowed opacity-50">
          <AiOutlineInfoCircle size={20} /> Help & Support
        </div>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="flex items-center gap-3 font-medium text-gray-700 hover:text-black transition-colors">
            <AiOutlineLogout size={20} /> Logout
          </button>
        ) : (
          <button onClick={openAuthModal} className="flex items-center gap-3 font-medium text-gray-700 haver:text-black transition-colors">
            <AiOutlineLogin size={20} /> Login
          </button>
        )}
      </nav>
    </div>
  );
}


