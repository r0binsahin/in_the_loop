import type { Metadata } from "next";

import { lexend } from "./ui";
import { Navbar } from "@/components";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "In the Loop",
  description: "A workplace culture survey tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-[#f5e9dd]">
        <body
          className={`${lexend.className} antialiased h-full bg-[#f5e9dd] flex flex-col items-center`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
