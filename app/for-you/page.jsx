"use client";

import React, { useState, useEffect } from "react";
import { getBooks } from "../../services/bookServices";
import Link from "next/link";

export default function ForYouPage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const selected = await getBooks("/api/books?status=selected");
        const recs = await getBooks("/api/books?status=recommended");
        const sugg = await getBooks("/api/books?status=suggested");

        setSelectedBook(selected && selected.length > 0 ? selected[0] : null);
        setRecommended(recs || []);
        setSuggested(sugg || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Selected Book For You</h2>
          {selectedBook && (
            <Link
              href={`/books/${selectedBook.id}`}
              className="flex gap-8 border p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition"
            >
              <img
                src={selectedBook.image}
                alt={selectedBook.title}
                className="w-40 h-60 object-cover rounded-lg shadow-md"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-2">
                  {selectedBook.title}
                </h3>
                <p className="text-xl text-gray-600 mb-4">
                  {selectedBook.author}
                </p>
                <div className="w-16 h-1 bg-yellow-500 mb-4"></div>
                <p className="text-gray-500 max-w-lg">
                  {selectedBook.subTitle}
                </p>
              </div>
            </Link>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {recommended.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <div className="relative aspect-[2/3] mb-4 overflow-hidden rounded-lg">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {book.subscriptionRequired && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] px-2 py-1 rounded font-black uppercase">
                      Premium
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-lg leading-tight truncate">
                  {book.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{book.author}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Suggested For You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {suggested.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <div className="aspect-[2/3] mb-4 overflow-hidden rounded-lg">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg leading-tight truncate">
                  {book.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{book.author}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


