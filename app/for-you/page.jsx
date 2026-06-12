"use client";
import { useEffect, useState } from "react";
import { getBooks } from "../../services/bookServices";

export default function ForYouPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      try {
        // Fetch the data
        const data = await getBooks();

        // Ensure we are setting an array. If 'data' is the array itself,
        // this works. If it's nested (e.g., data.data), adjust accordingly.
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load books", error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  if (loading) {
    return <div className="p-8 text-xl">Loading library...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">Selected Books For You</h1>

      {/* Grid container */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex flex-col border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={book.imageURL}
              alt={book.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h3 className="font-bold text-lg mb-1">{book.title}</h3>
            <p className="text-gray-600 mb-2">{book.author}</p>
            <p className="text-sm text-gray-400 mt-auto">{book.subTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
