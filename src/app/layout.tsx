'use client'

import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers"
import { useRouter } from "next/navigation";
import { setupAxiosInterceptors } from "@/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
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
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
            <QueryClientProvider client={queryClient}>
                <NuqsAdapter>
                    {children}
                </NuqsAdapter>
            </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}
