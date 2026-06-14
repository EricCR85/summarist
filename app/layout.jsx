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
        {isAuthModalOpen && (
          <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}  />
        )}

        <div style={{ display: "flex", minHeight: "100vh" }}>
          {!hideComponents && (
            <div style={{ width: "250px", flexShrink: 0 }}>
              <Sidebar />
            </div>
          )}

          <main style={{ flex: 1, padding: "20px" }}>
       

            {!hideComponents && <SearchBar />}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
