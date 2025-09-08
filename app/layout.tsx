import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZEN1 OFFICIAL WEBSITE",
  description:
    "Swedish music producer ZEN1 specializes in House Music and Trap Beats. With over 15 years of experience, Marko (ZEN1) creates professional, unique productions across multiple genres including Hardstyle, Techno, House, and Rap/Trap.",
  generator: "Next.js",
  keywords: [
    "ZEN1",
    "Trap Producer",
    "Trap Beats",
    "Swedish Beatmaker",
    "Hip Hop Beats",
    "Type Beats",
    "Music Production",
    "Rap Instrumentals",
    "Swedish Producer",
    "Beatmaker",
    "Trap Music",
    "Buy Beats",
    "Instrumental Beats",
  ],
  authors: [{ name: "ZEN1", url: "https://www.youtube.com/@ZEN1BEATS" }],
  openGraph: {
    title: "ZEN1 OFFICIAL WEBSITE",
    description:
      "Swedish music producer ZEN1 specializes in House Music and Trap Beats. Professional music production with a unique touch.",
    url: "https://zen1beats.com",
    siteName: "ZEN1 OFFICIAL WEBSITE",
    images: [
      {
        url: "/zen1-logo.png",
        width: 1200,
        height: 630,
        alt: "ZEN1 Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
