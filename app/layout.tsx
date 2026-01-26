import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dylan Marley — Portfolio",
  description:
    "Full-stack and game developer specialising in Unreal Engine, React, and scalable systems.",
  openGraph: {
    title: "Dylan Marley — Developer Portfolio",
    description:
      "Full-stack and game developer specialising in Unreal Engine, React, and scalable systems.",
    url: "https://portfolio-pi-ochre-49.vercel.app/projects",
    siteName: "Dylan Marley Portfolio",
    images: [
      {
        url: "/Graduate Picture.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
    ${geistSans.variable}
    ${geistMono.variable}
    antialiased
    bg-slate-950 text-slate-200
  `}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
