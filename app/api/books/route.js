import { NextResponse } from "next/server";

export async function GET() {
  try {
    // This is the external API URL you were trying to reach.
    // By calling it from the server, we bypass the browser's CORS security.
    const externalApiUrl =
      "https://us-central1-summarist.cloudfunctions.net/getBooks";

    const response = await fetch(externalApiUrl);
  

    if (!response.ok) {
      throw new Error(`Failed to fetch from external API: ${response.status}`);
    }

    const data = await response.json();

    // Send the data back to your frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
