import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url, "http://localhost");
    const query = searchParams.get("search");

    const searchUrl = `https://us-central1-summarist.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query || "")}`;
    const defaultUrl =
      "https://us-central1-summarist.cloudfunctions.net/getBooks?status=recommended";

    const targetUrl = query ? searchUrl : defaultUrl;

    const response = await fetch(targetUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "External API error" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
