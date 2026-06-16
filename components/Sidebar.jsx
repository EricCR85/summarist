"use client";
import React from "react";
import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineBook,
  AiOutlineHighlight,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
  AiOutlineLogin,
} from "react-icons/ai";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen h-screen bg-white border-r border-gray-200 p-6 flex flex-col justify-between sticky top-0">
      <div>
        <div className="mb-10">
          <img src="/assets/logo.png" alt="Summarist Logo" className="w-32" />
        </div>

        <nav className="flex flex-col gap-6 mt-10">
          <SidebarLink
            href="/for-you"
            icon={<AiOutlineHome />}
            label="For you"
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
      </div>

      <nav className="flex flex-col gap-6 border-t pt-6">
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
        <SidebarLink href="/login" icon={<AiOutlineLogin />} label="Login" />
      </nav>
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


