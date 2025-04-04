import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Funnel_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";

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

const font = Funnel_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body
          className={cn(
            "flex min-h-screen w-full flex-col dark",
            font.className
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
