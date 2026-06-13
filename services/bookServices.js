export const getBooks = async (query) => {
  try {
    const url =
      query && query.trim().length > 2
        ? `/api/books?search=${encodeURIComponent(query)}`
        : `/api/books`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Proxy call failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Critical error in getBooks service:", error);
    return [];
  }
};
