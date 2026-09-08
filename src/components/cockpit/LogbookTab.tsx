"use client";

import React, { useState } from "react";

export default function LogbookTab() {
  const [logNotes, setLogNotes] = useState([
    {
      id: "log-1",
      time: "07:15",
      announcer: "Ruth Novita",
      note: "Audio level mixer mikrofon 2 sempat peaking, sudah diturunkan -3dB. Transisi ke AutoDJ jam 09:00 lancar.",
    },
    {
      id: "log-2",
      time: "09:30",
      announcer: "Ibu Maria",
      note: "Topik bahtera keluarga mendapat respons tinggi di WhatsApp (18 pertanyaan jemaat).",
    }
  ]);

  const [announcerName, setAnnouncerName] = useState("Penyiar Studio 1");
  const [newLogEntry, setNewLogEntry] = useState("");

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogEntry) return;

    const now = new Date();
    const time = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

    setLogNotes([
      { id: `log-${Date.now()}`, time, announcer: announcerName, note: newLogEntry },
      ...logNotes,
    ]);
    setNewLogEntry("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Logbook & Catatan Harian Shift Siaran</h2>
        <p className="text-xs text-slate-400">Dokumentasi serah terima shift studio, kendala teknis, dan catatan performa siaran.</p>
      </div>

      <form onSubmit={handleAddLog} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={announcerName}
            onChange={(e) => setAnnouncerName(e.target.value)}
            placeholder="Nama Penyiar Bertugas"
            className="w-full sm:w-60 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <input
            type="text"
            value={newLogEntry}
            onChange={(e) => setNewLogEntry(e.target.value)}
            placeholder="Tulis catatan kejadian siaran, kendala audio, atau request khusus..."
            className="flex-1 w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
          >
            Kirim Catatan
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {logNotes.map((log) => (
          <div key={log.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <span className="px-2.5 py-1 rounded bg-slate-800 text-amber-400 text-xs font-mono font-bold">
              {log.time}
            </span>
            <div className="flex-1">
              <span className="text-xs font-bold text-slate-300 block">{log.announcer}</span>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{log.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
