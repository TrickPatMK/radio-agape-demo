"use client";

import React, { useEffect, useState } from "react";
import { useAudio } from "@/context/AudioContext";
import { RADIO_INFO, STAGE_SLIDES } from "@/data/radioData";
import { formatTime } from "@/lib/utils";
import { Play, Pause, Volume2, VolumeX, RotateCcw, RotateCw, Loader2 } from "lucide-react";

interface SplitStageProps {
  initialSlide?: number;
}

export default function SplitStage({ initialSlide = 0 }: SplitStageProps) {
  const {
    currentTrack,
    isPlaying,
    isLive,
    volume,
    isMuted,
    currentTime,
    duration,
    playbackRate,
    isLoading,
    activeChannelId,
    togglePlay,
    playLive,
    seekTo,
    skipSeconds,
    setVolume,
    toggleMute,
    setSpeed,
  } = useAudio();

  const [slideIndex, setSlideIndex] = useState(initialSlide % STAGE_SLIDES.length);

  // Slow crossfade signature move from the direction sheet (paused on hidden tab or reduced motion)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setSlideIndex((prev) => (prev + 1) % STAGE_SLIDES.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = STAGE_SLIDES[slideIndex];
  const channelIdx = Math.max(
    0,
    RADIO_INFO.channels.findIndex((c) => c.id === activeChannelId)
  );

  const cycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIndex = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  return (
    <aside
      aria-label="Panggung siaran dan penyetel gelombang 94.5 FM"
      className="relative w-full h-[54svh] lg:h-[calc(100svh-5.25rem)] lg:sticky lg:top-[4.5rem] bg-paper overflow-clip flex flex-col justify-between"
    >
      {/* Crossfading Semarang architectural photographs */}
      <div className="relative flex-1 min-h-0 overflow-clip bg-paper-ink">
        {STAGE_SLIDES.map((slide, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.id}
            src={slide.src}
            width={slide.width}
            height={slide.height}
            alt={slide.alt}
            fetchPriority={idx === 0 ? "high" : "auto"}
            decoding="async"
            className={`stage-photo ${idx === slideIndex ? "is-active" : ""}`}
          />
        ))}

        {/* Neutral legibility scrim at bottom of photo only */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{
            background: "rgba(24, 20, 18, 0.62)",
          }}
        />

        {/* Slide caption & quiet selector */}
        <div className="absolute inset-x-0 bottom-0 px-4 py-3 flex items-end justify-between gap-4 text-[#ebe5e3]">
          <p className="type-small m-0 max-w-[38ch]">{activeSlide.caption}</p>
          <div
            className="flex items-center gap-1.5"
            role="group"
            aria-label="Pilih foto suasana Semarang"
          >
            {STAGE_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSlideIndex(idx)}
                aria-label={`Tampilkan foto: ${s.windowLabel}`}
                aria-pressed={idx === slideIndex}
                className="w-6 h-6 flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer"
              >
                <span
                  className="block transition-transform duration-200"
                  style={{
                    width: idx === slideIndex ? "18px" : "7px",
                    height: "7px",
                    backgroundColor:
                      idx === slideIndex ? "#ffffff" : "rgba(235, 229, 227, 0.55)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* THE ONE LIVE THING: Real 5-channel 94.5 MHz Broadcast Tuner & Audio Deck (data-ui, flush with stage margins) */}
      <div data-ui className="bg-paper text-paper-ink pt-3.5 pb-1 space-y-3">
        {/* Top readout + Play/Pause */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[13px] text-paper-muted font-medium">
              <span
                className="inline-block w-2 h-2"
                style={{
                  backgroundColor: isPlaying ? "#085830" : "#564d49",
                }}
              />
              <span className="tabular">
                {isLive ? "Pemancar Langsung · 24 Jam" : "Rekaman Khotbah · On-Demand"}
              </span>
            </div>
            <p
              className="m-0 text-[17px] font-semibold leading-snug truncate text-paper-ink"
              title={currentTrack.title}
            >
              {currentTrack.title}
            </p>
            <p
              className="m-0 text-[13px] text-paper-muted truncate"
              title={currentTrack.subtitle}
            >
              {currentTrack.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-none">
            {!isLive && (
              <button
                type="button"
                onClick={() => skipSeconds(-10)}
                className="w-10 h-10 flex items-center justify-center bg-paper-surface text-paper-ink hover:bg-paper-strong cursor-pointer border-0"
                title="Mundur 10 detik"
                aria-label="Mundur 10 detik"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={togglePlay}
              className="h-10 px-4 flex items-center justify-center gap-2 bg-paper-accent text-white font-medium text-[14px] cursor-pointer border-0 hover:bg-[#054223] transition-colors"
              aria-label={isPlaying ? "Jeda pemutaran audio" : "Putar audio sekarang"}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
              <span>{isPlaying ? "Jeda" : "Putar"}</span>
            </button>

            {!isLive && (
              <button
                type="button"
                onClick={() => skipSeconds(30)}
                className="w-10 h-10 flex items-center justify-center bg-paper-surface text-paper-ink hover:bg-paper-strong cursor-pointer border-0"
                title="Maju 30 detik"
                aria-label="Maju 30 detik"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Podcast Scrub Bar when an episode is loaded */}
        {!isLive && duration > 0 && (
          <div className="flex items-center gap-3 text-[13px] tabular text-paper-muted">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seekTo(parseFloat(e.target.value))}
              aria-label="Geser posisi durasi khotbah"
              className="flex-1 h-1.5 bg-paper-surface accent-[#085830] cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
            <button
              type="button"
              onClick={cycleSpeed}
              className="px-2 py-0.5 bg-paper-surface text-paper-ink font-medium text-[12px] border-0 cursor-pointer"
              title="Ubah kecepatan suara"
            >
              {playbackRate}x
            </button>
          </div>
        )}

        {/* Interactive 5-Band Frequency Scale (edge-to-edge with stage margins) */}
        <div className="space-y-1.5">
          <div className="relative h-1.5 bg-paper-strong overflow-hidden" aria-hidden="true">
            <div
              className="absolute top-0 bottom-0 w-1/5 bg-paper-accent transition-transform duration-300"
              style={{
                transform: `translateX(${isLive ? channelIdx * 100 : 0}%)`,
              }}
            />
          </div>

          <div
            className="grid grid-cols-5 gap-1"
            role="group"
            aria-label="Pilih saluran siaran Radio Agape"
          >
            {RADIO_INFO.channels.map((ch) => {
              const selected = isLive && activeChannelId === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => playLive(ch.id)}
                  aria-pressed={selected}
                  className={`py-2 px-1 text-center border-0 cursor-pointer transition-colors ${
                    selected
                      ? "bg-paper-ink text-[#ebe5e3] font-semibold"
                      : "bg-paper-surface text-paper-ink hover:bg-paper-strong"
                  }`}
                >
                  <span className="block text-[12px] tabular leading-tight">{ch.dialMark}</span>
                  <span className="block text-[11px] leading-tight truncate opacity-85 mt-0.5">
                    {ch.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom bar: Studio address & volume */}
        <div className="flex items-center justify-between gap-4 text-[13px] text-paper-muted">
          <span className="truncate">Siaran 24 jam · Jl. Pringgading 13, Semarang</span>
          <div className="hidden sm:flex items-center gap-2 flex-none">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Nyalakan suara" : "Bisukan suara"}
              className="p-1 bg-transparent border-0 text-paper-ink cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volume suara radio"
              className="w-20 h-1 bg-paper-strong accent-[#085830] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
