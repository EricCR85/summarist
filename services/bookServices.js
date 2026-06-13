export const getBooks = async (query) => {
  if (!query || query.trim().length <= 2) return [];

  try {
    const response = await fetch(
      `/api/books?search=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
      throw new Error(`Proxy call failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Critical error in getBooks service:", error);
    return [];
  }
};
