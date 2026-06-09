"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db, auth } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";

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
        console.error("Error fetching book:", error);
      }
    }
    fetchBook();
  }, [id]);

  const addToLibrary = async () => {
    if (!auth.currentUser) return alert("please log in to save books!");

    try {
        await setDoc(doc(db, "users", auth.currentUser.uid, "Library", id), {
            title: book.title,
            author: book.author,
            image: book.imageLink,
            summary: book.summary
        });
        alert("Book added to your library!");
    } catch (error) {
        alert ("Error adding book: " + error.message);
    }
        
  }

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="book-details-container" style={{ padding: '20px' }}>
      <h1>{book.title}</h1>
      <h3>{book.author}</h3>
      <img src={book.imageLink} alt={book.title} style={{ width: "200px" }} />
      <p>{book.summary}</p>

      <button
      onClick={addToLibrary}
      style={{ padding: "10px 20px", cursor: 'pointer', marginTop: '20px' }}>
        Add to Library
      </button>
    </div>
  );
}
