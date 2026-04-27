import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://math.rescience.com"),
  title: "Math Atlas — Visual Encyclopedia of Mathematical Problems",
  description:
    "An interactive visual encyclopedia of the world's most fascinating mathematical problems, conjectures, and breakthroughs.",
  openGraph: {
    title: "Math Atlas",
    description:
      "A curated atlas of mathematical problems, conjectures, and theorems.",
    url: "https://math.rescience.com/",
    siteName: "Math Atlas",
    images: [
      {
        url: "/og.png",
        width: 2400,
        height: 1260,
        alt: "Math Atlas social preview with a Kakeya Conjecture 3D visualization.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Math Atlas",
    description:
      "A curated atlas of mathematical problems, conjectures, and theorems.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />
        {children}
      </body>
    </html>
  );
}
