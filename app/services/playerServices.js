import {db} from "@/lib/firebase";
import {doc, getDoc} from "firebase/firestore";

export async function getBookAudio(id) {
  try {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data()};
    } else {
      console.error("No such document!");
      return null;
    }
    } catch (error) {
        console.error("Error fetching book:", error);
        return null;
    }
}