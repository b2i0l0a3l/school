import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
});

import SideBar from "@/Components/Ui/Sidebar/sidebar";
import ToastContainer from "@/Components/Ui/Toast/ToastContainer";
import PopupContainer from "@/Components/Ui/Popup/PopupContainer";

export const metadata: Metadata = {
  title: "School Management System | نظام إدارة المدرسة",
  description: "نظام حديث لإدارة المدارس - Modern web application for managing schools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar" dir="rtl"
      className={`${geistSans.variable} ${outfit.variable} antialiased h-full`}
    >
      <body className="min-h-full flex">
          <div className="flex w-full">
            <SideBar />
            <main style={{ flex: 1, minHeight: '100vh', overflow: 'auto' }}>
              {children}
            </main>
          </div>
          <ToastContainer />
          <PopupContainer />
      </body>
    </html>
  );
}
