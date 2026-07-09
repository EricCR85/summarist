"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import AuthModal from "../components/AuthModal";
import "./globals.css";
import { FontSizeProvider } from "../components/FontSizeContext";
import { UserProvider } from "./UserContext";

export default function RootLayout({ children }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const pathname = usePathname();

  const hideComponents = pathname === "/" || pathname === "/choose-plan" || pathname === "/login";

  return (
    <html lang="en">
      <body className="m-0 p-0">
        <UserProvider>
          <FontSizeProvider>
            {isAuthModalOpen && (
              <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
              />
            )}

          <div style={{ display: "flex", minHeight: "100vh" }}>
            {!hideComponents && (
              <div style={{ width: "256px", flexShrink: 0 }}>
                <Sidebar />
              </div>
            )}

            <main style={{ flex: 1, minWidth: 0, overflowX: "hidden" }}>{children}</main>
          </div>
        </FontSizeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
