"use client";

import React, { useState } from "react";
import { MOCK_PODCASTS } from "@/data/radioData";
import { useAudio } from "@/context/AudioContext";
import { withBasePath } from "@/lib/utils";
import SplitStage from "@/components/stage/SplitStage";
import { Play, Pause, Check, Share2 } from "lucide-react";

export default function PodcastPage() {
  const { currentTrack, isPlaying, playPodcast, togglePlay } = useAudio();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("Semua");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const seriesList = [
    "Semua",
    "Embun Pagi Seri Mazmur",
    "Bahtera Keluarga",
    "Khotbah Minggu Raya",
    "Youth Agape Talks",
  ];

  const filteredPodcasts = MOCK_PODCASTS.filter((pod) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      pod.title.toLowerCase().includes(q) ||
      pod.speaker.toLowerCase().includes(q) ||
      pod.scripture.toLowerCase().includes(q) ||
      pod.showNotes.toLowerCase().includes(q);
    const matchesSeries = selectedSeries === "Semua" || pod.series === selectedSeries;
    return matchesSearch && matchesSeries;
  });

  const handleShare = (id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/podcast#${id}`);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2200);
    }
  };

  return (
    <section className="px-[var(--margin)] pb-20 lg:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-[var(--gutter)] gap-y-10 items-start">
        {/* Block 1: Hero Introduction */}
        <div className="lg:col-span-6 lg:col-start-1 pt-5 lg:pt-12 lg:pr-10 space-y-6 max-w-[48ch]">
          <h1 className="type-display lines m-0 text-paper-ink">
            <span className="line">
              <span data-line style={{ ["--i" as string]: 0 }}>
                Arsip khotbah audio
              </span>
            </span>
          </h1>

          <p
            data-load
            style={{ ["--d" as string]: "140ms" }}
            className="type-body m-0 text-paper-ink"
          >
            Dengarkan kembali rekaman khotbah Minggu, renungan pagi Mazmur, dan bincang keluarga
            kapan saja lengkap dengan rujukan ayat Alkitab serta pengatur kecepatan suara.
          </p>

          <div data-load style={{ ["--d" as string]: "220ms" }}>
            <button
              type="button"
              onClick={() => playPodcast(MOCK_PODCASTS[0])}
              className="btn-flat"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Putar Rekaman Terbaru</span>
            </button>
          </div>
        </div>

        {/* Block 2: Sticky Semarang Broadcast Stage */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 self-stretch">
          <SplitStage initialSlide={1} />
        </div>

        {/* Block 3: Search, Series Filter & Episode Archive */}
        <div className="lg:col-span-6 lg:col-start-1 pt-4 lg:pt-10 lg:pr-10 space-y-6">
          <div className="space-y-4">
            <h2 data-reveal className="type-head m-0 text-paper-ink">
              Semua rekaman seri
            </h2>

            <div data-reveal style={{ ["--delay" as string]: "45ms" }} className="space-y-2.5">
              <label htmlFor="podcast-search" className="block type-small text-paper-muted">
                Cari judul khotbah, pembicara, atau kitab rujukan
              </label>
              <input
                id="podcast-search"
                type="search"
                placeholder="Misalnya: Mazmur 46 atau Pdt. Yohanes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="paper-field"
              />
            </div>

            <div
              data-reveal
              style={{ ["--delay" as string]: "90ms" }}
              role="group"
              aria-label="Saring berdasarkan seri khotbah"
              className="flex flex-wrap items-center gap-2 pt-1"
            >
              {seriesList.map((series) => {
                const active = selectedSeries === series;
                return (
                  <button
                    key={series}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedSeries(series)}
                    className={`min-h-[40px] px-3.5 border-0 cursor-pointer type-small transition-colors ${
                      active
                        ? "bg-paper-ink text-[#ebe5e3] font-semibold"
                        : "bg-paper-surface text-paper-ink hover:bg-paper-strong"
                    }`}
                  >
                    {series}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Episode List */}
          {filteredPodcasts.length === 0 ? (
            <div className="bg-paper-surface p-8 space-y-2">
              <p className="m-0 type-body font-medium text-paper-ink">
                Tidak ada episode yang cocok dengan pencarian tersebut.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSeries("Semua");
                }}
                className="text-action bg-transparent border-0 p-0 cursor-pointer type-small"
              >
                Tampilkan kembali seluruh 4 rekaman
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredPodcasts.map((pod, idx) => {
                const isThisPlaying = currentTrack.id === pod.id && isPlaying;
                return (
                  <article
                    id={pod.id}
                    key={pod.id}
                    data-reveal
                    style={{ ["--delay" as string]: `${idx * 50}ms` }}
                    className={`p-5 sm:p-6 space-y-4 ${
                      currentTrack.id === pod.id ? "bg-paper-strong" : "bg-paper-surface"
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                      <div className="sm:col-span-4 aspect-[4/3] overflow-clip bg-paper-ink">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pod.coverImage}
                          width={640}
                          height={480}
                          alt={pod.coverAlt}
                          loading="lazy"
                          decoding="async"
                          className="plate-photo"
                        />
                      </div>

                      <div className="sm:col-span-8 space-y-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 type-small text-paper-muted tabular">
                          <span>{pod.series}</span>
                          <span>{pod.duration}</span>
                        </div>
                        <h3 className="m-0 type-lead text-paper-ink">{pod.title}</h3>
                        <p className="m-0 type-small text-paper-muted">
                          {pod.speaker} · {pod.publishedDate} · {pod.scripture}
                        </p>
                        <p className="m-0 type-body text-paper-ink">{pod.showNotes}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          currentTrack.id === pod.id ? togglePlay() : playPodcast(pod)
                        }
                        className="btn-flat !min-h-[42px] !py-2 !px-4 !text-[14px]"
                      >
                        {isThisPlaying ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>Jeda Audio</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>Putar Episode</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShare(pod.id)}
                        className="min-h-[40px] px-3 bg-transparent border-0 cursor-pointer text-paper-ink flex items-center gap-1.5 type-small"
                      >
                        {copiedId === pod.id ? (
                          <>
                            <Check className="w-4 h-4 text-paper-accent" />
                            <span>Tautan tersalin</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4" />
                            <span>Salin tautan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Acoustic Wave Loop Strip */}
          <div
            data-reveal
            className="bg-paper-surface p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
          >
            <div className="sm:col-span-5 aspect-video bg-paper-ink overflow-clip">
              <video
                data-loop-video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={withBasePath("/media/tuning-fork-creates-waves-in-water-poster.jpg")}
                width={854}
                height={480}
                aria-hidden="true"
                className="plate-photo"
              >
                <source
                  src={withBasePath("/media/tuning-fork-creates-waves-in-water.webm")}
                  type="video/webm"
                />
              </video>
            </div>
            <p className="sm:col-span-7 m-0 type-body text-paper-ink">
              Tersedia pula melalui umpan sindikasi RSS otomatis untuk didengarkan di aplikasi
              Spotify dan Apple Podcasts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
