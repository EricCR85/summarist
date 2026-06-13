import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("search");

  if (!query) {
    return NextResponse.json(
      { error: "Missing search query" },
      { status: 400 },
    );
  }

  try {
    const externalApiUrl = `https://us-central1-summarist.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`;

    const response = await fetch(externalApiUrl);

    if (!response.ok) {
      throw new Error(`External API returned status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from external API" },
      { status: 500 },
    );
  }
}
