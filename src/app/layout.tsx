import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Turtle Spot Taiwan",
  description: "Turtle sighting and dive site information in Taiwan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
