import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

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
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}