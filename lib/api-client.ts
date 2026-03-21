import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    // Some endpoints wrap data in { data: ... }, others return directly
    // This maintains compatibility with both styles
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log(`[Axios] 401 Error detected for ${originalRequest.url}. Starting refresh flow...`);
      
      if (isRefreshing) {
        console.log(`[Axios] Refresh already in progress, queuing request: ${originalRequest.url}`);
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            console.log(`[Axios] Retrying queued request: ${originalRequest.url}`);
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;
      console.log(`[Axios] Calling refresh: ${refreshUrl}`);
      
      try {
        await axios.post(
          refreshUrl,
          {},
          { withCredentials: true }
        );

        console.log(`[Axios] Refresh successful. Retrying original request: ${originalRequest.url}`);
        isRefreshing = false;
        processQueue(null);

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError: any) {
        console.error(`[Axios] Refresh failed for ${originalRequest.url}:`, {
          status: refreshError.response?.status,
          data: refreshError.response?.data,
          message: refreshError.message
        });
        
        isRefreshing = false;
        processQueue(refreshError);
        
        // If refresh fails, redirect to signin only if on a protected page
        if (typeof window !== "undefined") {
          const protectedPaths = ["/profile", "/bookings", "/favorites", "/settings", "/passenger", "/payment", "/booking", "/admin"];
          const pathname = window.location.pathname;
          const rawPath = pathname.replace(/^\/(vi|en)/, '') || '/';
          const isProtected = protectedPaths.some(path => rawPath.startsWith(path));
          
          if (isProtected && rawPath !== "/signin") {
            console.warn(`[Axios] Protected route ${rawPath} detected. Redirecting to /signin`);
            window.location.href = "/signin";
          } else {
            console.log(`[Axios] Path ${rawPath} is not protected or already on /signin. No redirect.`);
          }
        }
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401) {
       console.log(`[Axios] 401 Error (Retry already attempted or not applicable) for ${originalRequest?.url}`);
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default apiClient;
