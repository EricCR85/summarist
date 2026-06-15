"use client";
import React, { useEffect, useState } from "react";
import { getBooks } from "../services/bookServices";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";
import {
  getDeterministicRating,
  getDeterministicDuration,
} from "../app/bookUtils";

export default function BookList({ url }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      try {
        const data = await getBooks("/api/books");
        setBooks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [url]);

  if (loading) return <div>Loading your books...</div>;

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.title}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <AiOutlineClockCircle />
              {book.duration || getDeterministicDuration(book.id)}
            </span>
            <span className="flex items-cneter gap-1">
              <AiOutlineStar /> {book.rating || getDeterministicRating(book.id)}
            </span>
          </div>
        </li>
      ))}
      ;
    </ul>
  );
}


