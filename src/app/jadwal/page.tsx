"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getScheduleForDay } from "@/data/radioData";
import { useAudio } from "@/context/AudioContext";
import { withBasePath } from "@/lib/utils";
import SplitStage from "@/components/stage/SplitStage";
import { Play, Pause } from "lucide-react";

export default function JadwalPage() {
  const [selectedDay, setSelectedDay] = useState(1); // Senin default
  const { isPlaying, isLive, playLive, togglePlay } = useAudio();

  const days = [
    { value: 1, label: "Senin" },
    { value: 2, label: "Selasa" },
    { value: 3, label: "Rabu" },
    { value: 4, label: "Kamis" },
    { value: 5, label: "Jumat" },
    { value: 6, label: "Sabtu" },
    { value: 0, label: "Minggu" },
  ];

  const scheduleForDay = getScheduleForDay(selectedDay);
  const onAirProgram = scheduleForDay[2];

  return (
    <section className="px-[var(--margin)] pb-20 lg:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-[var(--gutter)] gap-y-10 items-start">
        {/* Block 1: Hero Introduction (First on phone & tablet, top-left on desktop) */}
        <div className="lg:col-span-6 lg:col-start-1 pt-5 lg:pt-12 lg:pr-10 space-y-6 max-w-[48ch]">
          <h1 className="type-display lines m-0 text-paper-ink">
            <span className="line">
              <span data-line style={{ ["--i" as string]: 0 }}>
                Jadwal siaran harian
              </span>
            </span>
          </h1>

          <p
            data-load
            style={{ ["--d" as string]: "140ms" }}
            className="type-body m-0 text-paper-ink"
          >
            Susunan program Radio Agape 94.5 FM Semarang sepanjang tujuh hari dalam waktu Indonesia
            Barat, dari doa fajar pukul 05:00 hingga kidung malam pukul 00:00.
          </p>

          {/* Active On-Air Callout Right Above the Fold */}
          <div
            data-load
            style={{ ["--d" as string]: "220ms" }}
            className="bg-paper-surface p-6 space-y-3"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 type-small tabular">
              <span className="font-semibold text-paper-accent">Sedang mengudara sekarang</span>
              <span className="text-paper-muted">
                {onAirProgram.startTime}–{onAirProgram.endTime} WIB
              </span>
            </div>
            <p className="m-0 type-lead text-paper-ink">{onAirProgram.title}</p>
            <p className="m-0 type-small text-paper-muted">
              Penyiar: {onAirProgram.host} · {onAirProgram.category}
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => (isLive && isPlaying ? togglePlay() : playLive("main"))}
                className="btn-flat"
              >
                {isLive && isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Jeda Siaran Ini</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Putar Siaran Ini</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Block 2: Sticky Semarang Broadcast Stage */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 self-stretch">
          <SplitStage initialSlide={2} />
        </div>

        {/* Block 3: Wrapping Day Selector + Complete Day Schedule */}
        <div className="lg:col-span-6 lg:col-start-1 pt-4 lg:pt-10 lg:pr-10 space-y-6">
          <div className="space-y-4" data-reveal>
            <h2 className="type-head m-0 text-paper-ink">Susunan jam siaran</h2>
            <div
              role="tablist"
              aria-label="Pilih hari siaran"
              className="flex flex-wrap items-center gap-2"
            >
              {days.map((d) => {
                const active = selectedDay === d.value;
                return (
                  <button
                    key={d.value}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedDay(d.value)}
                    className={`min-h-[42px] px-4 border-0 cursor-pointer type-small transition-colors ${
                      active
                        ? "bg-paper-ink text-[#ebe5e3] font-semibold"
                        : "bg-paper-surface text-paper-ink hover:bg-paper-strong font-normal"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2.5">
            {scheduleForDay.map((item, index) => {
              const isOnAir = index === 2;
              return (
                <article
                  key={item.id}
                  data-reveal
                  style={{ ["--delay" as string]: `${Math.min(index * 35, 210)}ms` }}
                  className={`p-5 space-y-2 ${isOnAir ? "bg-paper-strong" : "bg-paper-surface"}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="tabular font-semibold type-small text-paper-ink">
                      {item.startTime}–{item.endTime} WIB
                    </span>
                    <span
                      className={`type-small ${
                        isOnAir ? "text-paper-accent font-semibold" : "text-paper-muted"
                      }`}
                    >
                      {isOnAir ? "Sedang Mengudara" : item.category}
                    </span>
                  </div>
                  <h3 className="m-0 type-lead text-paper-ink">{item.title}</h3>
                  <p className="m-0 type-small text-paper-muted">Bersama {item.host}</p>
                  <p className="m-0 type-body text-paper-ink max-w-[52ch]">{item.description}</p>
                </article>
              );
            })}
          </div>

          {/* Muted Acoustic Wave Video Strip */}
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
            <div className="sm:col-span-7 space-y-1.5">
              <p className="m-0 type-body font-medium text-paper-ink">
                Ingin pokok doa Anda dibacakan pada Ruang Syafaat pukul 13:00 WIB?
              </p>
              <p className="m-0 type-small">
                <Link href="/doa" className="text-action">
                  Kirimkan pokok doa ke meja siaran
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
