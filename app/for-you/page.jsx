"use client";
import React, { useState, useEffect } from "react";
import { getBooks } from "../../services/bookServices";
import Link from "next/link";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";

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
    <div className="bg-white min-h-screen p-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Selected just for you</h2>
        {selectedBook && (
          <Link
            href={`/books/${selectedBook.id}`}
            className="flex bg-[#FDF5E6] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition p-8 gap-8"
          >
            <div className="w-1/2 flex flex-col justify-center">
              <p className="text-gray-700 text-lg font-medium">
                {selectedBook.subTitle}
              </p>
            </div>
            <div className="w-1/2 flex items-center gap-6">
              <img
                src={selectedBook.imageLink}
                alt={selectedBook.title}
                className="w-24 h-36 object-cover shadow-lg"
              />
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold">{selectedBook.title}</h3>
                <p className="text-gray-600 mb-2">{selectedBook.author}</p>
                <div className="flex items-center text-gray-500 text-sm gap-2">
                  <span className="bg-black text-white rounded-full p-1 text-[10px]">
                    ▶
                  </span>
                  {selectedBook.duration || "3 mins 23 secs"}
                </div>
              </div>
            </div>
          </Link>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">Recommended For You</h2>
        <p className="text-gray-500 mb-6">We think you’ll like these</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {recommended.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">Suggested Books</h2>
        <p className="text-gray-500 mb-6">Browse those books</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {suggested.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}

function BookCard({ book }) {
  return (
    <Link href={`/books/${book.id}`} className="group block">
      <div className="relative mb-3">
        <div className="aspect-[2/3] overflow-hidden rounded-lg">
          <img
            src={book.imageLink}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        {book.subscriptionRequired && (
          <div className="mt-2">
            <span className="bg-[#2D2D2D] text-white text-[10px] px-2 py-0.5 rounded font-bold">
              Premium
            </span>
          </div>
        )}
      </div>
      <h4 className="font-bold text-md leading-tight">{book.title}</h4>
      <p className="text-sm text-gray-500">{book.author}</p>
      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
        <AiOutlineClockCircle />
        <span>{book.duration || "0:00"}</span>
        <AiOutlineStar className="ml-2 text-yellow-500" />
        <span>{book.rating || "0.0"}</span>
      </div>
    </Link>
  );
}


