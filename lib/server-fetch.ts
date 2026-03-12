const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  query?: Record<string, any>;
}

export async function serverFetch(endpoint: string, options: FetchOptions = {}) {
  const { query, ...init } = options;
  
  let url = `${API_URL}${endpoint}`;
  
  if (query) {
    const searchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    // Handle specific status codes if needed
    const errorBody = await response.text();
    let error;
    try {
      error = JSON.parse(errorBody);
    } catch {
      error = errorBody || response.statusText;
    }
    throw error;
  }

  return response.json();
}
