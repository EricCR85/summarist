export async function getBooks(url) {
  console.log("attempting to fetch from exaclty this URL path:", url);
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return [];
    }

    const text = await response.text();

    if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
      return JSON.parse(text);
    } else {
      console.error("Response is not JSON:", text);
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
