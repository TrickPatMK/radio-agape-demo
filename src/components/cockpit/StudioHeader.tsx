"use client";

import React, { useState, useEffect } from "react";
import { Sliders, Clock, Users, Activity } from "lucide-react";

export default function StudioHeader() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB");
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
          <Sliders className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Studio Cockpit & Command Center
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
              STUDIO 1 LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Konsol manajemen siaran harian, moderasi doa jemaat, dan kendali penayangan Radio Agape.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <div className="px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-amber-400" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block -mb-0.5">Jam Studio</span>
            <span className="text-sm sm:text-base font-mono font-bold text-white tracking-wider">
              {timeStr || "--:--:-- WIB"}
            </span>
          </div>
        </div>

        <div className="px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
          <Users className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block -mb-0.5">Pendengar Aktif</span>
            <span className="text-sm sm:text-base font-bold text-emerald-400 flex items-center gap-1">
              164 <span className="text-xs text-slate-400 font-normal">Streaming</span>
            </span>
          </div>
        </div>

        <div className="px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-agape-400" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block -mb-0.5">Icecast Relay</span>
            <span className="text-xs font-bold text-slate-200">
              🟢 128 kbps Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
