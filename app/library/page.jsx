"use client";
import React from "react";
import { useLibrary } from "../../hooks/useLibrary";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";

export default function LibraryPage() {
  const { library, loading, removeFromLibrary } = useLibrary();

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
        <p className="text-gray-500"></p>
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
        {library.map((book, index) => (
          <div
            key={`${book.id || book.bookId}-${index}`}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
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
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />
            <h2 className="text-lg font-bold">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.author}</p>
            <button
              onClick={() => removeFromLibrary(book.id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
