"use client";

import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineBook,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
} from "react-icons/ai";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r p-6 hidden md:block">
      <div className="text-2xl font-bold mb-10">Summarist</div>

      <nav className="space-y-6">
        <Link
          href="/for-you"
          className="flex items-center gap-3 hover:text-blue-600"
        >
          <AiOutlineHome /> For you
        </Link>
        <Link
          href="/library"
          className="flex items-center gap-3 hover:text-blue-600"
        >
          <AiOutlineBook /> Library
        </Link>
        <div className="flex items-center gap-3 text-gray-400 cursor-not-allowed">
          <AiOutlineBook /> Highlights
        </div>
        <div className="flex items-center gap-3 text-gray-400 cursor-not-allowed">
          <AiOutlineSearch /> Search
        </div>
        <Link
          href="/settings"
          className="flex items-center gap-3 hover:text-blue-600"
        >
          <AiOutlineSetting /> Settings
        </Link>
        <div className="flex items-center gap-3 text-gray-400 cursor-not-allowed">
          <AiOutlineQuestionCircle /> Help & Support
        </div>
      </nav>
    </aside>
  );
}
