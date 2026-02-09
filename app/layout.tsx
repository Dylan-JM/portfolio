import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import XMBNavigation from "@/app/_components/XMBNavigation";
import PS3Background from "@/app/_components/PS3Background";
import { ThemeProvider } from "@/app/_providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeScript = `
(function() {
  const stored = localStorage.getItem('portfolio-theme');
  const theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
  document.documentElement.classList.add(theme);
})();
`;

export const metadata = {
  title: "Dylan Marley - Portfolio",
  description:
    "Full-stack and game developer specialising in Web Development with JS and Game Development with Unreal Engine C++.",
  openGraph: {
    title: "Dylan Marley - Developer Portfolio",
    description:
      "Full-stack and game developer specialising in Web Development with JS and Game Development with Unreal Engine C++.",
    url: "https://portfolio-pi-ochre-49.vercel.app/projects",
    siteName: "Dylan Marley Portfolio",
    images: [
      {
        url: "/og-image.png",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <ThemeProvider>
          <PS3Background />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
