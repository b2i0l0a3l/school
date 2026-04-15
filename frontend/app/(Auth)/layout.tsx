import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Authentication | نظام إدارة المدرسة",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${geistSans.variable} ${outfit.variable} antialiased h-full`}>
      <body className="min-h-full">
        <div className="min-h-dvh w-full bg-[#0a0f1c] flex items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10 w-full max-w-md">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
