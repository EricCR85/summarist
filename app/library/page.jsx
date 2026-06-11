"use client";

import { useLibrary } from "../../hooks/useLibrary";

export default function LibraryPage() {
  const { library, loading } = useLibrary();

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl animate-pulse">Loading your collection...</p>
      </div>
    );
  }

  // 2. Empty State
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

  // 3. Library Grid View
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Library</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {library.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-4 shadow-lg transition-all hover:shadow-xl"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg truncate">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
