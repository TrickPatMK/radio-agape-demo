"use client";

import React, { useState } from "react";

export default function LogbookTab() {
  const [logNotes, setLogNotes] = useState([
    {
      id: "log-2",
      time: "09:30",
      shift: "Pagi",
      announcer: "Ibu Maria",
      note: "Topik Bahtera Keluarga mendapat 18 pesan tanggapan jemaat lewat WhatsApp studio.",
    },
    {
      id: "log-1",
      time: "07:15",
      shift: "Fajar",
      announcer: "Ruth Novita",
      note: "Level mikrofon jalur 2 sempat menyentuh batas puncak, sudah diturunkan 3 dB. Perpindahan segmen lancar.",
    },
  ]);

  const [announcerName, setAnnouncerName] = useState("Ibu Maria");
  const [shiftName, setShiftName] = useState("Pagi");
  const [newLogEntry, setNewLogEntry] = useState("");

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogEntry) return;

    const now = new Date();
    const time = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setLogNotes([
      {
        id: `log-${Date.now()}`,
        time,
        shift: shiftName,
        announcer: announcerName || "Penyiar Studio",
        note: newLogEntry,
      },
      ...logNotes,
    ]);
    setNewLogEntry("");
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddLog} className="cockpit-card space-y-3">
        <h2 className="m-0 text-[16px] font-semibold text-white">
          Catat serah terima shift &amp; teknis ruang siaran
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-3 space-y-1">
            <label htmlFor="log-host" className="block text-[12px] text-[#b4b4b4]">
              Penyiar bertugas
            </label>
            <input
              id="log-host"
              type="text"
              value={announcerName}
              onChange={(e) => setAnnouncerName(e.target.value)}
              className="cockpit-input"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label htmlFor="log-shift" className="block text-[12px] text-[#b4b4b4]">
              Shift
            </label>
            <select
              id="log-shift"
              value={shiftName}
              onChange={(e) => setShiftName(e.target.value)}
              className="cockpit-input"
            >
              <option value="Fajar">Fajar</option>
              <option value="Pagi">Pagi</option>
              <option value="Siang">Siang</option>
              <option value="Malam">Malam</option>
            </select>
          </div>

          <div className="sm:col-span-5 space-y-1">
            <label htmlFor="log-note" className="block text-[12px] text-[#b4b4b4]">
              Catatan kejadian siaran atau perangkat
            </label>
            <input
              id="log-note"
              type="text"
              required
              placeholder="Misalnya: Koneksi telepon narasumber jernih, tanpa kendala..."
              value={newLogEntry}
              onChange={(e) => setNewLogEntry(e.target.value)}
              className="cockpit-input"
            />
          </div>

          <div className="sm:col-span-2">
            <button type="submit" className="cockpit-btn primary w-full">
              Simpan Log
            </button>
          </div>
        </div>
      </form>

      <div className="cockpit-card">
        <table>
          <thead>
            <tr>
              <th className="py-2.5 px-3 text-left text-[12px] font-normal text-[#949494]">
                Penyiar &amp; Shift
              </th>
              <th className="py-2.5 px-3 text-left text-[12px] font-normal text-[#949494]">
                Catatan Operasional
              </th>
              <th className="py-2.5 px-3 text-right text-[12px] font-normal text-[#949494] tabular">
                Waktu (WIB)
              </th>
            </tr>
          </thead>
          <tbody>
            {logNotes.map((log) => (
              <tr key={log.id} className="cockpit-row">
                <td className="py-3 px-3 align-baseline whitespace-nowrap">
                  <span className="text-[14px] font-medium text-white">{log.announcer}</span>
                  <span className="block text-[12px] text-[#949494]">Shift {log.shift}</span>
                </td>
                <td className="py-3 px-3 align-baseline text-[14px] text-[#b4b4b4]">
                  {log.note}
                </td>
                <td className="py-3 px-3 align-baseline text-right text-[13px] text-white tabular whitespace-nowrap">
                  {log.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
