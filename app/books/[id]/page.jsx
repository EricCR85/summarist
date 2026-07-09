"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useLibrary } from "../../../hooks/useLibrary";
import { auth } from "../../../firebase";
import { getBooks } from "../../../services/bookServices";
import {
  AiOutlineStar,
  AiOutlineClockCircle,
  AiOutlineAudio,
  AiOutlineBulb,
  AiOutlineRead,
} from "react-icons/ai";

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { library, addToLibrary, removeFromLibrary } = useLibrary();
  const [showPlayer, setShowPlayer] = useState(false);

  const savedBook = library.find((b) => b.bookId === id);

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      try {
        const books = await Promise.all(
          ["selected", "recommended", "suggested"].map((status) =>
            getBooks(`/api/books?status=${status}`),
          ),
        );
        const foundBook = books.flat().find((book) => book.id === id);
        setBook(foundBook);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBook();
  }, [id]);

  if (loading)
    return <div className="p-10 text-center">Loading book details...</div>;
  if (!book) return <div className="p-10 text-center">Book not found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10 lg:py-14">
      <div className="flex flex-col lg:flex-row justify-betwee gap-10 lg:gap-16 border-b border-gray-200 pb-10 mb-10">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl font-bold text-[#032b41] mb-3">
            {book.title}
          </h1>

          <p className="text-lg font-semibold text-[#032b41] mb-3">
            {book.author}
          </p>

          <p className="text-xl text-gray-600 mb-6">{book.subTitle}</p>

          <div className="grid grid-cols-2 gap-y-4 gap-x-12 border-t border-b border-gray-200 py-5 mb-6 text-sm text-[#032b41]">
            <span className="flex items-center gap-2">
              <AiOutlineStar /> {book.rating || "4.4"} rating
            </span>

            <span className="flex items-center gap-2">
              <AiOutlineClockCircle /> {book.duration || "0:00"}
            </span>

            <span className="flex items-center gap-2">
              <AiOutlineAudio /> Audio & Text
            </span>

            <span className="flex items-center gap-2">
              <AiOutlineBulb /> {book.keyIdeas || "8"} Key ideas
            </span>
          </div>

          <div className="flex gap-4 mb-6">
            <Link href={`/books/${book.id}/read`}>
              <button className="bg-[#032b41] text-white w-[150px] h-[48px] rounded flex items-center justify-center gap-2 font-semibold">
                <AiOutlineRead /> Read
              </button>
            </Link>
            <Link href={`/books/${book.id}/read`}>
              <button className="bg-[#032b41] text-white w-[150px] h-[48px] rounded flex items-center justify-center gap-2 font-semibold">
                <AiOutlineAudio /> Listen
              </button>
            </Link>
          </div>

          <button
            onClick={() => {
              if (savedBook) {
                removeFromLibrary(savedBook.id);
              } else {
                addToLibrary({ ...book, bookId: book.id });
              }
            }}
            className="text-blue-600 font-semibold flex items-center gap-2 mb-2"
          >
            <AiOutlineStar />
            {savedBook ? "Saved in my library" : "Add title to My Library"}
          </button>
        </div>
        {showPlayer && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50 max-w-xl">
            <p className="font-semibold mb-3">{book.title}</p>
            <audio controls className="w-full">
              <source src={book.audioLink} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div className="w-full lg:w-[300px] flex justify-center lg:justify-end ">
          <img
            src={book.imageLink}
            alt={book.title}
            className="w-[260px] h-auto shadow-2xl rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold text-[#032b41] mb-5">
          What's it about?
        </h2>

        <div className="flex gap-3 flex-wrap mb-6">
          {book.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-[#032b41] px-5 py-3 rounded text-sm font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-700 leading-8 mb-10">
          {book.bookDescription || "No description provided."}
        </p>

        <h3 className="text-2xl font-bold text-[#032b41] mb-4">
          About the author
        </h3>

        <p className="text-gray-700 leading-8">
          {book.authorDescription || "Author details not available."}
        </p>
      </div>
    </div>
  );
}
