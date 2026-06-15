"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useLibrary } from "../../../hooks/useLibrary";
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
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex gap-12 mb-12">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{book.author}</p>
          <p className="text-gray-700 mb-6">{book.subTitle}</p>

          <div className="flex items-center gap-6 text-gray-500 mb-4">
            <span className="flex items-center gap-2">
              <AiOutlineStar /> {book.rating || "4.4"}
            </span>
            <span className="flex items-center gap-2">
              <AiOutlineClockCircle /> {book.duration || "0:00"}
            </span>
          </div>

          <div className="flex items-center gap-6 text-gray-500 mb-8">
            <span className="flex items-center gap-2">
              <AiOutlineAudio /> Audio & Text
            </span>
            <span className="flex items-center gap-2">
              <AiOutlineBulb /> {book.keyIdeas || "8"} Key ideas
            </span>
          </div>

          <div className="flex gap-4 mb-6">
            <button className="bg-blue-600 text-white px-8 py-3 rounded font-bold flex items-center gap-2">
              <AiOutlineRead /> Read
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded font-bold flex items-center gap-2">
              <AiOutlineAudio /> Listen
            </button>
          </div>

          <button
            onClick={() =>
              savedBook
                ? removeFromLibrary(savedBook.id)
                : addToLibrary({ ...book, bookId: book.id })
            }
            className="text-blue-600 font-semibold flex items-center gap-2"
          >
            className=
            {`$savedBook ? "text-green-600" : "text-blue-600"} font-semibold flex items-center gap-2`}
            <span className="text-xl">{savedBook ? "!" : "^"}</span>
            {savedBook ? "Saved in my library" : "Add to My library"}
          </button>
        </div>

        <div className="w-72">
          <img
            src={book.imageLink}
            alt={book.title}
            className="w-full shadow-2xl rounded-lg"
          />
        </div>
      </div>
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">What's it about?</h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          {book.bookDescription || "No description provided."}
        </p>

        <h3 className="text-2xl font-bold mb-6">About the author</h3>
        <p className="text-gray-600 leading-relaxed">
          {book.authorDescription || "Author details not available."}
        </p>
      </div>
    </div>
  );
}
