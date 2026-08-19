import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const useLibrary = () => {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLibrary([]);
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "library"),
        where("userId", "==", user.uid),
      );

      const unsubscribeLibrary = onSnapshot(q, (snapshot) => {
        const booksData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setLibrary(booksData);
        setLoading(false);
      });

      return unsubscribeLibrary;
    });

    return () => unsubscribeAuth();
  }, []);

  const addToLibrary = async (book) => {
    const user = auth.currentUser;

    if (!user) {
      alert("please log in to add books.");
      return;
    }

    try {
      console.log("Adding book to library:", book);
      await addDoc(collection(db, "library"), {
        ...book,
        bookId: book.bookId || book.id,
        userId: user.uid,
        createdAt: new Date(),
      });

      console.log("Book added successfully");
    } catch (error) {
      console.error("Error adding book to library:", error);
    }
  };

  const removeFromLibrary = async (docId) => {
    if (!auth.currentUser) return;
    await deleteDoc(doc(db, "library", docId));
  };

  return { library, addToLibrary, removeFromLibrary, loading };
};
