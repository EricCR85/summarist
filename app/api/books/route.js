import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    // const externalApiUrl =
    //   "https://us-central1-summarist.cloudfunctions.net/getBooks";

    // const response = await fetch(externalApiUrl);

    // if (!response.ok) {
    //   throw new Error(`Failed to fetch from external API: ${response.status}`);
    // }

    // const data = await response.json();

    const booksCollection = collection(db, "books");

    const querySnapshot = await getDocs(booksCollection);

    const books = querySnapshot.docs.map((doc) => ({
      id: doc.id,

      ...doc.data(),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
