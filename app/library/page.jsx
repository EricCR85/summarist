"use client";
import { useRouter } from "next/navigation";
// import { useUser } from "../UserContext";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useLibrary } from "../../hooks/useLibrary";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";
import AuthModal from "../../components/AuthModal";

export default function LibraryPage() {
  const { user, loading: authLoading } = useAuth();
  const { library, loading, removeFromLibrary } = useLibrary();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl animate-pulse">Loading your collection...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="settings">
        <h1 className="settings__title">My Library</h1>

        <div className="settings__login">
          <img
            src="/assets/login.png"
            alt="Login required"
            className="settings__login--img"
          />

          <p className="settings__login--text">
            Log in to your account to see your details.
          </p>

          <button
            className="settings__login--btn"
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </button>
        </div>

        {isModalOpen && (
          <AuthModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </main>
    );
  }

  return (
    <div className="bg-white min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-4">
        <h1 className="text-xl font-bold text-gray-800">For You</h1>
        <div className="w-full max-w-xs">
          <SearchBar />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8">My Library</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {library.map(
          (book, index) => (
            console.log(book),
            (
              <Link
                href={`/books/${book.bookId || book.id}`}
                key={book.id}
                className="block cursor-pointer hover:shadow-lg transition-shadow rounded-lg overflow-hidden border"
              >
                <img
                  src={
                    book.imageLink ||
                    "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={book.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150?text=No+Image";
                  }}
                />
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromLibrary(book.id);
                  }}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </Link>
            )
          ),
        )}
      </div>
    </div>
  );
}
