import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grocery Pricing",
  description: "A web app to find the best store to buy grocery items from.",
  icons: {
    apple: [{ url: "/apple-icon.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
    </html>
  );
}
