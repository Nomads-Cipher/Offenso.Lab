import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "CipherDocs",
  description: "Document storage and collaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Script src="/static/js/main.chunk.js" strategy="afterInteractive" />
        <div className="appShell">
          <header className="topNav">
            <div className="topNavInner">
              <Link href="/" className="brand">
                CipherDocs
              </Link>
              <nav className="navLinks">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </nav>
            </div>
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
