"use client";
import React from "react";
import { useLibrary } from "../../hooks/useLibrary";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";

export default function LibraryPage() {
  const { library, loading } = useLibrary();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl animate-pulse">Loading your collection...</p>
      </div>
    );
  }

  if (library.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">My Library</h1>
        <p className="text-gray-500">
          Your library is empty. Go find some books to add!
        </p>
      </div>
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
        {library.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-4 shadow-lg transition-all hover:shadow-xl"
          >
            <Link href={`/books/${book.id}`}>
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-lg truncate">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


