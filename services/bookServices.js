export const getBooks = async () => {
  try {
    // Ensure the path matches your actual API route
    const response = await fetch("/api/books");

    if (!response.ok) {
      // Capture server-side error details
      const errorDetails = await response.text();
      console.error(`Fetch Error: ${response.status} - ${errorDetails}`);
      throw new Error(
        `Server responded with ${response.status}: ${errorDetails}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Critical error in getBooks:", error);
    throw error;
  }
};
