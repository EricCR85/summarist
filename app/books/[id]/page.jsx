"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db, auth } from "../../../firebase"; // Ensure this path correctly points to your firebase.js
import { collection, addDoc } from "firebase/firestore";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
        );
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error details:", error);
      }
    }
    fetchBook();
  }, [id]);

  const addToLibrary = async () => {
    if (!auth.currentUser) return alert("Please log in to save books!");

    try {
      // Writing to the same "library" collection your hook uses
      await addDoc(collection(db, "library"), {
        userId: auth.currentUser.uid,
        title: book.title,
        author: book.author,
        coverImage: book.imageLink,
        summary: book.summary,
      });
      alert("Book added to your library!");
    } catch (error) {
      console.error("Error adding book: ", error);
      alert("Error adding book: " + error.message);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-xl text-gray-600 mb-4">By {book.author}</p>
      <img src={book.imageLink} alt={book.title} className="w-64 rounded-lg shadow-md mb-6" />
      <p className="max-w-2xl">{book.summary}</p>

      <button
        onClick={addToLibrary}
        className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 trasition"
      >
        Add to Library
      </button>
    </div>
  );
}
