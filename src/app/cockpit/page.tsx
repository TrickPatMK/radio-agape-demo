"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import StudioHeader, { useStreamTelemetry } from "@/components/cockpit/StudioHeader";
import ListenerChart from "@/components/cockpit/ListenerChart";
import RundownTab from "@/components/cockpit/RundownTab";
import PrayerTab from "@/components/cockpit/PrayerTab";
import PodcastTab from "@/components/cockpit/PodcastTab";
import LogbookTab from "@/components/cockpit/LogbookTab";
import { useAudio } from "@/context/AudioContext";
import {
  RADIO_INFO,
  INITIAL_RUNDOWN,
  INITIAL_PRAYER_REQUESTS,
  MOCK_PODCASTS,
  RundownItem,
  PrayerRequest,
  PodcastEpisode,
} from "@/data/radioData";
import {
  Radio,
  MessageSquareHeart,
  Disc3,
  ClipboardList,
  Play,
  Pause,
  Plus,
  X,
  ArrowLeft,
} from "lucide-react";

type CockpitView = "rundown" | "prayers" | "podcast" | "logbook";

export default function CockpitPage() {
  const [activeTab, setActiveTab] = useState<CockpitView>("rundown");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddSegment, setShowAddSegment] = useState(false);
  const [rundownList, setRundownList] = useState<RundownItem[]>(INITIAL_RUNDOWN);
  const [prayerList, setPrayerList] = useState<PrayerRequest[]>(INITIAL_PRAYER_REQUESTS);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>(MOCK_PODCASTS);

  const { telemetry, refresh } = useStreamTelemetry();
  const { isPlaying, isLive, activeChannelId, playLive, togglePlay } = useAudio();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("agape_prayers");
      if (stored) {
        try {
          setPrayerList(JSON.parse(stored));
        } catch (e) {
          console.error("Error reading stored prayers", e);
        }
      }
    }
  }, []);

  const updatePrayerStatus = (id: string, status: PrayerRequest["status"]) => {
    const updated = prayerList.map((p) => (p.id === id ? { ...p, status } : p));
    setPrayerList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("agape_prayers", JSON.stringify(updated));
    }
  };

  const onAirSegment =
    rundownList.find((r) => r.status === "ON_AIR") || rundownList[0];
  const pendingBroadcastPrayers = prayerList.filter(
    (p) => p.allowBroadcast && p.status !== "COMPLETED"
  );
  const unresolvedPrayers = prayerList.filter((p) => p.status !== "COMPLETED");
  const unresolvedPrayerCount = unresolvedPrayers.length;

  const viewMeta: Record<CockpitView, { title: string; finding: string }> = {
    rundown: {
      title: "Cockpit Siaran Hari Ini",
      finding: `Sedang mengudara: ${onAirSegment.title} (${onAirSegment.timeSlot} WIB) · ${pendingBroadcastPrayers.length} pokok doa di udara, ${
        unresolvedPrayerCount - pendingBroadcastPrayers.length
      } doa pastoral.`,
    },
    prayers: {
      title: "Moderasi Pokok Doa",
      finding: `${pendingBroadcastPrayers.length} pokok doa diizinkan baca di udara · ${
        unresolvedPrayerCount - pendingBroadcastPrayers.length
      } doa pribadi khusus tim pastoral.`,
    },
    podcast: {
      title: "Publikasi Rekaman Khotbah",
      finding: `${podcasts.length} episode tayang pada katalog web dan umpan sindikasi RSS.`,
    },
    logbook: {
      title: "Logbook Shift Studio",
      finding: "Catatan operasional harian penyiar dan teknisi Jl. Pringgading 13.",
    },
  };

  const navItems: {
    id: CockpitView;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    queueCount?: number;
  }[] = [
    { id: "rundown", label: "Ikhtisar & Rundown", icon: Radio },
    {
      id: "prayers",
      label: "Moderasi Doa",
      icon: MessageSquareHeart,
      queueCount: unresolvedPrayerCount,
    },
    { id: "podcast", label: "Publikasi Podcast", icon: Disc3 },
    { id: "logbook", label: "Logbook Shift", icon: ClipboardList },
  ];

  return (
    <div className="cockpit-app">
      <div className="cockpit-shell">
        {/* Left Sidebar: Ruled T-frame on True Black */}
        <aside
          aria-label="Navigasi Cockpit Studio"
          className={`cockpit-sidebar ${sidebarOpen ? "is-open" : ""}`}
        >
          {/* Product Mark & Scope */}
          <div className="flex items-center justify-between gap-2 px-2 pb-5">
            <div className="flex items-center gap-2.5 min-w-0">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                aria-hidden="true"
                className="flex-none"
              >
                <circle
                  cx="13"
                  cy="13"
                  r="11"
                  fill="none"
                  stroke="#4cb3f0"
                  strokeWidth="2"
                />
                <circle cx="13" cy="13" r="4" fill="#4cb3f0" />
              </svg>
              <div className="min-w-0">
                <span className="block text-[15px] font-semibold text-white leading-tight truncate">
                  Agape 94.5 FM
                </span>
                <span className="block text-[12px] text-[#949494] leading-tight truncate">
                  Studio Semarang
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Tutup navigasi"
              className="md:hidden cockpit-btn !h-[32px] !px-2.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <span className="px-2 pb-1.5 text-[12px] text-[#949494]">Meja Siaran</span>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={active ? "page" : undefined}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full h-[36px] px-2.5 rounded-lg border-0 bg-transparent cursor-pointer flex items-center justify-between gap-2 text-left transition-colors ${
                    active
                      ? "bg-[#222222] text-white font-medium"
                      : "text-[#b4b4b4] hover:text-white hover:bg-[#161616]"
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 flex-none text-[#b4b4b4]" />
                    <span className="text-[14px] truncate">{item.label}</span>
                  </span>

                  {typeof item.queueCount === "number" && item.queueCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#2c1a20] text-[#e5566f] text-[11px] font-semibold tabular">
                      {item.queueCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Utilities: Audio Monitor & Return to Listener Site */}
          <div className="mt-auto pt-6 space-y-2 px-1">
            <button
              type="button"
              onClick={() => (isLive && isPlaying ? togglePlay() : playLive("main"))}
              className="cockpit-btn w-full justify-start"
            >
              {isLive && isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              <span>{isLive && isPlaying ? "Matikan Monitor" : "Monitor Suara 94.5"}</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] text-[#b4b4b4] hover:text-white no-underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Buka Situs Pendengar</span>
            </Link>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <div className="min-w-0 flex flex-col">
          <StudioHeader
            telemetry={telemetry}
            onRefresh={refresh}
            onOpenMenu={() => setSidebarOpen(true)}
          />

          <main className="p-4 sm:p-6 space-y-4">
            {/* Title Row + Single Primary Action */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="m-0 text-[24px] font-semibold leading-tight tracking-[-0.01em] text-white">
                  {viewMeta[activeTab].title}
                </h1>
                <p className="m-0 text-[14px] text-[#b4b4b4] max-w-[76ch]">
                  {viewMeta[activeTab].finding}
                </p>
              </div>

              {activeTab === "rundown" && (
                <button
                  type="button"
                  onClick={() => setShowAddSegment(!showAddSegment)}
                  className="cockpit-btn primary"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Segmen</span>
                </button>
              )}
            </div>

            {/* Divided 4-Column KPI Strip (Type only, no icons in tinted squares) */}
            <section aria-label="Ringkasan metrik siaran" className="cockpit-kpis">
              <div className="cockpit-kpi">
                <span className="block text-[13px] text-[#b4b4b4]">Jam segmen aktif</span>
                <span className="block text-[24px] font-medium text-white tabular mt-1 leading-tight">
                  {onAirSegment.timeSlot} <small className="text-[13px] text-[#949494]">WIB</small>
                </span>
                <span className="block text-[12px] text-[#949494] truncate mt-1">
                  {onAirSegment.host}
                </span>
              </div>

              <div className="cockpit-kpi">
                <span className="block text-[13px] text-[#b4b4b4]">Pendengar streaming</span>
                <span className="block text-[24px] font-medium text-white tabular mt-1 leading-tight">
                  {telemetry.online ? telemetry.totalListeners : 0}{" "}
                  <small className="text-[13px] text-[#949494]">aktif</small>
                </span>
                <span className="block text-[12px] text-[#949494] tabular mt-1">
                  Puncak hari ini {Math.max(24, telemetry.peakListeners ?? 0, telemetry.totalListeners)} pendengar
                </span>
              </div>

              <div className="cockpit-kpi">
                <span className="block text-[13px] text-[#b4b4b4]">Antrean doa aktif</span>
                <span className="block text-[24px] font-medium text-white tabular mt-1 leading-tight">
                  {unresolvedPrayerCount}{" "}
                  <small className="text-[13px] text-[#949494]">permohonan</small>
                </span>
                <span className="block text-[12px] text-[#949494] tabular mt-1">
                  {pendingBroadcastPrayers.length} di udara ·{" "}
                  {unresolvedPrayerCount - pendingBroadcastPrayers.length} pastoral
                </span>
              </div>

              <div className="cockpit-kpi">
                <span className="block text-[13px] text-[#b4b4b4]">Episode podcast tayang</span>
                <span className="block text-[24px] font-medium text-white tabular mt-1 leading-tight">
                  {podcasts.length}{" "}
                  <small className="text-[13px] text-[#949494]">rekaman</small>
                </span>
                <span className="block text-[12px] text-[#949494] mt-1">
                  5 mount Icecast terdaftar
                </span>
              </div>
            </section>

            {/* View Content */}
            {activeTab === "rundown" && (
              <div className="space-y-4">
                {/* Row 1: Hourly Listener Chart + 5 Icecast Mounts (Balanced bottom edge) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-8">
                    <ListenerChart
                      liveListeners={telemetry.online ? telemetry.totalListeners : 0}
                    />
                  </div>

                  <section
                    aria-label="Jalur mount server Icecast"
                    className="lg:col-span-4 cockpit-card flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h2 className="m-0 text-[16px] font-semibold text-white">
                        Mount server Icecast
                      </h2>
                      <span className="text-[12px] text-[#949494] tabular">5 saluran</span>
                    </div>

                    <div>
                      {RADIO_INFO.channels.map((ch) => {
                        const mountPath = ch.url.replace("http://radio.agapefm.com:8000", "");
                        const monitoring = isLive && isPlaying && activeChannelId === ch.id;
                        return (
                          <div
                            key={ch.id}
                            className="cockpit-row py-2 flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <span className="block text-[13px] font-medium text-white truncate">
                                {ch.shortLabel}
                              </span>
                              <span className="block text-[11px] text-[#949494] tabular truncate">
                                {mountPath}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                monitoring ? togglePlay() : playLive(ch.id)
                              }
                              className={`cockpit-pill border-0 cursor-pointer ${
                                monitoring
                                  ? "pos"
                                  : telemetry.online
                                  ? ""
                                  : "neg"
                              }`}
                            >
                              {monitoring
                                ? "Monitor"
                                : telemetry.online
                                ? ch.dialMark
                                : "Putus"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </div>

                {/* Row 2: Active Rundown (3 items) + Active Prayer Queue (3 items) (Balanced bottom edge) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-7">
                    <RundownTab
                      rundownList={rundownList}
                      setRundownList={setRundownList}
                      showAddForm={showAddSegment}
                      setShowAddForm={setShowAddSegment}
                    />
                  </div>

                  <section
                    aria-label="Antrean doa aktif"
                    className="lg:col-span-5 cockpit-card flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <div>
                        <h2 className="m-0 text-[16px] font-semibold text-white">
                          Antrean doa aktif
                        </h2>
                        <p className="m-0 text-[12px] text-[#949494] mt-0.5">
                          Pokok doa on-air dan pendampingan pastoral yang belum selesai.
                        </p>
                      </div>
                      <span className="text-[12px] text-[#949494] tabular flex-none">
                        {unresolvedPrayerCount} aktif
                      </span>
                    </div>

                    {unresolvedPrayers.length === 0 ? (
                      <div className="p-5 text-center text-[13px] text-[#b4b4b4] rounded-xl border border-dashed border-[#444444]">
                        Seluruh pokok doa telah selesai didoakan.
                      </div>
                    ) : (
                      <div>
                        {unresolvedPrayers.slice(0, 3).map((p) => (
                          <div key={p.id} className="cockpit-row py-3 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[14px] font-medium text-white truncate">
                                {p.senderName} · {p.city}
                              </span>
                              <span
                                className={`cockpit-pill ${
                                  !p.allowBroadcast
                                    ? "neg"
                                    : p.status === "ON_AIR_READING"
                                    ? "pos"
                                    : "warn"
                                }`}
                              >
                                {!p.allowBroadcast
                                  ? "Khusus Pastoral"
                                  : p.status === "ON_AIR_READING"
                                  ? "Dibaca"
                                  : p.category}
                              </span>
                            </div>
                            <p className="m-0 text-[13px] text-[#b4b4b4] line-clamp-2 leading-snug">
                              “{p.content}”
                            </p>
                            <div className="flex items-center gap-2 pt-0.5">
                              {p.allowBroadcast && p.status !== "ON_AIR_READING" && (
                                <button
                                  type="button"
                                  onClick={() => updatePrayerStatus(p.id, "ON_AIR_READING")}
                                  className="cockpit-btn primary !h-[30px] !px-2.5 !text-[12px]"
                                >
                                  Bacakan
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => updatePrayerStatus(p.id, "COMPLETED")}
                                className="cockpit-btn !h-[30px] !px-2.5 !text-[12px]"
                              >
                                Selesai
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setActiveTab("prayers")}
                      className="cockpit-btn w-full !h-[34px] !text-[13px]"
                    >
                      Buka semua {prayerList.length} pokok doa
                    </button>
                  </section>
                </div>
              </div>
            )}

            {activeTab === "prayers" && (
              <PrayerTab prayerList={prayerList} setPrayerList={setPrayerList} />
            )}

            {activeTab === "podcast" && (
              <PodcastTab podcasts={podcasts} setPodcasts={setPodcasts} />
            )}

            {activeTab === "logbook" && <LogbookTab />}
          </main>
        </div>
      </div>
    </div>
  );
}
