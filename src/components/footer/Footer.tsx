import React from "react";
import Link from "next/link";
import { RADIO_INFO } from "@/data/radioData";
import { Radio, Phone, Mail, MapPin, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pb-28 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Info Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-agape-600 flex items-center justify-center">
                <Radio className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                RADIO <span className="text-amber-400">AGAPE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {RADIO_INFO.description}
            </p>
            <div className="pt-2 text-xs flex items-center gap-1.5 text-amber-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Siaran Online Beroperasi 24 Jam Nonstop
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

          {/* Column 3: Kontak Studio & Siaran */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-3">
              Interaksi Studio
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-agape-400" />
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
                <Mail className="w-3.5 h-3.5 text-agape-400" />
                <span>siaran@radioagape.id</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-agape-400" />
                <span>Studio Radio Agape, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Pengelola & Akses Khusus */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-3">
              Akses Stasiun
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Pusat komando operasional siaran bagi produser, penyiar studio, dan tim pastoral.
            </p>
            <Link
              href="/cockpit"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-700 transition"
            >
              Buka Studio Cockpit & CMS &rarr;
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 Radio Agape. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1">
            Dibangun dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> untuk kemuliaan nama Tuhan.
          </p>
        </div>
      </div>
    </footer>
  );
}
