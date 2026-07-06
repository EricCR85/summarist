"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineBook,
  AiOutlineHighlight,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";
import AuthModal from "./AuthModal";
import { useFontSize } from "./FontSizeContext";

export default function Sidebar() {
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { fontSize, setFontSize } = useFontSize();

  const isActive = (size) => fontSize === size;

  return (
    <aside
      className="w-64 min-h-screen h-screen bg-white border-r border-gray-200 p-6 flex flex-col sticky top-0 z-40"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: "90px",
      }}
    >
      <div className="h-full w-64 bg-white">
        <div style={{ marginBottom: "48px" }}>
          <img src="/assets/logo.png" alt="Summarist Logo" className="w-32 " />
        </div>

        <nav className="flex flex-col gap-6">
          <SidebarLink
            href="/for-you"
            icon={<AiOutlineHome />}
            label="For You"
          />
          <SidebarLink
            href="/library"
            icon={<AiOutlineBook />}
            label="My Library"
          />
          <SidebarLink
            href="/highlights"
            icon={<AiOutlineHighlight />}
            label="Highlights"
          />
          <SidebarLink
            href="/search"
            icon={<AiOutlineSearch />}
            label="Search"
          />
        </nav>
        <div className="flex gap-3 mt-8 mb-4">
          <div
            className={`px-1 ${fontSize === 14 ? `border-b-2 border-blue-500` : ``}`}
          >
            <button onClick={() => setFontSize(14)} className="text-sm">
              Aa{" "}
            </button>
          </div>
          <div
            className={`px-1 ${fontSize === 18 ? `border-b-2 border-blue-500` : ``}`}
          >
            <button onClick={() => setFontSize(18)} className="text-sm">
              Aa{" "}
            </button>
          </div>
          <div
            className={`px-1 ${fontSize === 22 ? `border-b-2 border-blue-500` : ``}`}
          >
            <button onClick={() => setFontSize(22)} className="text-sm">
              Aa{" "}
            </button>
          </div>
          <div
            className={`px-1 ${fontSize === 26 ? `border-b-2 border-blue-500` : ``}`}
          >
            <button onClick={() => setFontSize(26)} className="text-sm">
              Aa{" "}
            </button>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-6">
        <SidebarLink
          href="/settings"
          icon={<AiOutlineSetting />}
          label="Settings"
        />

        <SidebarLink
          href="/help"
          icon={<AiOutlineQuestionCircle />}
          label="Help & Support"
        />

        {user ? (
          <button
            onClick={signOut}
            className="flex items-center gap-4 text-gray-600 hover:text-black transition"
          >
            <span className="text-xl">
              <AiOutlineLogout />
            </span>
            <span className="font-medium">Logout</span>
          </button>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-4 text-gray-600 hover:text-black transition"
          >
            <span className="text-xl">
              <AiOutlineLogin />
            </span>
            <span className="font-medium">Login</span>
          </button>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </aside>
  );
}

function SidebarLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 text-gray-600 hover:text-black transition"
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
