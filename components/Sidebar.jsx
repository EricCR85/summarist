"use client";

import { useState } from "react";
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

export default function Sidebar() {
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <aside
      className="w-64 min-h-screen h-screen bg-white border-r border-gray-200 p-6 flex flex-col sticky top-0 z-40"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: "24px",
      }}
    >
      <div className="w-full bg-white">
        <div style={{ marginBottom: "48px" }}>
          <img src="/assets/logo.png" alt="Summarist Logo" className="w-32" />
        </div>

        <nav className="flex flex-col gap-10">
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
            disabled
          />

          <SidebarLink
            href="/search"
            icon={<AiOutlineSearch />}
            label="Search"
            disabled
          />
        </nav>
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
          disabled
        />

        {user ? (
          <button
            onClick={signOut}
            className="flex items-center gap-4 text-gray-600 hover:text-black transition cursor-pointer"
          >
            <span className="text-xl">
              <AiOutlineLogout />
            </span>
            <span className="font-medium">Logout</span>
          </button>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-4 text-gray-600 hover:text-black transition cursor-pointer"
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

function SidebarLink({ href, icon, label, disabled = false }) {
  const baseClasses = "flex items-center gap-4 transition";

  if (disabled) {
    return (
      <div
        className={`${baseClasses} cursor-not-allowed text-gray-400 opacity-60`}
        title="Coming soon"
        aria-disabled="true"
      >
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} cursor-pointer text-gray-600 hover:text-black`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
