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
    <div className="search">
      <div className="search__input--wrapper">
        <input
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search__input"
        />

        <button className="search__button" type="button">
          <AiOutlineSearch />
        </button>
      </div>

      {query.length > 0 && (
        <div className="search__dropdown">
          {isLoading && <p>Searching...</p>}

          {!isLoading && results.length === 0 && <p>No books found.</p>}

          {!isLoading &&
            results.map((book) => <p key={book.id}>{book.title}</p>)}
        </div>
      )}
    </div>
  );
}
