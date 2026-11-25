import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";
import AppShell from "@/components/shell/AppShell";

export const metadata: Metadata = {
  title: "Radio Agape 94.5 FM Semarang · Siaran Kasih 24 Jam & Arsip Khotbah",
  description:
    "Stasiun penyiaran rohani 94.5 MHz FM dari Jl. Pringgading 13 Semarang. Dengarkan 5 saluran audio langsung, jadwal harian, arsip podcast khotbah, dan layanan doa.",
  keywords: [
    "radio rohani semarang",
    "94.5 fm agape",
    "streaming radio kristen",
    "podcast khotbah",
    "renungan harian",
  ],
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Dealt face from direction sheet: Zilla Slab, plus DM Sans strictly for Cockpit tabular UI */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Zilla+Slab:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AudioProvider>
          <AppShell>{children}</AppShell>
        </AudioProvider>
      </body>
    </html>
  );
}
