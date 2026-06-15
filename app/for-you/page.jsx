"use client";
import React, { useState, useEffect } from "react";
import { getBooks } from "../../services/bookServices";
import Link from "next/link";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";
import SearchBar from "../../components/SearchBar";
import { getDeterministicRating, getDeterministicDuration } from "../bookUtils";

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
        loading && setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="bg-white min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-4">
        <h1 className="text-xl font-bold text-gray-800">For You</h1>
        <div className="w-full max-w-xs">
          <SearchBar />
        </div>
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-5 text-gray-900">
          Selected just for you
        </h2>
        {selectedBook && (
          <Link
            href={`/books/${selectedBook.id}`}
            className="flex flex-col md:flex-row bg-[#FDF5E6] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition p-6 md:p-8 gap-6 md:gap-10"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
              <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed italic">
                "{selectedBook.subTitle}"
              </p>
            </div>

            <div className="w-full md:w-1/2 flex items-center gap-6 order-1 md:order-2">
              <img
                src={selectedBook.imageLink}
                alt={selectedBook.title}
                className="w-20 h-28 md:w-24 md:h-36 object-cover shadow-md rounded-md"
              />
              <div className="flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-1">
                  {selectedBook.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-3">
                  {selectedBook.author}
                </p>
                <div className="flex items-center text-gray-600 text-xs md:text-sm gap-2 bg-white/60 backdrop-blur-sm self-start px-3 py-1 rounded-full shadow-xs">
                  <span className="bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] pl-0.5">
                    ▶
                  </span>
                  <span>3 mins 23 secs</span>
                </div>
              </div>
            </div>
          </Link>
        )}
      </section>

      <section className="mb-14">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recommended For You
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            We think you’ll like these
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {recommended.slice(0, 5).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Suggested Books</h2>
          <p className="text-gray-500 text-sm mb-6">Browse those books</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {suggested.slice(0, 5).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function BookCard({ book }) {
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
          <div className="absolute top-2 left-2">
            <span className="bg-neutral-900/90 text-white text-[9px] uppercase px-1.5 py-0.5 rounded font-bold">
              Premium
            </span>
          </div>
        )}
      </div>

      <div className="space-y-0.5">
        <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
          {book.title}
        </h4>
        <p className="text-xs text-gray-500 truncate">{book.author}</p>
        <p className="text-[11px] text-gray-400 line-clamp-2 leading-normal h-8">
          {book.subTitle}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-1">
          <AiOutlineClockCircle className="text-gray-400" />
          <span>{book.duration || getDeterministicDuration(book.id)}</span>

          <span className="text-gray-300 mx-0.5">|</span>

          <AiOutlineStar className="text-amber-500" />
          <span className="font-medium text-gray-700">
            {book.rating || getDeterministicRating(book.id)}
          </span>
        </div>
      </div>
    </Link>
  );
}
