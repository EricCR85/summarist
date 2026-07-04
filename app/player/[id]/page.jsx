"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export default function PlayerPage() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      if (!id) return;
      try {
        const bookRef = doc(db, "books", id);
        const bookSnap = await getDoc(bookRef);

        if (bookSnap.exists()) {
          setBook(bookSnap.data());
        } else {
          console.error("Firebase found no document with ID:", id);
        }
      } catch (err) {
        console.error("Connection error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading)
    return <div className="p-20 text-center text-xl">Loading...</div>;
  if (!book)
    return (
      <div className="p-20 text-center text-xl">
        Book not found in database.
      </div>
    );

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col p-8">
      <div className="flex justify-between items-center mb-10">
        <button onClick={() => router.back()} className="text-2xl">
          <AiOutlineClose />
        </button>
        <h2 className="font-bold">Now Playing</h2>
        <div className="w-8"></div>
      </div>

      <div className="flex flex-col items-center flex-1 justify-center">
        <img
          src={book.imageLink}
          alt={book.title}
          className="w-64 h-64 rounded-lg mb-8 shadow-lg"
        />
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{book.author}</p>

        <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg">
          <audio controls className="w-full">
            <source src={book.audioUrl} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
}
