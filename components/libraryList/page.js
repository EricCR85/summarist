"use client";
import { useEffect, useStatee } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import SearchBar from "../SearchBar";

export default function LibraryList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const booksCollection = collection(db, "books");

    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <div key={book.id} className="p-4 border rounded shadow">
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
