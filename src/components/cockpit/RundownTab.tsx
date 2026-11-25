"use client";

import React, { useState } from "react";
import { RundownItem } from "@/data/radioData";
import { ChevronDown, ChevronUp } from "lucide-react";

interface RundownTabProps {
  rundownList: RundownItem[];
  setRundownList: React.Dispatch<React.SetStateAction<RundownItem[]>>;
  showAddForm?: boolean;
  setShowAddForm?: (v: boolean) => void;
}

export default function RundownTab({
  rundownList,
  setRundownList,
  showAddForm = false,
  setShowAddForm,
}: RundownTabProps) {
  const [showCompleted, setShowCompleted] = useState(false);
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
      host: newItem.host || "Penyiar Studio",
      type: newItem.type,
      status: "SCHEDULED",
      producerNote: newItem.producerNote || "Segmen tambahan ruang siaran.",
    };

    setRundownList([...rundownList, item]);
    setNewItem({ timeSlot: "", title: "", host: "", type: "LIVE", producerNote: "" });
    setShowAddForm?.(false);
  };

  const activeAndUpcoming = rundownList.filter((i) => i.status !== "COMPLETED");
  const completedItems = rundownList.filter((i) => i.status === "COMPLETED");

  const statusLabel = (s: RundownItem["status"]) => {
    if (s === "ON_AIR") return { text: "Mengudara", cls: "pos" };
    if (s === "UP_NEXT") return { text: "Berikutnya", cls: "warn" };
    if (s === "COMPLETED") return { text: "Selesai", cls: "" };
    return { text: "Terjadwal", cls: "" };
  };

  return (
    <div className="cockpit-card h-full flex flex-col justify-between gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="m-0 text-[16px] font-semibold text-white">
            Urutan segmen aktif &amp; berikutnya
          </h2>
          <p className="m-0 text-[12px] text-[#949494] mt-0.5">
            Segmen yang sedang mengudara ditampilkan paling atas agar langsung terbaca penyiar.
          </p>
        </div>

        {completedItems.length > 0 && (
          <button
            type="button"
            onClick={() => setShowCompleted(!showCompleted)}
            className="cockpit-btn !h-[32px] !px-3 !text-[12px]"
          >
            <span>
              {showCompleted
                ? `Sembunyikan ${completedItems.length} segmen selesai`
                : `Riwayat pagi (${completedItems.length} selesai)`}
            </span>
            {showCompleted ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="cockpit-well space-y-3">
          <p className="m-0 text-[14px] font-medium text-white">Tambah segmen ke rundown hari ini</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor="rd-slot" className="block text-[12px] text-[#b4b4b4]">
                Jam tayang (WIB)
              </label>
              <input
                id="rd-slot"
                type="text"
                required
                placeholder="15:00–17:00"
                value={newItem.timeSlot}
                onChange={(e) => setNewItem({ ...newItem, timeSlot: e.target.value })}
                className="cockpit-input tabular"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="rd-title" className="block text-[12px] text-[#b4b4b4]">
                Nama program
              </label>
              <input
                id="rd-title"
                type="text"
                required
                placeholder="Youth Agape Sound"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="cockpit-input"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="rd-host" className="block text-[12px] text-[#b4b4b4]">
                Penyiar bertugas
              </label>
              <input
                id="rd-host"
                type="text"
                placeholder="Kevin & Michelle"
                value={newItem.host}
                onChange={(e) => setNewItem({ ...newItem, host: e.target.value })}
                className="cockpit-input"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="rd-note" className="block text-[12px] text-[#b4b4b4]">
              Catatan produser untuk meja siaran
            </label>
            <textarea
              id="rd-note"
              rows={2}
              placeholder="Arahan bumper, narasumber telepon, atau sesi sapaan pendengar..."
              value={newItem.producerNote}
              onChange={(e) => setNewItem({ ...newItem, producerNote: e.target.value })}
              className="cockpit-textarea resize-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm?.(false)}
              className="cockpit-btn !h-[32px]"
            >
              Batal
            </button>
            <button type="submit" className="cockpit-btn primary !h-[32px]">
              Simpan Segmen
            </button>
          </div>
        </form>
      )}

      {/* Active & Upcoming Rows First */}
      <div>
        {activeAndUpcoming.length === 0 ? (
          <div className="p-6 text-center text-[13px] text-[#b4b4b4] rounded-xl border border-dashed border-[#444444]">
            Seluruh segmen hari ini telah ditandai selesai.
          </div>
        ) : (
          activeAndUpcoming.map((item) => {
            const st = statusLabel(item.status);
            return (
              <div
                key={item.id}
                className={`cockpit-row py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                  item.status === "ON_AIR" ? "cockpit-well mb-2" : ""
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[13px] text-[#b4b4b4] tabular font-medium">
                      {item.timeSlot} WIB
                    </span>
                    <span className={`cockpit-pill ${st.cls}`}>{st.text}</span>
                    <span className="text-[12px] text-[#949494]">{item.type}</span>
                  </div>
                  <p className="m-0 text-[15px] font-semibold text-white">{item.title}</p>
                  <p className="m-0 text-[13px] text-[#b4b4b4]">Penyiar: {item.host}</p>
                  {item.producerNote && (
                    <p className="m-0 text-[13px] text-[#b4b4b4] pt-0.5">
                      Catatan: <span className="text-white">{item.producerNote}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-none">
                  {item.status !== "ON_AIR" && (
                    <button
                      type="button"
                      onClick={() => setOnAir(item.id)}
                      className="cockpit-btn primary !h-[32px] !px-3 !text-[12px]"
                    >
                      Naikkan On-Air
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setCompleted(item.id)}
                    className="cockpit-btn !h-[32px] !px-3 !text-[12px]"
                  >
                    Tandai Selesai
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Completed Morning History (No Set ON-AIR button on finished shows) */}
      {showCompleted && completedItems.length > 0 && (
        <div className="pt-2 space-y-2">
          <p className="m-0 text-[12px] text-[#949494]">Segmen pagi yang telah selesai</p>
          {completedItems.map((item) => (
            <div
              key={item.id}
              className="cockpit-row py-2.5 flex flex-wrap items-baseline justify-between gap-2 text-[#949494]"
            >
              <div className="space-y-0.5">
                <span className="text-[13px] tabular mr-2.5">{item.timeSlot} WIB</span>
                <span className="text-[14px] text-[#b4b4b4] font-medium">{item.title}</span>
                <span className="text-[12px] ml-2">({item.host})</span>
              </div>
              <span className="cockpit-pill">Selesai</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
