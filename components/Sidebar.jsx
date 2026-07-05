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

export default function Sidebar() {
  const { user, signOut, login } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <aside className="w-64 min-h-screen h-screen bg-white border-r border-gray-200 p-6 flex flex-col sticky top-0">
      <div className="mb-10">
        <img src="/assets/logo.png" alt="Summarist Logo" className="w-32" />
      </div>

      <nav className="flex flex-col gap-6 mt-10">
        <SidebarLink href="/for-you" icon={<AiOutlineHome />} label="For You" />
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
        <SidebarLink href="/search" icon={<AiOutlineSearch />} label="Search" />
      </nav>

      <nav className="flex flex-col gap-6 border-t pt-6 mt-auto">
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

// "use client";
// import React from "react";
// import Link from "next/link";
// import {
//   AiOutlineHome,
//   AiOutlineBook,
//   AiOutlineHighlight,
//   AiOutlineSearch,
//   AiOutlineSetting,
//   AiOutlineQuestionCircle,
//   AiOutlineLogin,
// } from "react-icons/ai";

// import { useAuth } from "../hooks/useAuth";
// import AuthModal from "./AuthModal";

// export default function Sidebar() {
//   const { user, signOut} = useAuth();
//   const [isModalOpen, setIsModalOpen] = React.useState(false);

//   return (
//     <aside className="w-64 min-h-screen h-screen bg-white border-r border-gray-200 p-6 flex flex-col justify-between sticky top-0">
//       <div>
//         <div className="mb-10">
//           <img src="/assets/logo.png" alt="Summarist Logo" className="w-32" />
//         </div>

//         <nav className="flex flex-col gap-6 mt-10">
//           <SidebarLink
//             href="/for-you"
//             icon={<AiOutlineHome />}
//             label="For you"
//           />
//           <SidebarLink
//             href="/library"
//             icon={<AiOutlineBook />}
//             label="My Library"
//           />
//           <SidebarLink
//             href="/highlights"
//             icon={<AiOutlineHighlight />}
//             label="Highlights"
//           />
//           <SidebarLink
//             href="/search"
//             icon={<AiOutlineSearch />}
//             label="Search"
//           />
//         </nav>
//       </div>

//       <nav className="flex flex-col gap-6 border-t pt-6">
//         <SidebarLink
//           href="/settings"
//           icon={<AiOutlineSetting />}
//           label="Settings"
//         />
//         <SidebarLink
//           href="/help"
//           icon={<AiOutlineQuestionCircle />}
//           label="Help & Support"
//         />
//         <SidebarLink href="/login" icon={<AiOutlineLogin />} label="Login" />
//       </nav>
//     </aside>
//   );
// }

// function SidebarLink({ href, icon, label }) {
//   return (
//     <Link
//       href={href}
//       className="flex items-center gap-4 text-gray-600 hover:text-black transition"
//     >
//       <span className="text-xl">{icon}</span>
//       <span className="font-medium">{label}</span>
//     </Link>
//   );
// }
