"use client";

import { useEffect, useState } from "react";
import { getBooks } from "../services/bookServices";

export default function BookList() {
  // 1. STATE INITIALIZATION
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. THE EFFECT HOOK (The "Runner")
  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true); // Start loading spinner
        const data = await getBooks(); // Call your service
        setBooks(data); // Save the data
        setError(null); // Clear previous errors
      } catch (err) {
        setError(err.message); // Save the error message if something fails
      } finally {
        setLoading(false); // Stop loading regardless of success/fail
      }
    }
    loadBooks();
  }, []); // Empty array means this runs ONLY once when the page loads

  // 3. CONDITIONAL RENDERING (The "Switcher")
  if (loading) return <div>Loading your books...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  // 4. THE VIEW (The "Render")
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
}
