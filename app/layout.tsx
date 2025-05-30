import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nafs - Islamic Spiritual Growth Tracker",
  description:
    "Track your journey to spiritual enlightenment with our Islamic spiritual growth tracker",
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nafs - Islamic Spiritual Growth Tracker",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Nafs",
    title: "Nafs - Islamic Spiritual Growth Tracker",
    description: "Track your journey to spiritual enlightenment with our Islamic spiritual growth tracker",
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA primary color */}
        <meta name="theme-color" content="#000000" />
        
        {/* PWA display mode */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nafs" />
        
        {/* Prevent automatic detection and formatting of possible phone numbers */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512x512.png" />
        
        {/* PWA splash screens for better iOS experience */}
        <meta name="apple-mobile-web-app-title" content="Nafs" />
        <meta name="application-name" content="Nafs" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body
        className={`${inter.className} bg-dark-bg0 text-dark-fg0`}
      >
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}