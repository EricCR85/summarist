"use client";
import React, { useState, useEffect, use } from "react";
import { createPortal } from "react-dom";
import ReactAudioPlayer from "react-audio-player";
import { getBooks } from "../../../../services/bookServices";

export default function ListenPage({ params }) {
  const { id } = use(params);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // document.body only exists client-side
  }, []);

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

  const player = (
    <div className="fixed bottom-0 right-0 w-full bg-[#032b41] text-white p-4 flex items-center gap-4 shadow-lg z-50">
      <img
        src={book.imageLink}
        alt={book.title}
        className="w-12 h-16 object-cover"
      />
      <div className="flex-1">
        <h4 className="font-bold text-sm">{book.title}</h4>
        <p className="text-xs text-gray-300">{book.author}</p>
      </div>
      <div className="w-full max-w-lg">
        <ReactAudioPlayer src={book.audioLink} controls className="w-full" />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-8 py-10 pb-32">
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-600 mb-8">{book.author}</p>
      <h2 className="text-2xl font-bold mb-4">Listen Summary</h2>
      <p className="text-gray-700 leading-8 mb-10 pd-10" style={{ paddingBottom: "60px"}}>
        {book.summary || "No book text available."}
      </p>
      {mounted && createPortal(player, document.body)}
    </div>
  );
}







