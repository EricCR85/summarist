const API_BASE_URL = "https://us-central1-summaristt.cloudfunctions.net";

export async function getBooks() {
  // 1. Create an AbortController to manage the timeout
  const controller = new AbortController();
//   const timeoutId = setTimeout(() => controller.abort(), 15000); // 5-second timeout

  try {
    console.log("Fetching books with 5s timeout...");

    // 2. Pass the signal to the fetch request
    const response = await fetch(`${API_BASE_URL}/getBooks`, {
      signal: controller.signal,
    });

    // Clear the timeout if the request succeeds
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error("Server responded with status:", response.status);
      return [];
    }

    const data = await response.json();
    console.log("Data successfully retrieved:", data);
    return data;
  } catch (error) {
    clearTimeout(timeoutId); // Ensure timeout is cleared on error

    if (error.name === "AbortError") {
      console.error(
        "Fetch Error: Request timed out (took longer than 5 seconds)",
      );
    } else {
      console.error("Fetch Error:", error.message);
    }

    return [];
  }
}
