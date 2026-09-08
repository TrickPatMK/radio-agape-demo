"use client";

import React, { useState } from "react";
import { PodcastEpisode } from "@/data/radioData";
import { CheckCircle2 } from "lucide-react";

interface PodcastTabProps {
  podcasts: PodcastEpisode[];
  setPodcasts: React.Dispatch<React.SetStateAction<PodcastEpisode[]>>;
}

export default function PodcastTab({ podcasts, setPodcasts }: PodcastTabProps) {
  const [success, setSuccess] = useState(false);
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
      title: newPod.title,
      speaker: newPod.speaker,
      duration: newPod.duration,
      durationSeconds: 1500,
      publishedDate: "Hari Ini",
      scripture: newPod.scripture || "Renungan Firman",
      showNotes: newPod.showNotes,
      audioUrl: newPod.audioUrl,
      coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80",
    };

    setPodcasts([episode, ...podcasts]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
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
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Publikasi Rekaman Khotbah & Podcast Baru</h2>
        <p className="text-xs text-slate-400">Unggah episode baru agar langsung tampil di katalog website dan terdistribusi via RSS ke Spotify.</p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Episode podcast berhasil diterbitkan! Telah muncul di katalog website publik.
        </div>
      )}

      <form onSubmit={handleCreate} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Judul Episode Khotbah / Renungan <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Menemukan Kedamaian di Musim Sukar"
              value={newPod.title}
              onChange={(e) => setNewPod({ ...newPod, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Nama Pengkhotbah / Pembicara <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Pdt. Dr. Samuel Halim"
              value={newPod.speaker}
              onChange={(e) => setNewPod({ ...newPod, speaker: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Seri Podcast</label>
            <select
              value={newPod.series}
              onChange={(e) => setNewPod({ ...newPod, series: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Embun Pagi Seri Mazmur">Embun Pagi Seri Mazmur</option>
              <option value="Bahtera Keluarga">Bahtera Keluarga</option>
              <option value="Khotbah Minggu Raya">Khotbah Minggu Raya</option>
              <option value="Youth Agape Talks">Youth Agape Talks</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Ayat Rujukan</label>
            <input
              type="text"
              placeholder="Mazmur 23:1-6"
              value={newPod.scripture}
              onChange={(e) => setNewPod({ ...newPod, scripture: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Durasi Audio</label>
            <input
              type="text"
              placeholder="28:15"
              value={newPod.duration}
              onChange={(e) => setNewPod({ ...newPod, duration: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Ringkasan Materi / Show Notes</label>
          <textarea
            rows={3}
            placeholder="Poin-poin penting renungan atau kutipan khotbah..."
            value={newPod.showNotes}
            onChange={(e) => setNewPod({ ...newPod, showNotes: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-agape-600 to-amber-600 hover:brightness-110 text-white shadow-md transition"
        >
          Terbitkan Episode Podcast Sekarang &rarr;
        </button>
      </form>
    </div>
  );
}
