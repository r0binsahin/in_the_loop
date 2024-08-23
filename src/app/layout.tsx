import type { Metadata } from "next";

import { lexend } from "./ui";
import { Navbar } from "@/components";

import "./globals.css";

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
    <html lang="en">
      <body className={`${lexend.className} antialiased h-full`}>
        <div className="flex flex-col min-h-screen max-w-[1100px] mx-auto w-full">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
