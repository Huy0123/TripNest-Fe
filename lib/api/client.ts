import { useAuthStore } from '@/store/useAuthStore';
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

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};



export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate, tags, ...fetchOptions } = options;

  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_BASE_URL}${endpoint}`;

  const isClient = typeof window !== 'undefined';
  
  const headers = new Headers(fetchOptions.headers as HeadersInit);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  const token = typeof window !== 'undefined' ? useAuthStore.getState().accessToken : null;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(url, {
      credentials: 'include',
      ...fetchOptions,
      headers,
      next: {
        revalidate,
        tags,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      
      // Handle 401 Unauthorized for token refresh
      if (response.status === 401 && isClient && !url.includes('/auth/refresh-token') && !url.includes('/auth/login')) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
            
            if (!refreshResponse.ok) {
              throw new Error('Refresh failed');
            }
            
            const refreshData = await refreshResponse.json();
            const newAccessToken = refreshData.accessToken;
            
            if (newAccessToken) {
              useAuthStore.getState().updateAccessToken(newAccessToken);
            }
            
            processQueue(null, newAccessToken);
            
            if (newAccessToken) {
              headers.set('Authorization', `Bearer ${newAccessToken}`);
            }
            const retryResponse = await fetch(url, {
              credentials: 'include',
              ...fetchOptions,
              headers,
              next: { revalidate, tags },
            });
            
            if (!retryResponse.ok) {
              const retryErrorData = await retryResponse.json().catch(() => null);
              throw new APIError(retryResponse.status, retryResponse.statusText, retryErrorData);
            }
            
            return retryResponse.json();
            
          } catch (refreshErr) {
            // Refresh failed, clear state from memory and redirect
            processQueue(refreshErr as Error, null);
            useAuthStore.getState().clearAuth();
            window.location.href = '/signin';
            throw new APIError(401, 'Unauthorized', errorData);
          } finally {
            isRefreshing = false;
          }
        } else {
          // Put the request in the queue to wait for the refresh to complete
          return new Promise<T>((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                if (token) {
                  headers.set('Authorization', `Bearer ${token}`);
                }
                fetch(url, {
                  credentials: 'include',
                  ...fetchOptions,
                  headers,
                  next: { revalidate, tags },
                })
                .then(async (res) => {
                  if (!res.ok) {
                    const retryErrorData = await res.json().catch(() => null);
                    reject(new APIError(res.status, res.statusText, retryErrorData));
                  } else {
                    resolve(res.json());
                  }
                })
                .catch(reject);
              },
              reject: (err) => {
                reject(new APIError(401, 'Unauthorized', errorData));
              }
            });
          });
        }
      }

      throw new APIError(
        response.status,
        response.statusText,
        errorData
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new Error('Network error occurred. Please check your connection.');
  }
}

export async function apiGet<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'GET',
    ...options,
  });
}

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
