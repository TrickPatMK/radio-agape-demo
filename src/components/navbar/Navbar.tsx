"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAudio } from "@/context/AudioContext";
import { Play, Pause, Menu, X, Loader2 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { currentTrack, isPlaying, isLive, isLoading, togglePlay, playLive } = useAudio();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/jadwal", label: "Jadwal" },
    { href: "/podcast", label: "Podcast" },
    { href: "/doa", label: "Doa" },
    { href: "/donasi", label: "Dukungan" },
  ];

  const handlePrimaryPlay = () => {
    if (isPlaying) {
      togglePlay();
    } else if (isLive) {
      playLive();
    } else {
      togglePlay();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-paper text-paper-ink">
      <div className="px-[var(--margin)] h-[4.25rem] flex items-center justify-between gap-3">
        {/* Crisp Broadcast Mark & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-paper-ink no-underline flex-none"
          aria-label="Radio Agape 94.5 FM Semarang Beranda"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            aria-hidden="true"
            className="flex-none"
          >
            <rect width="28" height="28" fill="#241f1c" />
            <circle cx="14" cy="14" r="8.5" fill="none" stroke="#ebe5e3" strokeWidth="1.8" />
            <circle cx="14" cy="14" r="3" fill="#085830" />
          </svg>
          <span className="type-body font-semibold tracking-[-0.015em] text-paper-ink tabular whitespace-nowrap">
            Agape 94.5 FM
          </span>
        </Link>

        {/* Plain Text Navigation on Desktop (1024px+) */}
        <nav aria-label="Menu utama" className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`type-body no-underline transition-colors ${
                  active
                    ? "text-paper-accent font-semibold underline underline-offset-[6px]"
                    : "text-paper-ink hover:text-paper-accent font-normal"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/cockpit"
            className="type-small text-paper-muted hover:text-paper-ink no-underline"
          >
            Studio Cockpit
          </Link>
        </nav>

        {/* Single Primary Action + Mobile Sheet Trigger */}
        <div className="flex items-center gap-2 flex-none">
          <button
            type="button"
            onClick={handlePrimaryPlay}
            className="btn-flat !min-h-[40px] !py-2 !px-3.5 !text-[14px]"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            <span className="hidden sm:inline tabular">
              {isPlaying
                ? isLive
                  ? "Jeda 94.5 FM"
                  : "Jeda Rekaman"
                : "Putar 94.5 FM"}
            </span>
            <span className="sm:hidden tabular">
              {isPlaying ? "Jeda" : "Putar"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="lg:hidden min-h-[40px] px-3 bg-paper-surface text-paper-ink border-0 cursor-pointer flex items-center gap-1.5 type-small font-medium"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Menu Sheet for Tablet & Phone */}
      {menuOpen && (
        <div
          role="dialog"
          aria-label="Menu navigasi situs"
          className="lg:hidden fixed inset-0 top-[4.25rem] z-50 bg-paper px-[var(--margin)] py-8 flex flex-col justify-between overflow-y-auto"
        >
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`type-head no-underline ${
                    active ? "text-paper-accent" : "text-paper-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/cockpit"
              onClick={() => setMenuOpen(false)}
              className="type-lead text-paper-muted no-underline pt-2"
            >
              Buka Studio Cockpit
            </Link>
          </nav>

          <div className="bg-paper-surface p-5 space-y-2">
            <p className="m-0 type-small text-paper-muted">Sedang siap diputar:</p>
            <p className="m-0 type-body font-semibold text-paper-ink">{currentTrack.title}</p>
            <p className="m-0 type-small text-paper-muted">
              Jl. Pringgading 13, Semarang 50135
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
