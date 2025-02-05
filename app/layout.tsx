import "./globals.css";
import { Toaster } from "react-hot-toast";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { lazy } from "react";
import { SessionProvider } from "next-auth/react"
import Provider from "@/components/layout/Provider";

const Header = lazy(() => import('@/components/layout/HedderWrapper'));


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
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