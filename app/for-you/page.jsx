"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ForYouPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
      );
      const data = await response.json();
      setBooks(data);
    }
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="search-container">
      <h1>Recommended Books</h1>

      <input className="search-input"
        type="text"
        placeholder="Search for a book..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px", width: "300px", }}
      />
      <div className="books-grid">
        {books && books.length > 0 ? (
          books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <div className="book-card">
                <img
                  src={book.imageLink}
                  alt={book.title}
                  style={{ width: "150px" }}
                />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading books... or no books found.</p>
        )}
      </div>
    </div>
  );
}
