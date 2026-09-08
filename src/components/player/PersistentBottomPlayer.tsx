"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAudio } from "@/context/AudioContext";
import { formatTime } from "@/lib/utils";
import { RADIO_INFO } from "@/data/radioData";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Radio, 
  Headphones, 
  Loader2,
  Gauge,
  ListMusic
} from "lucide-react";

export default function PersistentBottomPlayer() {
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

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showChannelMenu, setShowChannelMenu] = useState(false);

  const cycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIndex = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTo(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 text-white backdrop-blur-lg border-t border-slate-800/80 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-all">
      {/* Mini Progress Bar for Podcasts */}
      {!isLive && duration > 0 && (
        <div className="relative w-full h-1.5 bg-slate-800 cursor-pointer group">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div 
            className="h-full bg-gradient-to-r from-agape-500 to-amber-400 group-hover:h-2 transition-all"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-6">
        {/* LEFT: Track Information & Official Logo */}
        <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial sm:w-72 md:w-80">
          <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-md border border-slate-700 bg-slate-900 p-1 flex items-center justify-center">
            <Image 
              src={currentTrack.coverImage || "/agapelogo.png"} 
              alt={currentTrack.title} 
              width={56} 
              height={56} 
              className="w-full h-full object-contain"
            />
            {isLive && (
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            )}
          </div>

          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2">
              {isLive ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600/90 text-white tracking-wider uppercase">
                  <Radio className="w-2.5 h-2.5" /> 94.5 FM LIVE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Headphones className="w-2.5 h-2.5" /> PODCAST
                </span>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-slate-100 truncate mt-0.5" title={currentTrack.title}>
              {currentTrack.title}
            </h4>
            <p className="text-xs text-slate-400 truncate" title={currentTrack.subtitle}>
              {currentTrack.subtitle}
            </p>
          </div>
        </div>

        {/* CENTER: Playback Controls & Waveform */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-xl">
          <div className="flex items-center gap-2 sm:gap-4">
            {!isLive && (
              <button
                onClick={() => skipSeconds(-10)}
                className="p-1.5 sm:p-2 text-slate-400 hover:text-white transition rounded-full hover:bg-slate-800"
                title="Mundur 10 detik"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            <button
              onClick={togglePlay}
              className="p-3 sm:p-3.5 bg-agape-500 hover:bg-agape-400 text-white rounded-full shadow-lg shadow-agape-500/30 transition transform hover:scale-105 active:scale-95 flex items-center justify-center"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
              )}
            </button>

            {!isLive && (
              <button
                onClick={() => skipSeconds(30)}
                className="p-1.5 sm:p-2 text-slate-400 hover:text-white transition rounded-full hover:bg-slate-800"
                title="Maju 30 detik"
              >
                <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            {!isLive && (
              <button
                onClick={cycleSpeed}
                className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-md border border-slate-700 transition"
                title="Kecepatan putar"
              >
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                {playbackRate}x
              </button>
            )}
          </div>

          <div className="w-full mt-1 hidden sm:flex items-center justify-center gap-3 text-xs text-slate-400">
            {isLive ? (
              <div className="flex items-center gap-2">
                <span className="flex space-x-0.5 items-end h-3">
                  <span className="w-1 bg-amber-400 animate-pulse h-2 rounded-full"></span>
                  <span className="w-1 bg-agape-400 animate-pulse h-3 rounded-full delay-100"></span>
                  <span className="w-1 bg-emerald-400 animate-pulse h-2.5 rounded-full delay-200"></span>
                  <span className="w-1 bg-agape-400 animate-pulse h-1.5 rounded-full"></span>
                </span>
                <span className="text-slate-300 font-medium tracking-wide">
                  94.5 FM Semarang • Siaran Langsung Penyejuk Hati
                </span>
              </div>
            ) : (
              <div className="w-full flex items-center gap-2 px-4">
                <span>{formatTime(currentTime)}</span>
                <div className="flex-1 relative h-1 bg-slate-800 rounded-full">
                  <div 
                    className="h-full bg-agape-500 rounded-full"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  />
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Multi-channel Stream Selector & Volume */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 sm:w-72">
          {/* Channel Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowChannelMenu(!showChannelMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
              title="Pilih Saluran Audio Agape"
            >
              <ListMusic className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Saluran</span>
            </button>

            {showChannelMenu && (
              <div className="absolute right-0 bottom-10 w-64 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl z-50 space-y-1">
                <span className="block px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pilih Saluran Audio Agape
                </span>
                {RADIO_INFO.channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      playLive(ch.id);
                      setShowChannelMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex flex-col transition ${
                      activeChannelId === ch.id
                        ? "bg-agape-600 text-white font-bold"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span>{ch.name}</span>
                    <span className="text-[10px] opacity-75 font-normal">{ch.genre}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Volume Control */}
          <div 
            className="relative flex items-center"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              onClick={toggleMute}
              className="p-2 text-slate-400 hover:text-white transition rounded-full hover:bg-slate-800"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5 text-red-400" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            <div className={`hidden sm:flex items-center w-20 transition-all ${showVolumeSlider ? 'opacity-100' : 'opacity-70'}`}>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-agape-500"
                aria-label="Pengatur volume suara"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
