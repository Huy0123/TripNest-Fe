"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signin" || pathname === "/signup" || pathname === "/forgot-password";
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      {!isAuthPage && !isAdminPage && <Header />}
      <main className={!isAuthPage ? "min-h-screen" : ""}>{children}</main>
      {!isAuthPage && !isAdminPage && <ChatWidget />}
      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
}
