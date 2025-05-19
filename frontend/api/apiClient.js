export async function apiFetch(endpoint, options = {}) {
  let url = `/api/${endpoint}`;

  // Use absolute URL on server
  if (typeof window === "undefined") {
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5000";
    url = `${baseUrl}/api/${endpoint}`;
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}
