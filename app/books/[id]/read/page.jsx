  "use client";
import { useState, useEffect } from "react";
import { getBooks } from "../../../../services/bookServices";
import { useParams } from "next/navigation";
import ReactAudioPlayer from "react-audio-player";

export default function ReadPage() {
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
    <div className="max-w-4xl mx-auto px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-600 mb-8">{book.author}</p>

      <h2 className="text-2xl font-bold mb-4">Read Summary</h2>

      <p className="text-gray-700 leading-8 mb-10">
        {book.summary || "No book text available."}
      </p>

    <div className="fixed bottom-0 left-0 right-0 bg-[#032b41] text-white p-4 flex items-center gap-4">
      <img src={book.cover} className="w-12 h-16 object-cover" />
      <div>
        <h4 className="font-bold">{book.title}</h4>
        <p className="text-sm text-gray-300">{book.author}</p>
      </div>

      <ReactAudioPlayer
        src={book.audioLink}
        controls
        className="w-full"
      />
    </div>
    </div>
  );
}


      
