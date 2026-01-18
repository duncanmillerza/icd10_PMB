import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hadeda Health | ICD-10 Look-up",
  description: "ICD-10 Code lookup and cleaning tool",
};

export const viewport = {
  themeColor: "#2D6356",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Often requested for "app-like" feel on mobile, though affects accessibility
  interactiveWidget: 'resizes-content', // Critical for iOS keyboard handling
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
