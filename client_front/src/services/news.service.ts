export async function fetchNews() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching news:", err);
    return [];
  }
}
