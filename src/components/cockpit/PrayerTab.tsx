"use client";

import React, { useState } from "react";
import { PrayerRequest } from "@/data/radioData";
import { CheckCircle2, MessageSquare } from "lucide-react";

interface PrayerTabProps {
  prayerList: PrayerRequest[];
  setPrayerList: React.Dispatch<React.SetStateAction<PrayerRequest[]>>;
}

export default function PrayerTab({ prayerList, setPrayerList }: PrayerTabProps) {
  const [filter, setFilter] = useState<"ALL" | "BROADCAST_READY" | "PASTORAL" | "COMPLETED">("ALL");

  const updateStatus = (id: string, status: PrayerRequest["status"]) => {
    const updated = prayerList.map((p) => (p.id === id ? { ...p, status } : p));
    setPrayerList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("agape_prayers", JSON.stringify(updated));
    }
  };

  const filtered = prayerList.filter((p) => {
    if (filter === "BROADCAST_READY") return p.allowBroadcast && p.status !== "COMPLETED";
    if (filter === "PASTORAL") return !p.allowBroadcast;
    if (filter === "COMPLETED") return p.status === "COMPLETED";
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Inbox Permohonan Doa & Interaksi Siaran</h2>
          <p className="text-xs text-slate-400">Daftar permohonan doa masuk dari pendengar web untuk dibacakan di udara atau didoakan khusus.</p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === "ALL" ? "bg-agape-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Semua ({prayerList.length})
          </button>
          <button
            onClick={() => setFilter("BROADCAST_READY")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === "BROADCAST_READY" ? "bg-amber-500 text-slate-950 font-black" : "text-slate-400 hover:text-white"
            }`}
          >
            Boleh On-Air
          </button>
          <button
            onClick={() => setFilter("PASTORAL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === "PASTORAL" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Pastoral Pribadi
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">Tidak ada pokok doa pada filter ini.</div>
        ) : (
          filtered.map((prayer) => (
            <div
              key={prayer.id}
              className={`p-5 rounded-2xl border transition-all ${
                prayer.status === "ON_AIR_READING"
                  ? "bg-slate-900 border-red-500 ring-1 ring-red-500/40 shadow-xl shadow-red-500/10"
                  : prayer.status === "COMPLETED"
                  ? "bg-slate-950/70 border-slate-900 opacity-60"
                  : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-white text-base">{prayer.senderName}</span>
                  <span className="text-xs text-slate-400">({prayer.city})</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-agape-400 border border-slate-700">
                    {prayer.category}
                  </span>
                  <span className="text-[11px] text-slate-500">• {prayer.createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  {prayer.allowBroadcast ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Boleh Dibaca On-Air
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      Doa Pribadi Pastoral
                    </span>
                  )}
                  {prayer.status === "ON_AIR_READING" && (
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-red-600 text-white animate-pulse">
                      🔴 SEDANG DIBACAKAN
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 mb-4">
                &quot;{prayer.content}&quot;
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  {prayer.allowBroadcast && prayer.status !== "ON_AIR_READING" && (
                    <button
                      onClick={() => updateStatus(prayer.id, "ON_AIR_READING")}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-600/90 hover:bg-red-500 text-white transition shadow"
                    >
                      Mulai Bacakan di Siaran
                    </button>
                  )}
                  {prayer.status !== "COMPLETED" && (
                    <button
                      onClick={() => updateStatus(prayer.id, "COMPLETED")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Tandai Telah Didoakan
                    </button>
                  )}
                </div>
                {prayer.phone && (
                  <a
                    href={`https://wa.me/${prayer.phone.replace(/[^0-9]/g, "")}?text=Shalom%20${encodeURIComponent(prayer.senderName)},%20permohonan%20doa%20Anda%20telah%20kami%20bawa%20dalam%20doa%20di%20Radio%20Agape.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Kirim Respon Pastoral WA
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
