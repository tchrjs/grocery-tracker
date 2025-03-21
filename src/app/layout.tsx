import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grocery Tracker",
  description:
    "A Progressive Web App to help track grocery prices and to help manage spendings.",
  icons: {
    apple: [{ url: "/apple-icon.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col dark">{children}</body>
    </html>
  );
}
