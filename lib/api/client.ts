/**
 * Base API Client for Trip Nest
 * Handles all HTTP requests with proper Next.js App Router caching
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  revalidate?: number | false;
  tags?: string[];
}

export class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'APIError';
  }
}

/**
 * Base fetch function with Next.js caching support
 */
export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate, tags, ...fetchOptions } = options;

  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      next: {
        revalidate,
        tags,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new APIError(
        response.status,
        response.statusText,
        errorData
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    
    // Network error
    throw new Error('Network error occurred. Please check your connection.');
  }
}

/**
 * Helper for GET requests with automatic caching
 */
export async function apiGet<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'GET',
    ...options,
  });
}

/**
 * Helper for POST requests (no cache)
 */
export async function apiPost<T>(
  endpoint: string,
  data: any,
  options: FetchOptions = {}
): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    cache: 'no-store',
    ...options,
  });
}

/**
 * Helper for PUT requests (no cache)
 */
export async function apiPut<T>(
  endpoint: string,
  data: any,
  options: FetchOptions = {}
): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    cache: 'no-store',
    ...options,
  });
}

/**
 * Helper for DELETE requests (no cache)
 */
export async function apiDelete<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'DELETE',
    cache: 'no-store',
    ...options,
  });
}
