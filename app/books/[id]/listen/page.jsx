  "use client";
  import { useState, useEffect, use } from "react";
  import { getBooks } from "../../../../services/bookServices";
  import { useParams } from "next/navigation";

    export default function ListenPage() {
    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      try {
        const books = await Promise.all(
          ["selected", "recommended", "suggested"].map((status) =>
            getBooks(`/api/books?status=${status}`),
          ),
        );
        const foundBook = books.flat().find((book) => book.id === id);
        setBook(foundBook);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBook();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading book...</div>;
  if (!book) return <div className="p-10 text-center">Book not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
      <p className="text-lg text-gray-700 mb-4">{book.description}</p>
      <p className="text-gray-600">Author: {book.author}</p>
    </div>
  );
}