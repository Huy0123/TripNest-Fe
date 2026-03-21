"use client";

import { createContext, useContext, ReactNode, useMemo, useEffect, useCallback } from "react";
import useSWR, { mutate } from "swr";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isError: any;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { data, error, isLoading } = useSWR(
    !["/signin", "/register", "/verify-account", "/forgot-password", "/reset-password"].includes(pathname) 
      ? "/users/me" 
      : null, 
    userService.getProfile, 
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (error && typeof window !== "undefined") {
      const protectedPaths = ["/profile", "/bookings", "/favorites", "/settings", "/passenger", "/payment", "/booking", "/admin"];
      const pathname = window.location.pathname;
      const rawPath = pathname.replace(/^\/(vi|en)/, '') || '/';
      const isProtected = protectedPaths.some(path => rawPath.startsWith(path));
      
      if (isProtected) {
        window.location.href = "/signin";
      }
    }
  }, [error]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout failed", err);
      sessionStorage.removeItem("accessToken");
    } finally {
      mutate("/users/me", null, false);
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    }
    document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    mutate("/users/me");
  }, []);

  const refreshUser = useCallback(() => {
    mutate("/users/me");
  }, []);

  const value = useMemo(() => {
    const rawData = (data as any);
    let userData = rawData?.user || rawData?.data?.user || rawData?.data || rawData;

    if (userData?.success && userData?.data) {
        userData = userData.data;
    }

    const result = {
      user: userData?.id ? userData : null,
      isLoading,
      isError: error,
      logout,
      refreshUser,
    };

    return result;
  }, [data, isLoading, error, logout, refreshUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
