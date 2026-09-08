"use client";

import React, { useState } from "react";
import { RundownItem } from "@/data/radioData";
import { Plus, AlertCircle } from "lucide-react";

interface RundownTabProps {
  rundownList: RundownItem[];
  setRundownList: React.Dispatch<React.SetStateAction<RundownItem[]>>;
}

export default function RundownTab({ rundownList, setRundownList }: RundownTabProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({
    timeSlot: "",
    title: "",
    host: "",
    type: "LIVE" as RundownItem["type"],
    producerNote: "",
  });

  const setOnAir = (id: string) => {
    setRundownList((prev) =>
      prev.map((item) => {
        if (item.id === id) return { ...item, status: "ON_AIR" };
        if (item.status === "ON_AIR") return { ...item, status: "COMPLETED" };
        return item;
      })
    );
  };

  const setCompleted = (id: string) => {
    setRundownList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "COMPLETED" } : item))
    );
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.timeSlot) return;

    const item: RundownItem = {
      id: `rd-${Date.now()}`,
      timeSlot: newItem.timeSlot,
      title: newItem.title,
      host: newItem.host || "Tim Agape",
      type: newItem.type,
      status: "SCHEDULED",
      producerNote: newItem.producerNote || "Segmen tambahan studio.",
    };

    setRundownList([...rundownList, item]);
    setNewItem({ timeSlot: "", title: "", host: "", type: "LIVE", producerNote: "" });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Timeline & Lineup Siaran Hari Ini</h2>
          <p className="text-xs text-slate-400">Urutan acara studio aktif, catatan produser, dan kendali status siaran.</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow"
        >
          <Plus className="w-4 h-4" /> Tambah Segmen Acara
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Tambah Segmen Baru ke Rundown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Slot Jam (15:00 - 16:30)"
              required
              value={newItem.timeSlot}
              onChange={(e) => setNewItem({ ...newItem, timeSlot: e.target.value })}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <input
              type="text"
              placeholder="Nama Program Acara"
              required
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <input
              type="text"
              placeholder="Penyiar / Host"
              value={newItem.host}
              onChange={(e) => setNewItem({ ...newItem, host: e.target.value })}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <textarea
            placeholder="Catatan Produser (Petunjuk narasumber, pemutaran jingle, atau pokok bahasan)"
            value={newItem.producerNote}
            onChange={(e) => setNewItem({ ...newItem, producerNote: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400 resize-none h-20"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white">Batal</button>
            <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">Simpan Segmen</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {rundownList.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all ${
              item.status === "ON_AIR"
                ? "bg-slate-900 border-agape-500 ring-2 ring-agape-500/40 shadow-xl shadow-agape-500/10"
                : item.status === "COMPLETED"
                ? "bg-slate-950/60 border-slate-900 opacity-60"
                : "bg-slate-900/60 border-slate-800"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 text-slate-200 border border-slate-700">
                  {item.timeSlot}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                    {item.status === "ON_AIR" && (
                      <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-extrabold tracking-wider animate-pulse">
                        🔴 ON-AIR NOW
                      </span>
                    )}
                    {item.status === "UP_NEXT" && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                        ⏳ UP NEXT
                      </span>
                    )}
                    {item.status === "COMPLETED" && (
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-medium">
                        ✓ Selesai
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Penyiar: <strong className="text-slate-200">{item.host}</strong> ({item.type})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.status !== "ON_AIR" && (
                  <button
                    onClick={() => setOnAir(item.id)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-red-600/90 hover:bg-red-500 text-white transition shadow"
                  >
                    Set ON-AIR
                  </button>
                )}
                {item.status !== "COMPLETED" && (
                  <button
                    onClick={() => setCompleted(item.id)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                  >
                    Tandai Selesai
                  </button>
                )}
              </div>
            </div>

            {item.producerNote && (
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-amber-300/90 bg-amber-500/5 px-3 py-2 rounded-lg border border-amber-500/15 flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong>Catatan Produser:</strong> {item.producerNote}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
