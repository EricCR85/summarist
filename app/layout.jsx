"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import AuthModal from "../components/AuthModal";
import "./globals.css";

export default function RootLayout({ children }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const pathname = usePathname();

  const hideComponents = pathname === "/" || pathname === "/choose-plan";

  return (
    <html lang="en">
      <body className="m-0 p-0">
        {/* The Modal Overlay - Shown when isAuthModalOpen is true */}
        {isAuthModalOpen && (
          <AuthModal closeModal={() => setIsAuthModalOpen(false)} />
        )}

        <div style={{ display: "flex", minHeight: "100vh" }}>
          {!hideComponents && (
            <div style={{ width: "250px", flexShrink: 0 }}>
              <Sidebar />
            </div>
          )}

          <main style={{ flex: 1, padding: "20px" }}>
            {/* Example: A button to test opening the modal */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 mb-4 rounded"
            >
              Test Login Modal
            </button>

            {!hideComponents && <SearchBar />}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
