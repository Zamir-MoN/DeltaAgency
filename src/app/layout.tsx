import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { GameModeProvider } from "@/context/GameModeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const customLogoFont = localFont({
  src: "../../public/fonts/04b_30.ttf",
  variable: "--font-custom-logo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Delta X | Premium Digital Agency",
  description: "We build digital experiences that convert. Websites, branding, automation, AI solutions, and digital experiences for modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${customLogoFont.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-brand-bg-1 text-brand-text-primary flex flex-col selection:bg-brand-blue/30">
        <GameModeProvider>
          <SmoothScroll>
            <Preloader />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </SmoothScroll>
        </GameModeProvider>
      </body>
    </html>
  );
}
