"use client";

import { useState, useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getBooks } from "../services/bookServices";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await getBooks(`/api/books?search=${query}`);
        setResults(data);
        setActiveIndex(-1);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleKeyDown = (e) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      window.location.href = `/books/${results[activeIndex].id}`;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-lg">
      <div className="flex items-center gap-2 border-b pb-4 mb-6">
        <AiOutlineSearch className="text-xl text-gray-500" />
        <input
          type="text"
          placeholder="Search for books by title or author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-results-list"
          aria-autocomplete="list"
          className="w-full outline-none text-lg bg-transparent"
        />
      </div>

      {isLoading && <p className="text-gray-500 text-sm">Searching...</p>}

      {!isLoading && results.length === 0 && query.length > 0 && (
        <p className="text-gray-500 text-sm">No books found.</p>
      )}

      {results.length > 0 && (
        <ul
          id="search-results-list"
          role="listbox"
          className="absolute z-50 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg mt-[-15px] overflow-hidden"
        >
          {results.map((book, index) => (
            <li
              key={book.id}
              role="option"
              aria-selected={index === activeIndex}
              className={`${index === activeIndex ? "bg-gray-200" : ""} hover:bg-gray-100`}
            >
              <Link href={`/books/${book.id}`} className="block px-4 py-2">
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

