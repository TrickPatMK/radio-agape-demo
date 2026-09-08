import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RADIO_INFO } from "@/data/radioData";
import { Phone, Mail, MapPin, Heart, ExternalLink, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pb-28 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Info Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white/10 p-0.5 flex items-center justify-center">
                <Image 
                  src="/agapelogo.png" 
                  alt="Agape FM Semarang" 
                  width={32} 
                  height={32} 
                  className="object-contain"
                />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                94.5 FM <span className="text-amber-400">AGAPE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {RADIO_INFO.description}
            </p>
            <div className="pt-1 text-xs flex items-center gap-1.5 text-amber-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {RADIO_INFO.tagline}
            </div>
          </div>

          {/* Column 2: Tautan Menu */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-3">
              Jelajahi Program
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/jadwal" className="hover:text-amber-400 transition">
                  Jadwal Siaran Mingguan
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="hover:text-amber-400 transition">
                  Katalog Podcast & Khotbah
                </Link>
              </li>
              <li>
                <Link href="/doa" className="hover:text-amber-400 transition">
                  Kirim Permohonan Doa
                </Link>
              </li>
              <li>
                <Link href="/donasi" className="hover:text-amber-400 transition">
                  Dukungan & Persembahan Kasih
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Alamat Studio & Kontak */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-3">
              Studio Semarang
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-agape-400 flex-shrink-0 mt-0.5" />
                <span>{RADIO_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-agape-400 flex-shrink-0" />
                <a 
                  href={RADIO_INFO.whatsappBroadcast} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  WhatsApp Siaran Langsung <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-agape-400 flex-shrink-0" />
                <span>{RADIO_INFO.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-agape-400 flex-shrink-0" />
                <a href={RADIO_INFO.officialWebsite} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {RADIO_INFO.officialWebsite}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Direktori Radio & Sosial */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-3">
              Jaringan Siaran
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={RADIO_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition flex items-center gap-1.5">
                  📸 Instagram @94.5agapefm_smg
                </a>
              </li>
              <li>
                <a href={RADIO_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition flex items-center gap-1.5">
                  👍 Facebook Page Resmi
                </a>
              </li>
              <li>
                <a href={RADIO_INFO.socials.onlineRadioBox} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-1.5">
                  📻 Online Radio Box Indonesia
                </a>
              </li>
              <li>
                <a href={RADIO_INFO.socials.fmStreaming} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-1.5">
                  📡 FMStream Directory
                </a>
              </li>
            </ul>
            <div className="pt-3">
              <Link
                href="/cockpit"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-700 transition"
              >
                Studio Cockpit & CMS &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Radio Agape 94.5 FM Semarang. Mitra Sejati Penyejuk Hati.</p>
          <p className="flex items-center gap-1">
            Dibangun dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> untuk pelayanan penyiaran rohani.
          </p>
        </div>
      </div>
    </footer>
  );
}
