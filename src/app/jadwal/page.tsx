"use client";

import React, { useState } from "react";
import { MOCK_SCHEDULE, ScheduleItem } from "@/data/radioData";
import { useAudio } from "@/context/AudioContext";
import { Calendar, Clock, User, Radio, Play, Pause, Sparkles } from "lucide-react";

export default function JadwalPage() {
  const [selectedDay, setSelectedDay] = useState(1); // Default: Senin (1)
  const { isPlaying, isLive, playLive, togglePlay } = useAudio();

  const days = [
    { value: 0, label: "Minggu" },
    { value: 1, label: "Senin" },
    { value: 2, label: "Selasa" },
    { value: 3, label: "Rabu" },
    { value: 4, label: "Kamis" },
    { value: 5, label: "Jumat" },
    { value: 6, label: "Sabtu" },
  ];

  // In real app, we filter by selectedDay. Here we use MOCK_SCHEDULE for demonstration
  const scheduleForDay = MOCK_SCHEDULE;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-agape-500/10 border border-agape-500/20 text-xs font-semibold text-agape-300">
          <Calendar className="w-4 h-4" /> Panduan Siaran Terpadu
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Jadwal Siaran Radio Agape
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Temukan program kesayangan Anda sepanjang 24 jam setiap hari, mulai dari saat teduh pagi, pujian di siang hari, hingga renungan firman malam.
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2 scrollbar-none">
        {days.map((d) => (
          <button
            key={d.value}
            onClick={() => setSelectedDay(d.value)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              selectedDay === d.value
                ? "bg-gradient-to-r from-agape-600 to-amber-600 text-white shadow-lg shadow-agape-600/30 scale-105"
                : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Program Grid */}
      <div className="space-y-4">
        {scheduleForDay.map((item, index) => {
          const isOnAir = index === 2; // Demo: 09:00 - 11:00 is on-air

          return (
            <div
              key={item.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                isOnAir
                  ? "bg-slate-900/95 border-agape-500 shadow-xl shadow-agape-500/10 ring-1 ring-agape-500/40"
                  : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Time & Category */}
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                    isOnAir
                      ? "bg-agape-500 text-slate-950 font-black"
                      : "bg-slate-800 text-slate-200 border border-slate-700"
                  }`}>
                    <Clock className="w-3.5 h-3.5" />
                    {item.startTime} - {item.endTime} WIB
                  </span>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800/60 text-amber-400 border border-slate-700/60">
                    {item.category}
                  </span>

                  {isOnAir && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-600/90 text-white text-[11px] font-extrabold uppercase tracking-wider animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                      ON AIR NOW
                    </span>
                  )}
                </div>

                {/* Live Play Trigger if On-Air */}
                {isOnAir && (
                  <button
                    onClick={playLive}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-md"
                  >
                    {isLive && isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" /> Jeda Siaran
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" /> Putar Siaran Ini
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Title & Host */}
              <div className="mt-4 space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
                  <User className="w-3.5 h-3.5 text-agape-400" />
                  <span>Host: <strong className="text-white">{item.host}</strong></span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-4xl">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
