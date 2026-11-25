"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import MotionObserver from "@/components/motion/MotionObserver";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCockpit = pathname?.startsWith("/cockpit");

  if (isCockpit) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[100svh] flex flex-col bg-paper text-paper-ink">
      <MotionObserver />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
