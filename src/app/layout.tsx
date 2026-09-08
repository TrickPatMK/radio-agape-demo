import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import PersistentBottomPlayer from "@/components/player/PersistentBottomPlayer";

export const metadata: Metadata = {
  title: "Radio Agape — Streaming Audio 24/7 & Podcast Rohani",
  description: "Stasiun radio rohani online 24 jam nonstop menyajikan firman, renungan inspiratif, podcast khotbah, dan pujian penyembahan bagi seluruh keluarga.",
  keywords: ["radio rohani", "streaming radio kristen", "podcast khotbah", "renungan harian", "radio agape"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-slate-950">
        <AudioProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <PersistentBottomPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
