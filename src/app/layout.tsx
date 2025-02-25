'use client'

import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers"
import { useRouter } from "next/navigation";
import { setupAxiosInterceptors } from "@/api";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  setupAxiosInterceptors(router);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
