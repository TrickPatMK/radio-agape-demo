"use client";

import React, { useState, useEffect } from "react";
import StudioHeader from "@/components/cockpit/StudioHeader";
import RundownTab from "@/components/cockpit/RundownTab";
import PrayerTab from "@/components/cockpit/PrayerTab";
import PodcastTab from "@/components/cockpit/PodcastTab";
import LogbookTab from "@/components/cockpit/LogbookTab";
import { 
  INITIAL_RUNDOWN, 
  INITIAL_PRAYER_REQUESTS, 
  MOCK_PODCASTS, 
  RundownItem, 
  PrayerRequest, 
  PodcastEpisode 
} from "@/data/radioData";
import { Radio, HeartHandshake, Headphones, FileText } from "lucide-react";

export default function CockpitPage() {
  const [activeTab, setActiveTab] = useState<"rundown" | "prayers" | "podcast" | "logbook">("rundown");
  const [rundownList, setRundownList] = useState<RundownItem[]>(INITIAL_RUNDOWN);
  const [prayerList, setPrayerList] = useState<PrayerRequest[]>(INITIAL_PRAYER_REQUESTS);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>(MOCK_PODCASTS);

  // Sync prayer requests from localStorage if any were submitted from /doa
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* 1. Real-time Studio Header & Telemetry */}
      <StudioHeader />

      {/* 2. Cockpit Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800">
        <button
          onClick={() => setActiveTab("rundown")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === "rundown"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Radio className="w-4 h-4" />
          Rundown Siaran Hari Ini ({rundownList.length})
        </button>

        <button
          onClick={() => setActiveTab("prayers")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === "prayers"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          Live Prayer Moderation ({prayerList.filter((p) => p.status !== "COMPLETED").length} Aktif)
        </button>

        <button
          onClick={() => setActiveTab("podcast")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === "podcast"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Headphones className="w-4 h-4" />
          Publikasi Podcast ({podcasts.length})
        </button>

        <button
          onClick={() => setActiveTab("logbook")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === "logbook"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <FileText className="w-4 h-4" />
          Logbook Shift Siaran
        </button>
      </div>

      {/* 3. Tab Contents */}
      {activeTab === "rundown" && (
        <RundownTab rundownList={rundownList} setRundownList={setRundownList} />
      )}

      {activeTab === "prayers" && (
        <PrayerTab prayerList={prayerList} setPrayerList={setPrayerList} />
      )}

      {activeTab === "podcast" && (
        <PodcastTab podcasts={podcasts} setPodcasts={setPodcasts} />
      )}

      {activeTab === "logbook" && (
        <LogbookTab />
      )}
    </div>
  );
}
