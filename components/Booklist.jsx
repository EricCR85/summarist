"use client";

import { useEffect, useState } from "react";
import { getBooks } from "../services/bookServices";

export default function BookList(url) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks(url) {
      try {
        setLoading(true); 
        const data = await getBooks(url); 
        setBooks(data); 
        setError(null); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    }
    loadBooks(url);
  }, []); 

  if (loading) return <div>Loading your books...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
}
