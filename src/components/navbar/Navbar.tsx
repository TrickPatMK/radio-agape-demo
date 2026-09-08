"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAudio } from "@/context/AudioContext";
import { 
  Radio, 
  Calendar, 
  Headphones, 
  HeartHandshake, 
  Sliders, 
  Menu, 
  X,
  Volume2
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { isPlaying, isLive, playLive } = useAudio();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Beranda", icon: Radio },
    { href: "/jadwal", label: "Jadwal Siaran", icon: Calendar },
    { href: "/podcast", label: "Podcast", icon: Headphones },
    { href: "/doa", label: "Permohonan Doa", icon: HeartHandshake },
    { href: "/donasi", label: "Dukungan Kasih", icon: HeartHandshake },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 text-white backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-agape-600 to-amber-500 flex items-center justify-center shadow-lg shadow-agape-600/30 group-hover:scale-105 transition-transform">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                RADIO <span className="text-amber-400">AGAPE</span>
              </span>
              <span className="text-[11px] font-medium tracking-wide text-slate-300 block -mt-1">
                24/7 Kasih & Pengharapan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-agape-600 text-white shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons: Play Live & Studio Cockpit */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Live Button */}
            <button
              onClick={playLive}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition shadow-lg ${
                isLive && isPlaying
                  ? "bg-red-600 text-white shadow-red-600/40 animate-pulse"
                  : "bg-gradient-to-r from-red-600 to-amber-600 text-white hover:brightness-110"
              }`}
            >
              <Volume2 className="w-4 h-4" />
              {isLive && isPlaying ? "ON AIR PLAYING" : "PUTAR SIARAN"}
            </button>

            {/* Studio Cockpit CMS Gateway */}
            <Link
              href="/cockpit"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                pathname === "/cockpit"
                  ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                  : "bg-slate-800/80 text-amber-300 border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-400"
              }`}
              title="Masuk ke Studio Cockpit & Rundown Harian"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Studio Cockpit</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={playLive}
              className="p-2 rounded-full bg-red-600 text-white shadow-md text-xs font-bold flex items-center"
              aria-label="Putar Live"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-agape-600 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-5 h-5 text-amber-400" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/cockpit"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-slate-950 shadow-md"
            >
              <Sliders className="w-4 h-4" />
              Buka Studio Cockpit (Admin CMS)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
