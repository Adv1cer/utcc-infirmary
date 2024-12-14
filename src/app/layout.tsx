import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { AuthProvider } from "./provider";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";


const inter = IBM_Plex_Sans_Thai({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head></head>
      <body className={inter.className}>
        <MantineProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </Suspense>
        </MantineProvider>
      </body>
    </html>
  );
}