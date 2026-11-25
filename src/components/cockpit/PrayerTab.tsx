"use client";

import React, { useState } from "react";
import { PrayerRequest } from "@/data/radioData";

interface PrayerTabProps {
  prayerList: PrayerRequest[];
  setPrayerList: React.Dispatch<React.SetStateAction<PrayerRequest[]>>;
}

export default function PrayerTab({ prayerList, setPrayerList }: PrayerTabProps) {
  const [filter, setFilter] = useState<
    "ALL" | "BROADCAST_READY" | "PASTORAL" | "COMPLETED"
  >("ALL");

  const updateStatus = (id: string, status: PrayerRequest["status"]) => {
    const updated = prayerList.map((p) => (p.id === id ? { ...p, status } : p));
    setPrayerList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("agape_prayers", JSON.stringify(updated));
    }
  };

  const counts = {
    ALL: prayerList.length,
    BROADCAST_READY: prayerList.filter(
      (p) => p.allowBroadcast && p.status !== "COMPLETED"
    ).length,
    PASTORAL: prayerList.filter((p) => !p.allowBroadcast && p.status !== "COMPLETED")
      .length,
    COMPLETED: prayerList.filter((p) => p.status === "COMPLETED").length,
  };

  const filterCards: {
    key: typeof filter;
    label: string;
    count: number;
  }[] = [
    { key: "ALL", label: "Semua pokok doa", count: counts.ALL },
    { key: "BROADCAST_READY", label: "Siap dibaca di udara", count: counts.BROADCAST_READY },
    { key: "PASTORAL", label: "Khusus tim pastoral", count: counts.PASTORAL },
    { key: "COMPLETED", label: "Telah didoakan", count: counts.COMPLETED },
  ];

  const filtered = prayerList.filter((p) => {
    if (filter === "BROADCAST_READY") return p.allowBroadcast && p.status !== "COMPLETED";
    if (filter === "PASTORAL") return !p.allowBroadcast && p.status !== "COMPLETED";
    if (filter === "COMPLETED") return p.status === "COMPLETED";
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Pattern from App Sheet: Count cards that filter */}
      <div
        role="tablist"
        aria-label="Saring permohonan doa berdasarkan status"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
      >
        {filterCards.map((card) => {
          const selected = filter === card.key;
          return (
            <button
              key={card.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(card.key)}
              className="text-left rounded-xl p-3 cursor-pointer transition-colors"
              style={{
                backgroundColor: selected ? "#14222b" : "#111111",
                border: selected ? "1.5px solid #4cb3f0" : "1px solid #1a1a1a",
              }}
            >
              <span className="block text-[13px] text-[#b4b4b4]">{card.label}</span>
              <span className="block text-[18px] font-semibold text-white tabular mt-1">
                {card.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Prayer Queue List */}
      <div className="cockpit-card">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-[13px] text-[#b4b4b4] rounded-xl border border-dashed border-[#444444]">
            Tidak ada pokok doa pada saringan ini.
          </div>
        ) : (
          filtered.map((prayer) => (
            <div key={prayer.id} className="cockpit-row py-4 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[15px] font-semibold text-white">
                    {prayer.senderName}
                  </span>
                  <span className="text-[13px] text-[#b4b4b4]">· {prayer.city}</span>
                  <span className="text-[12px] text-[#949494]">
                    · {prayer.category} · {prayer.createdAt}
                  </span>
                </div>

                {prayer.status === "ON_AIR_READING" ? (
                  <span className="cockpit-pill pos">Sedang Dibacakan</span>
                ) : prayer.status === "COMPLETED" ? (
                  <span className="cockpit-pill">Selesai Didoakan</span>
                ) : prayer.allowBroadcast ? (
                  <span className="cockpit-pill warn">Izin Baca On-Air</span>
                ) : (
                  <span className="cockpit-pill">Rahasia Pastoral</span>
                )}
              </div>

              <p className="m-0 text-[14px] text-[#e6e6e6] leading-relaxed max-w-[78ch]">
                “{prayer.content}”
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  {prayer.allowBroadcast &&
                    prayer.status !== "ON_AIR_READING" &&
                    prayer.status !== "COMPLETED" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(prayer.id, "ON_AIR_READING")}
                        className="cockpit-btn primary !h-[32px] !px-3 !text-[12px]"
                      >
                        Bacakan di Udara
                      </button>
                    )}

                  {prayer.status !== "COMPLETED" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(prayer.id, "COMPLETED")}
                      className="cockpit-btn !h-[32px] !px-3 !text-[12px]"
                    >
                      Tandai Selesai
                    </button>
                  )}
                </div>

                {prayer.phone && (
                  <a
                    href={`https://wa.me/${prayer.phone.replace(/[^0-9]/g, "")}?text=Shalom%20${encodeURIComponent(
                      prayer.senderName
                    )},%20permohonan%20doa%20Anda%20telah%20kami%20bawa%20dalam%20doa%20di%20Radio%20Agape.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[#b4b4b4] hover:text-white underline underline-offset-4"
                  >
                    Kirim sapaan WhatsApp pastoral
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
