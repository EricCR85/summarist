import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";

export const useLibrary = () => {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "library"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLibrary(booksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addToLibrary = async (book) => {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "library"), {
        ...book,
        userId: user.uid,
      });
    }
  };

  const removerFromLibrary = async (bookId) => {
    await deleteDoc(doc(db, "library", bookId));
  };
};
