"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ForYouPage() {
  const [books, setBooks] = useState([]);

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

  console.log(books);

  return (
    <div className="container">
      <h1>Recommended Books</h1>
      <div className="books-grid">
        {books && books.length > 0 ? (
          books.map((book) => (
            <Link href={`/books/${book.id}`}>
              <div key={book.id} className="book-card">
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
