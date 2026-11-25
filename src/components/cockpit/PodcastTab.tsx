"use client";

import React, { useState } from "react";
import { PodcastEpisode } from "@/data/radioData";
import { withBasePath } from "@/lib/utils";

interface PodcastTabProps {
  podcasts: PodcastEpisode[];
  setPodcasts: React.Dispatch<React.SetStateAction<PodcastEpisode[]>>;
}

export default function PodcastTab({ podcasts, setPodcasts }: PodcastTabProps) {
  const [savedTitle, setSavedTitle] = useState<string | null>(null);
  const [newPod, setNewPod] = useState({
    title: "",
    speaker: "",
    series: "Embun Pagi Seri Mazmur",
    scripture: "",
    duration: "25:00",
    showNotes: "",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPod.title || !newPod.speaker) return;

    const episode: PodcastEpisode = {
      id: `pod-${Date.now()}`,
      series: newPod.series,
      shortTab: newPod.scripture || "Terbaru",
      title: newPod.title,
      speaker: newPod.speaker,
      duration: newPod.duration,
      durationSeconds: 1500,
      publishedDate: "Hari ini",
      scripture: newPod.scripture || "Renungan Firman",
      showNotes: newPod.showNotes || "Rekaman siaran khotbah Radio Agape Semarang.",
      audioUrl: newPod.audioUrl,
      coverImage: withBasePath("/media/semarang-lawang-sewu-02.jpg"),
      coverAlt: "Gedung bersejarah Lawang Sewu Semarang",
    };

    setPodcasts([episode, ...podcasts]);
    setSavedTitle(episode.title);
    window.setTimeout(() => setSavedTitle(null), 3500);
    setNewPod({
      title: "",
      speaker: "",
      series: "Embun Pagi Seri Mazmur",
      scripture: "",
      duration: "25:00",
      showNotes: "",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
      {/* Left: Publish Form */}
      <form onSubmit={handleCreate} className="lg:col-span-7 cockpit-card space-y-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="m-0 text-[16px] font-semibold text-white">
            Terbitkan episode khotbah baru
          </h2>
          {savedTitle && (
            <span className="cockpit-pill pos">Tersimpan: {savedTitle.slice(0, 22)}</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1.5">
            <label htmlFor="pod-title" className="block text-[13px] text-[#b4b4b4]">
              Judul rekaman khotbah *
            </label>
            <input
              id="pod-title"
              type="text"
              required
              placeholder="Menemukan Damai di Musim Sukar"
              value={newPod.title}
              onChange={(e) => setNewPod({ ...newPod, title: e.target.value })}
              className="cockpit-input"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="pod-speaker" className="block text-[13px] text-[#b4b4b4]">
              Pengkhotbah atau pembicara *
            </label>
            <input
              id="pod-speaker"
              type="text"
              required
              placeholder="Pdt. Dr. Samuel Halim"
              value={newPod.speaker}
              onChange={(e) => setNewPod({ ...newPod, speaker: e.target.value })}
              className="cockpit-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="space-y-1.5">
            <label htmlFor="pod-series" className="block text-[13px] text-[#b4b4b4]">
              Seri program
            </label>
            <select
              id="pod-series"
              value={newPod.series}
              onChange={(e) => setNewPod({ ...newPod, series: e.target.value })}
              className="cockpit-input"
            >
              <option value="Embun Pagi Seri Mazmur">Embun Pagi Seri Mazmur</option>
              <option value="Bahtera Keluarga">Bahtera Keluarga</option>
              <option value="Khotbah Minggu Raya">Khotbah Minggu Raya</option>
              <option value="Youth Agape Talks">Youth Agape Talks</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="pod-ref" className="block text-[13px] text-[#b4b4b4]">
              Ayat rujukan
            </label>
            <input
              id="pod-ref"
              type="text"
              placeholder="Mazmur 23:1–6"
              value={newPod.scripture}
              onChange={(e) => setNewPod({ ...newPod, scripture: e.target.value })}
              className="cockpit-input"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="pod-dur" className="block text-[13px] text-[#b4b4b4]">
              Durasi (menit:detik)
            </label>
            <input
              id="pod-dur"
              type="text"
              placeholder="28:15"
              value={newPod.duration}
              onChange={(e) => setNewPod({ ...newPod, duration: e.target.value })}
              className="cockpit-input tabular"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="pod-notes" className="block text-[13px] text-[#b4b4b4]">
            Ringkasan materi (show notes)
          </label>
          <textarea
            id="pod-notes"
            rows={3}
            placeholder="Pokok-pokok khotbah untuk pendengar aplikasi dan RSS..."
            value={newPod.showNotes}
            onChange={(e) => setNewPod({ ...newPod, showNotes: e.target.value })}
            className="cockpit-textarea resize-none"
          />
        </div>

        <div className="pt-1">
          <button type="submit" className="cockpit-btn primary">
            Terbitkan ke Katalog &amp; RSS
          </button>
        </div>
      </form>

      {/* Right: Live Published Episodes Table/List */}
      <div className="lg:col-span-5 cockpit-card space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="m-0 text-[16px] font-semibold text-white">Katalog tayang</h2>
          <span className="text-[12px] text-[#949494] tabular">{podcasts.length} episode</span>
        </div>

        <div>
          {podcasts.map((ep) => (
            <div
              key={ep.id}
              className="cockpit-row py-3 flex items-baseline justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="m-0 text-[14px] font-medium text-white truncate">{ep.title}</p>
                <p className="m-0 text-[12px] text-[#949494] truncate">
                  {ep.speaker} · {ep.scripture}
                </p>
              </div>
              <span className="text-[13px] text-[#b4b4b4] tabular flex-none">{ep.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
