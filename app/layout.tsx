import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { lazy } from "react";
import { SessionProvider } from "next-auth/react"
import Provider from "@/components/layout/Provider";

const Header = lazy(() => import('@/components/layout/HedderWrapper'));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
            <Header/>
            <Toaster position="top-center" />
            <NuqsAdapter>
              <Provider>
                {children}
              </Provider>
            </NuqsAdapter>
        </SessionProvider>
      </body>
    </html>
  );
}