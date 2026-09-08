"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <header className="sticky top-0 z-40 bg-slate-900/95 text-white backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo with Official Agape FM Image */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-white/10 p-1 flex items-center justify-center border border-slate-700/60 shadow group-hover:scale-105 transition-transform">
              <Image 
                src="/agapelogo.png" 
                alt="Logo Radio Agape 94.5 FM Semarang" 
                width={56} 
                height={56} 
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white">
                  94.5 FM <span className="text-amber-400">AGAPE</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  SEMARANG
                </span>
              </div>
              <span className="text-[11px] font-medium tracking-wide text-slate-300 block -mt-0.5">
                Mitra Sejati Penyejuk Hati
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

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => playLive()}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition shadow-lg ${
                isLive && isPlaying
                  ? "bg-red-600 text-white shadow-red-600/40 animate-pulse"
                  : "bg-gradient-to-r from-red-600 to-amber-600 text-white hover:brightness-110"
              }`}
            >
              <Volume2 className="w-4 h-4" />
              {isLive && isPlaying ? "ON AIR PLAYING" : "PUTAR SIARAN 94.5 FM"}
            </button>

            <Link
              href="/cockpit"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                pathname === "/cockpit"
                  ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                  : "bg-slate-800/80 text-amber-300 border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-400"
              }`}
              title="Studio Cockpit & Kontrol Siaran"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Studio Cockpit</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => playLive()}
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
              Buka Studio Cockpit (CMS)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
