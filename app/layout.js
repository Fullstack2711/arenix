'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import StyledComponentsRegistry from './lib/registry';
import Footer from "./components/Footer";
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/user-dashboard')

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          {!isDashboard && <Navbar />}
          {children}
          {!isDashboard && <Footer />}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
