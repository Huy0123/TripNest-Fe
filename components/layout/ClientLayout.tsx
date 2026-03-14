"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import AuthProvider from "@/components/auth/AuthProvider";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const rawPath = pathname?.replace(/^\/(vi|en)/, '') || '/';
  const isAuthPage = rawPath === "/signin" || rawPath === "/signup" || rawPath === "/forgot-password";
  const isAdminPage = rawPath.startsWith("/admin");

  // Validate the client ID is present, though usually it will be in the env.
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        {!isAuthPage && !isAdminPage && <Header />}
        <main className="min-h-screen">{children}</main>
        {!isAuthPage && !isAdminPage && <ChatWidget />}
        {!isAuthPage && !isAdminPage && <Footer />}
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
