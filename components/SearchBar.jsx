"use client";

import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getBooks } from "../services/bookServices";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length <= 2) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await getBooks(query);
        setResults(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="flex flex-col w-full max-w-lg">
      <div className="flex items-center gap-2 border-b pb-4 mb-6">
        <AiOutlineSearch className="text-xl text-gray-500" />
        <input
          type="text"
          placeholder="Search for books by title or author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none text-lg bg-transparent"
        />
      </div>

      {isLoading && <p>Searching...</p>}
      {!isLoading && results.length === 0 && query.length > 2 && (
        <p>No books found.</p>
      )}

      <ul>
        {results.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
