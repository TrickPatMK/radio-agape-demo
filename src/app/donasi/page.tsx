"use client";

import React, { useState } from "react";
import { RADIO_INFO } from "@/data/radioData";
import { HeartHandshake, Copy, Check, QrCode, Shield, ExternalLink } from "lucide-react";

export default function DonasiPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(RADIO_INFO.bankDonation.accountNumber.replace(/-/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
          <HeartHandshake className="w-4 h-4" /> Taburan Kasih & Pelayanan Bersama
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Dukungan Operasional Radio Agape
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Setiap persembahan kasih Anda menopang kelancaran penyiaran kabar baik, sewa bandwidth server streaming 24 jam, pemeliharaan studio, dan produksi podcast renungan agar terus menjangkau jiwa-jiwa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Method 1: Transfer Bank BCA */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Metode 1: Transfer Rekening
            </span>
            <h3 className="text-xl font-bold text-white">
              Rekening Resmi Yayasan
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Anda dapat menyalurkan persembahan kasih melalui transfer antar bank ke rekening resmi di bawah ini:
            </p>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-medium">Bank Penerima</span>
                <p className="text-sm font-bold text-white">{RADIO_INFO.bankDonation.bankName}</p>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 uppercase font-medium">Nomor Rekening</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xl sm:text-2xl font-mono font-black text-amber-400 tracking-wider">
                    {RADIO_INFO.bankDonation.accountNumber}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Salin No. Rek
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-900">
                <span className="text-[11px] text-slate-400 uppercase font-medium">Atas Nama</span>
                <p className="text-xs font-semibold text-slate-200">{RADIO_INFO.bankDonation.accountHolder}</p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rekening resmi yang diawasi oleh badan pengurus yayasan.</span>
          </div>
        </div>

        {/* Method 2: QRIS Nasional */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-agape-400 uppercase tracking-wider">
              Metode 2: QRIS Digital
            </span>
            <h3 className="text-xl font-bold text-white">
              Scan Barcode QRIS Bebas Biaya
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mendukung seluruh aplikasi e-wallet (GoPay, OVO, Dana, LinkAja, ShopeePay) dan seluruh Mobile Banking di Indonesia.
            </p>

            {/* QRIS Visual Card */}
            <div className="p-6 rounded-2xl bg-white text-slate-900 flex flex-col items-center justify-center space-y-3 shadow-md">
              <div className="text-center font-black tracking-wider text-xs border-b border-slate-300 pb-1 w-full">
                QRIS PEMBAYARAN / PERSEMBAHAN RESMI
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-inner">
                {/* Visual SVG QR Code representation */}
                <QrCode className="w-40 h-40 text-slate-900" />
              </div>
              <div className="text-center text-[11px] text-slate-600 font-semibold">
                NMID: ID1020268899881 • RADIO AGAPE
              </div>
            </div>
          </div>

          <a
            href={RADIO_INFO.whatsappBroadcast}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <span>Konfirmasi Donasi via WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
