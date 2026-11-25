"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAudio } from "@/context/AudioContext";
import { RADIO_INFO, MOCK_SCHEDULE, MOCK_PODCASTS } from "@/data/radioData";
import { withBasePath } from "@/lib/utils";
import SplitStage from "@/components/stage/SplitStage";
import { Play, Pause, Plus } from "lucide-react";

export default function HomePage() {
  const { currentTrack, isPlaying, isLive, playLive, playPodcast, togglePlay } = useAudio();
  const [selectedPodIdx, setSelectedPodIdx] = useState(0);

  const currentProgram = MOCK_SCHEDULE[2]; // 09:00–11:00 Bincang Keluarga Bahtera Kasih
  const nextProgram = MOCK_SCHEDULE[3]; // 11:00–13:00 Alunan Pujian di Tengah Hari
  const activePod = MOCK_PODCASTS[selectedPodIdx] || MOCK_PODCASTS[0];
  const isPodPlaying = currentTrack.id === activePod.id && isPlaying;

  const scheduleGroups = [
    {
      id: "grp-fajar",
      label: "Fajar & Saat Teduh",
      span: "05:00–09:00 WIB",
      items: MOCK_SCHEDULE.slice(0, 2),
      defaultOpen: false,
    },
    {
      id: "grp-pagi",
      label: "Sedang Mengudara · Keluarga",
      span: "09:00–11:00 WIB",
      items: [MOCK_SCHEDULE[2]],
      defaultOpen: true,
    },
    {
      id: "grp-siang",
      label: "Pujian Tengah Hari",
      span: "11:00–13:00 WIB",
      items: [MOCK_SCHEDULE[3]],
      defaultOpen: false,
    },
    {
      id: "grp-syafaat",
      label: "Ruang Syafaat & Doa Kota",
      span: "13:00–15:00 WIB",
      items: [MOCK_SCHEDULE[4]],
      defaultOpen: false,
    },
    {
      id: "grp-sore",
      label: "Sore & Perjalanan Pulang",
      span: "15:00–19:00 WIB",
      items: MOCK_SCHEDULE.slice(5, 7),
      defaultOpen: false,
    },
    {
      id: "grp-malam",
      label: "Mimbar Firman & Malam Teduh",
      span: "19:00–00:00 WIB",
      items: MOCK_SCHEDULE.slice(7, 9),
      defaultOpen: false,
    },
  ];

  return (
    <div>
      {/* 1. THE SPLIT STAGE: Left Reading Sheet + Sticky Right Semarang Broadcast Stage */}
      <section className="px-[var(--margin)] pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-[var(--gutter)] gap-y-10 items-start">
          {/* Block 1: Hero Introduction (First on phone & tablet, top-left on desktop) */}
          <div className="lg:col-span-6 lg:col-start-1 pt-5 lg:pt-12 lg:pr-10 space-y-6 max-w-[46ch]">
            <h1 className="type-display lines m-0 text-paper-ink">
              <span className="line">
                <span data-line style={{ ["--i" as string]: 0 }}>
                  Siaran 24 jam
                </span>
              </span>
              <span className="line">
                <span data-line style={{ ["--i" as string]: 1 }}>
                  dari Semarang
                </span>
              </span>
            </h1>

            <p
              data-load
              style={{ ["--d" as string]: "140ms" }}
              className="type-body m-0 text-paper-ink max-w-[42ch]"
            >
              Radio Agape 94.5 FM menyiarkan pujian penyembahan, pembacaan Alkitab nonstop, dan
              bincang keluarga dari Jl. Pringgading 13 tanpa terputus saat Anda berpindah halaman.
            </p>

            <div
              data-load
              style={{ ["--d" as string]: "220ms" }}
              className="flex flex-wrap items-center gap-5 pt-1"
            >
              <button
                type="button"
                onClick={() => (isLive && isPlaying ? togglePlay() : playLive("main"))}
                className="btn-flat"
              >
                {isLive && isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Jeda Siaran 94.5 FM</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Dengarkan Siaran Langsung</span>
                  </>
                )}
              </button>

              <Link href="/doa" className="text-action type-body">
                Titipkan pokok doa
              </Link>
            </div>

            {/* Current On-Air Program Fact Sheet */}
            <div
              data-load
              style={{ ["--d" as string]: "280ms" }}
              className="bg-paper-surface p-6 space-y-2.5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 type-small text-paper-muted tabular">
                <span className="font-semibold text-paper-accent">
                  Mengudara sekarang · 94.5 MHz
                </span>
                <span>
                  {currentProgram.startTime}–{currentProgram.endTime} WIB
                </span>
              </div>
              <p className="m-0 type-lead text-paper-ink">{currentProgram.title}</p>
              <p className="m-0 type-body text-paper-ink">
                Bersama {currentProgram.host}. Berikutnya pukul {nextProgram.startTime} WIB:{" "}
                {nextProgram.title}.
              </p>
              <div className="pt-1">
                <a
                  href={RADIO_INFO.whatsappBroadcast}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-action type-small"
                >
                  Kirim salam atau request lagu lewat WhatsApp Studio
                </a>
              </div>
            </div>
          </div>

          {/* Block 2: Semarang Stage & 5-Channel Tuner (Second on phone, Sticky Right Half on Desktop) */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 self-stretch">
            <SplitStage initialSlide={0} />
          </div>

          {/* Block 3 (list blueprint): Schedule Accordion Bars Scrolling Down Left Sheet */}
          <div className="lg:col-span-6 lg:col-start-1 pt-6 lg:pt-14 lg:pr-10 space-y-6 max-w-[54ch]">
            <h2 data-reveal className="type-display m-0 text-paper-ink">
              Jadwal
            </h2>

            <p
              data-reveal
              style={{ ["--delay" as string]: "55ms" }}
              className="type-body m-0 text-paper-ink max-w-[44ch]"
            >
              Rangkaian mata acara hari ini dari doa fajar pukul lima pagi hingga pembacaan Mazmur
              tengah malam.
            </p>

            <div className="space-y-1.5 pt-1">
              {scheduleGroups.map((grp, idx) => (
                <details
                  key={grp.id}
                  open={grp.defaultOpen}
                  data-reveal
                  style={{ ["--delay" as string]: `${Math.min((idx + 1) * 45, 220)}ms` }}
                  className="schedule-bar bg-paper-surface"
                >
                  <summary className="min-h-[56px] px-5 py-3.5 flex items-center justify-between gap-4 text-paper-ink select-none">
                    <span className="font-medium type-body">{grp.label}</span>
                    <span className="flex items-center gap-3 flex-none">
                      <span className="type-small text-paper-muted tabular">{grp.span}</span>
                      <Plus className="w-4 h-4 text-paper-ink bar-plus" />
                    </span>
                  </summary>

                  <div className="px-5 pb-5 pt-1 space-y-4">
                    {grp.items.map((item) => (
                      <div key={item.id} className="space-y-1.5">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="font-semibold type-body text-paper-ink">
                            {item.title}
                          </span>
                          <span className="type-small text-paper-muted tabular flex-none">
                            {item.startTime}–{item.endTime}
                          </span>
                        </div>
                        <p className="m-0 type-small text-paper-muted">Penyiar: {item.host}</p>
                        <p className="m-0 type-body text-paper-ink">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <div data-reveal className="pt-2">
              <Link href="/jadwal" className="text-action type-body">
                Lihat susunan jadwal 7 hari penuh
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOWCASE (Square plate, spare text — breaks the split to span full width) */}
      <section className="bg-paper-surface px-[var(--margin)] py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gutter)] items-stretch min-h-[78svh]">
          {/* Left Half: Square Receiver Plate with Broadcast Disc Motif + Muted Wave Loop */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6 lg:pr-8">
            <div className="relative aspect-square w-full max-w-[560px] bg-paper-ink overflow-clip shutter">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath("/media/vacuum-tube-radio-receiver-philips-680a-img.jpg")}
                width={1920}
                height={1371}
                alt="Pesawat penerima radio tabung klasik dengan kain pengeras suara dan kaca penunjuk gelombang kota"
                loading="lazy"
                decoding="async"
                className="plate-photo"
              />
              {/* Flat graphic ring motif representing tuning disc & audio reel */}
              <svg
                viewBox="0 0 200 200"
                aria-hidden="true"
                className="absolute inset-0 w-[82%] h-[82%] m-auto pointer-events-none"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="86"
                  fill="none"
                  stroke="#ebe5e3"
                  strokeWidth="4"
                  opacity="0.72"
                />
                <circle cx="100" cy="100" r="8" fill="#ebe5e3" opacity="0.85" />
              </svg>
            </div>

            {/* Muted Acoustic Wave Video Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center max-w-[560px]">
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
                Rekaman khotbah direkam langsung dari meja operator Semarang dan disindikasikan ke
                RSS podcast.
              </p>
            </div>
          </div>

          {/* Right Half: Flex Column Space-Between */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-10 lg:pl-6 py-2">
            {/* Plain text episode selector tabs */}
            <div className="space-y-5" data-reveal>
              <h2 className="type-head m-0 text-paper-ink">Rekaman khotbah</h2>
              <div
                role="tablist"
                aria-label="Pilih seri rekaman khotbah"
                className="flex flex-wrap items-center gap-x-6 gap-y-2"
              >
                {MOCK_PODCASTS.map((pod, idx) => {
                  const selected = idx === selectedPodIdx;
                  return (
                    <button
                      key={pod.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setSelectedPodIdx(idx)}
                      className={`p-0 bg-transparent border-0 cursor-pointer type-body transition-colors ${
                        selected
                          ? "text-paper-ink font-semibold underline underline-offset-[6px]"
                          : "text-paper-muted hover:text-paper-ink font-normal"
                      }`}
                    >
                      {pod.shortTab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Episode Details */}
            <div
              className="space-y-4 max-w-[42ch]"
              data-reveal
              style={{ ["--delay" as string]: "65ms" }}
            >
              <p className="m-0 type-small text-paper-muted tabular">
                {activePod.series} · {activePod.duration} · {activePod.scripture}
              </p>
              <p className="m-0 type-lead font-semibold text-paper-ink">{activePod.title}</p>
              <p className="m-0 type-small font-medium text-paper-ink">
                Pembicara: {activePod.speaker} ({activePod.publishedDate})
              </p>
              <p className="m-0 type-body text-paper-ink">{activePod.showNotes}</p>
            </div>

            {/* Two Filled Rectangular Action Cells Side by Side */}
            <div
              data-reveal
              style={{ ["--delay" as string]: "120ms" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[520px]"
            >
              <button
                type="button"
                onClick={() => (isPodPlaying ? togglePlay() : playPodcast(activePod))}
                className="min-h-[60px] px-6 bg-paper-ink text-[#ebe5e3] hover:bg-paper-accent border-0 cursor-pointer flex items-center justify-between type-body font-medium transition-colors"
              >
                <span>{isPodPlaying ? "Jeda Episode Ini" : "Putar Episode Ini"}</span>
                {isPodPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
              </button>

              <Link
                href="/podcast"
                className="min-h-[60px] px-6 bg-paper text-paper-ink hover:bg-paper-strong no-underline flex items-center justify-between type-body font-medium transition-colors"
              >
                <span>Semua 4 Rekaman</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT (Pastoral letter paired with Kota Lama Semarang portrait so both sides hold weight) */}
      <section className="px-[var(--margin)] py-24 lg:py-32 bg-paper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gutter)] items-center">
          <div className="lg:col-span-6 lg:pr-12 space-y-6 max-w-[52ch]">
            <h2 data-reveal className="type-head m-0 text-paper-ink">
              Surat ruang siaran
            </h2>

            <p
              data-reveal
              style={{ ["--delay" as string]: "55ms" }}
              className="type-body m-0 text-paper-ink"
            >
              Setiap pagi sebelum pukul lima, lampu ruang operator di Jl. Pringgading 13 dinyalakan
              agar suara doa dan pembacaan firman dapat menemani rumah-rumah yang mulai terbangun di
              Semarang.
            </p>

            <p
              data-reveal
              style={{ ["--delay" as string]: "100ms" }}
              className="type-body m-0 text-paper-ink"
            >
              Banyak pendengar menyalakan radio sambil menyiapkan sarapan, menjaga toko, atau
              menemani orang tua yang beristirahat di rumah. Karena itu kami menyediakan{" "}
              <span className="bg-paper-surface px-1.5 py-0.5 font-medium">
                lima saluran siaran serentak
              </span>
              , mulai dari siaran studio langsung 94.5 MHz hingga pembacaan Alkitab suara sepanjang
              24 jam penuh.
            </p>

            <p
              data-reveal
              style={{ ["--delay" as string]: "145ms" }}
              className="type-body m-0 text-paper-ink"
            >
              Bila hari ini hati Anda sedang berat, Anda tidak perlu memikulnya sendiri. Kirimkan
              pokok doa Anda untuk kami bawa bersama pada jam Ruang Syafaat pukul 13:00 WIB atau
              didoakan secara khusus oleh tim pastoral.
            </p>

            <div data-reveal style={{ ["--delay" as string]: "190ms" }} className="pt-3 space-y-1">
              <p className="m-0 type-lead italic text-paper-ink">
                Tim Pelayanan Radio Agape 94.5 FM
              </p>
              <p className="m-0 type-small text-paper-muted">
                Jl. Pringgading 13 ·{" "}
                <Link href="/donasi" className="text-action">
                  Yayasan Media Kasih Agape
                </Link>
              </p>
            </div>
          </div>

          <figure
            data-reveal
            style={{ ["--delay" as string]: "95ms" }}
            className="lg:col-span-6 m-0 space-y-3"
          >
            <div className="aspect-[4/5] max-h-[76svh] w-full overflow-clip bg-paper-surface shutter">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath("/media/bangunan-kompleks-kota-lama-semarang-01.jpg")}
                width={1920}
                height={2560}
                alt="Balkon dan atap bangunan tua di kawasan Kota Lama Semarang menghadap langit sore"
                loading="lazy"
                decoding="async"
                className="plate-photo"
              />
            </div>
            <figcaption className="type-small text-paper-muted">
              Sudut teduh Kota Lama Semarang di dekat Jl. Pringgading.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 4. CTA (Full-bleed Semarang Bandungan dawn photograph, text confined to right half on desktop) */}
      <section className="relative bg-paper-ink text-[#ebe5e3]">
        <div className="relative h-[52svh] lg:h-[84svh] w-full overflow-clip">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/media/sunrise-bandungan-semarang-regency-2014-10-01.jpg")}
            width={1920}
            height={1280}
            alt="Sinar fajar menembus kabut pagi di atas perbukitan Bandungan Kabupaten Semarang"
            loading="lazy"
            decoding="async"
            className="plate-photo object-[center_35%]"
          />
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-0"
            style={{
              background: "rgba(22, 18, 16, 0.58)",
            }}
          />

          {/* Desktop Right-Half Overlay */}
          <div className="hidden lg:grid grid-cols-12 items-end h-full absolute inset-0 px-[var(--margin)] pb-20">
            <div className="col-start-7 col-span-6 space-y-5 max-w-[42ch]" data-reveal>
              <h2 className="type-head m-0 text-[#ffffff]">Titipkan pokok doa</h2>
              <p className="type-body m-0 text-[#ebe5e3]">
                Sampaikan pergumulan kesehatan, keluarga, atau pekerjaan Anda untuk didoakan pada
                Ruang Syafaat pukul 13:00 WIB maupun secara pribadi oleh tim pastoral kami.
              </p>
              <div className="pt-2">
                <Link
                  href="/doa"
                  className="inline-flex items-center justify-center min-h-[52px] px-7 bg-paper text-paper-ink font-medium type-body no-underline hover:bg-paper-surface transition-colors"
                >
                  Tulis Permohonan Doa
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Solid Block Below Image (per cta blueprint) */}
        <div className="lg:hidden px-[var(--margin)] py-12 space-y-5 bg-paper-ink text-[#ebe5e3]">
          <h2 className="type-head m-0 text-[#ffffff]">Titipkan pokok doa</h2>
          <p className="type-body m-0 text-[#ebe5e3]">
            Sampaikan pergumulan Anda untuk didoakan pada Ruang Syafaat pukul 13:00 WIB maupun
            secara pribadi oleh tim pastoral kami.
          </p>
          <Link
            href="/doa"
            className="w-full inline-flex items-center justify-center min-h-[52px] px-6 bg-paper text-paper-ink font-medium type-body no-underline"
          >
            Tulis Permohonan Doa
          </Link>
        </div>
      </section>
    </div>
  );
}
