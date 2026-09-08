"use client";

import React from "react";
import Link from "next/link";
import { useAudio } from "@/context/AudioContext";
import { RADIO_INFO, MOCK_SCHEDULE, MOCK_PODCASTS } from "@/data/radioData";
import { 
  Play, 
  Pause, 
  Radio, 
  Calendar, 
  Headphones, 
  HeartHandshake, 
  Clock, 
  ChevronRight,
  Share2,
  Sparkles,
  PhoneCall
} from "lucide-react";

export default function HomePage() {
  const { isPlaying, isLive, togglePlay, playLive, playPodcast } = useAudio();

  // Current program sample
  const currentProgram = MOCK_SCHEDULE[2]; // Bincang Keluarga Bahtera Kasih (09:00 - 11:00)
  const nextProgram = MOCK_SCHEDULE[3]; // Pujian di Tengah Hari (11:00 - 13:00)

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800/80">
        {/* Decorative Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-agape-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-red-400 font-bold uppercase tracking-wider">Live Streaming 24/7</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-300 font-medium">Stasiun Penyiaran Kasih</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                Menyapa Hati dengan <br />
                <span className="bg-gradient-to-r from-amber-400 via-agape-300 to-amber-200 bg-clip-text text-transparent">
                  Kasih & Pengharapan
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Dengarkan pujian penyembahan, firman yang menguatkan, dan bincang rohani inspiratif kapan pun dan di mana pun. Audio tetap berputar lancar tanpa putus saat Anda menjelajahi website.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={playLive}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-base font-bold bg-gradient-to-r from-agape-600 to-amber-600 text-white shadow-xl shadow-agape-600/30 hover:scale-105 active:scale-95 transition-all"
                >
                  {isLive && isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-white" />
                      Jeda Siaran Langsung
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-white" />
                      Dengarkan Siaran Langsung
                    </>
                  )}
                </button>

                <Link
                  href="/podcast"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold bg-slate-800/90 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700 transition shadow-sm"
                >
                  <Headphones className="w-4 h-4 text-amber-400" />
                  Jelajahi Podcast
                </Link>

                <Link
                  href="/doa"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 border border-amber-500/30 transition"
                >
                  <HeartHandshake className="w-4 h-4" />
                  Kirim Pokok Doa
                </Link>
              </div>
            </div>

            {/* Right On-Air Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/80 p-6 sm:p-7 shadow-2xl backdrop-blur-md">
                {/* Badge Status */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                      ON AIR SAAT INI
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-agape-500/20 text-agape-300 border border-agape-500/30">
                    {currentProgram.startTime} - {currentProgram.endTime} WIB
                  </span>
                </div>

                {/* Program Details */}
                <div className="space-y-3">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-400">
                    {currentProgram.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {currentProgram.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium">
                    Host: <span className="text-white font-semibold">{currentProgram.host}</span>
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {currentProgram.description}
                  </p>
                </div>

                {/* Interactive Action within Card */}
                <div className="mt-6 pt-5 border-t border-slate-700/60 flex items-center justify-between gap-3">
                  <button
                    onClick={playLive}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-md"
                  >
                    {isLive && isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" /> Jeda Suara
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" /> Putar Sekarang
                      </>
                    )}
                  </button>

                  <a
                    href={RADIO_INFO.whatsappBroadcast}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition"
                    title="Kirim salam atau request lagu via WhatsApp"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Salam / Request
                  </a>
                </div>

                {/* Up Next Mini Sneak Peek */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-400">Berikutnya:</span>
                  <span className="text-slate-200 font-semibold truncate ml-2">
                    {nextProgram.title} ({nextProgram.startTime} WIB)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-agape-500/10 text-agape-400 border border-agape-500/20">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Live 24 Jam</h4>
              <p className="text-xs text-slate-400 mt-0.5">Siaran tanpa henti setiap hari</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Audio Persisten</h4>
              <p className="text-xs text-slate-400 mt-0.5">Audio tidak putus saat ganti menu</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Layanan Doa</h4>
              <p className="text-xs text-slate-400 mt-0.5">Dukungan doa bagi yang bergumul</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Podcast Renungan</h4>
              <p className="text-xs text-slate-400 mt-0.5">Dengarkan kapan saja on-demand</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TODAY'S SCHEDULE HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-agape-400 mb-1">
              <Calendar className="w-4 h-4" /> Panduan Siaran
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              List Penayangan Hari Ini
            </h2>
          </div>
          <Link
            href="/jadwal"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition"
          >
            Lihat Jadwal Lengkap 7 Hari <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_SCHEDULE.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                idx === 2
                  ? "bg-slate-800/90 border-agape-500/50 shadow-lg shadow-agape-500/10 ring-1 ring-agape-500/30"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
                  {item.startTime} - {item.endTime} WIB
                </span>
                {idx === 2 ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-400 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    ON AIR
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">
                    {item.category}
                  </span>
                )}
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-amber-300/90 font-medium mb-2">
                Bersama: {item.host}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PODCAST SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Headphones className="w-4 h-4" /> Audio on Demand
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Podcast Khotbah & Renungan Terkini
            </h2>
          </div>
          <Link
            href="/podcast"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition"
          >
            Semua Episode Podcast <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_PODCASTS.slice(0, 3).map((pod) => (
            <div
              key={pod.id}
              className="group rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden hover:border-slate-700 transition flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pod.coverImage}
                  alt={pod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-900/80 text-amber-400 backdrop-blur-sm border border-slate-700">
                  {pod.series}
                </span>
                <span className="absolute bottom-3 right-3 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 backdrop-blur-sm">
                  {pod.duration}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition line-clamp-2">
                    {pod.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {pod.speaker} • {pod.publishedDate}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed pt-1">
                    {pod.showNotes}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-amber-400 font-medium">
                    📖 {pod.scripture}
                  </span>
                  <button
                    onClick={() => playPodcast(pod)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-agape-600 hover:bg-agape-500 text-white shadow transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Putar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRAYER CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-agape-900/80 via-slate-900 to-amber-950/70 border border-agape-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
              <HeartHandshake className="w-4 h-4" /> Pelayanan Doa Bersama
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Apakah Anda Sedang Mengalami Pergumulan?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Kami rindu berdiri bersama Anda di dalam doa. Kirimkan pokok doa Anda untuk didoakan secara langsung di siaran radio atau didoakan khusus secara pribadi oleh tim pastoral kami.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/doa"
                className="px-6 py-3 rounded-full text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-lg shadow-amber-500/20"
              >
                Kirimkan Permohonan Doa Sekarang &rarr;
              </Link>
              <Link
                href="/donasi"
                className="px-6 py-3 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition"
              >
                Dukungan & Donasi Kasih
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
