import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trip Nest - Your Perfect Travel Companion",
  description:
    "Discover unforgettable adventures with Trip Nest. Explore destinations and book amazing tours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
