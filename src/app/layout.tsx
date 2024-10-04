import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import Loading from "./loading";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "ChatX"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // className="overflow-y-scroll no-scrollbar"
    >
      <link rel="icon" href="/logo.png" type="image/x-icon" />
      <body className="bg-[#1e0c31] shadow-none border-none ">
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
        {children}
        <Loading />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
