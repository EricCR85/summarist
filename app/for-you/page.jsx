"use client";
import { useEffect, useState } from "react";
import { getBooks } from "../../services/bookServices";
import Link from "next/link";

export default function ForYouPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;

    async function loadBooks() {
      setLoading(true);
      try {
        const data = await getBooks();
        console.log(data);
        setBooks(Array.isArray(data) ? data : data?.data || []);
      } catch (error) {
        console.error("Failed to load books", error);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return <div className="p-8 text-xl">Loading library...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">Selected Books For You</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <Link
            href={`/books/${book.id}`}
            key={book.id}
            className="flex flex-col border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={book.imageLink}
              alt={book.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h3 className="font-bold text-lg mb-1">{book.title}</h3>
            <p className="text-gray-600 mb-2">{book.author}</p>
            <p className="text-sm text-gray-400 mt-auto">{book.subTitle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
