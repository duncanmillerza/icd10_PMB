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
  metadataBase: new URL('https://hadedahealth.co.za'),
  title: "Hadeda Health | Practice Management Software",
  description: "Secure, multi-disciplinary practice management for South African healthcare professionals.",
  openGraph: {
    title: "Hadeda Health",
    description: "Rehabilitation Practice Management & ICD-10 Tools",
    url: 'https://hadedahealth.co.za',
    siteName: 'Hadeda Health',
    locale: 'en_ZA',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
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
