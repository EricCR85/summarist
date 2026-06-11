"use client";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    // 1. Set up the delay timer (debounce)
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        console.log("Searching for:", query);
        // Replace this console.log with your actual API fetch call:
        // const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${query}`);
        // const data = await res.json();
      }
    }, 300); // Wait 300ms

    // 2. Clear the timer if the user types again before the 300ms is up
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="flex items-center gap-2 border-b pb-4 mb-6 w-full max-w-lg">
      <AiOutlineSearch className="text-xl text-gray-500" />
      <input
        type="text"
        placeholder="Search for books by title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full outline-none text-lg bg-transparent"
      />
    </div>
  );
}
