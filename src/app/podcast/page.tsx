"use client";

import React, { useState } from "react";
import { MOCK_PODCASTS, PodcastEpisode } from "@/data/radioData";
import { useAudio } from "@/context/AudioContext";
import { 
  Headphones, 
  Search, 
  Play, 
  Pause, 
  Calendar, 
  Clock, 
  BookOpen, 
  Rss, 
  Share2 
} from "lucide-react";

export default function PodcastPage() {
  const { currentTrack, isPlaying, playPodcast, togglePlay } = useAudio();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("Semua");

  const seriesList = [
    "Semua",
    "Embun Pagi Seri Mazmur",
    "Bahtera Keluarga",
    "Khotbah Minggu Raya",
    "Youth Agape Talks"
  ];

  const filteredPodcasts = MOCK_PODCASTS.filter((pod) => {
    const matchesSearch = 
      pod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pod.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pod.showNotes.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeries = selectedSeries === "Semua" || pod.series === selectedSeries;

    return matchesSearch && matchesSeries;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
          <Headphones className="w-4 h-4" /> Audio on Demand & Khotbah
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Podcast Radio Agape
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Dengarkan kembali rekaman firman, renungan berseri, dan talkshow keluarga kapan saja dengan kontrol audio lengkap dan kecepatan putar fleksibel.
        </p>

        {/* RSS Syndication Banner */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
          <Rss className="w-4 h-4 text-orange-400" />
          <span>Tersedia pula via RSS Feed otomatis untuk Spotify & Apple Podcasts</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        {/* Series Filter */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {seriesList.map((series) => (
            <button
              key={series}
              onClick={() => setSelectedSeries(series)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedSeries === series
                  ? "bg-agape-600 text-white shadow"
                  : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {series}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul atau pembicara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-agape-500 transition"
          />
        </div>
      </div>

      {/* Podcast Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPodcasts.map((pod) => {
          const isThisTrackPlaying = currentTrack.id === pod.id && isPlaying;

          return (
            <div
              key={pod.id}
              className={`flex flex-col sm:flex-row gap-5 p-5 sm:p-6 rounded-2xl border transition-all ${
                currentTrack.id === pod.id
                  ? "bg-slate-900/90 border-agape-500 ring-1 ring-agape-500/40 shadow-xl shadow-agape-500/10"
                  : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700"
              }`}
            >
              {/* Cover Art */}
              <div className="relative w-full sm:w-44 h-48 sm:h-auto rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pod.coverImage}
                  alt={pod.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    if (currentTrack.id === pod.id) {
                      togglePlay();
                    } else {
                      playPodcast(pod);
                    }
                  }}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-agape-600/90 hover:bg-agape-500 text-white flex items-center justify-center shadow-lg transition transform hover:scale-110 active:scale-95"
                  aria-label="Putar podcast"
                >
                  {isThisTrackPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>
                <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950/80 text-amber-400 backdrop-blur-sm">
                  {pod.duration}
                </span>
              </div>

              {/* Content Details */}
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {pod.series}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                    {pod.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium pt-0.5">
                    <span className="text-slate-200 font-semibold">{pod.speaker}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {pod.publishedDate}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 text-[11px] text-agape-300 font-medium">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ayat: <strong>{pod.scripture}</strong></span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 pt-1">
                    {pod.showNotes}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (currentTrack.id === pod.id) {
                        togglePlay();
                      } else {
                        playPodcast(pod);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-agape-600 to-amber-600 hover:brightness-110 text-white shadow transition"
                  >
                    {isThisTrackPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" /> Jeda Audio
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" /> Putar Episode
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Tautan episode berhasil disalin ke clipboard!");
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-xs flex items-center gap-1"
                    title="Bagikan episode"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Bagikan</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
