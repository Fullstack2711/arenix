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
  
  // User sidebar sahifalari ro'yxati
  const userSidebarPages = [
    '/user-dashboard',
    '/profile',
    '/settings',
    '/tournaments',
    '/achievements',
    '/friends',
    '/history',
    '/wallet',
    '/contact',
    '/oyin',
    '/games'
  ]
  
  // Agar yo'l user sidebar sahifalaridan birida bo'lsa, navbar va footerni yashirish
  const shouldHideNavAndFooter = userSidebarPages.some(page => pathname?.startsWith(page))

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          {!shouldHideNavAndFooter && <Navbar />}
          {children}
          {!shouldHideNavAndFooter && <Footer />}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
