"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { RADIO_INFO, PodcastEpisode } from "@/data/radioData";

export interface ActiveTrack {
  id: string;
  type: "LIVE" | "PODCAST";
  title: string;
  subtitle: string;
  url: string;
  coverImage: string;
  durationSeconds?: number;
}

interface AudioContextType {
  currentTrack: ActiveTrack;
  isPlaying: boolean;
  isLive: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  isLoading: boolean;
  activeChannelId: string;
  togglePlay: () => void;
  playLive: (channelId?: string) => void;
  playPodcast: (episode: PodcastEpisode) => void;
  seekTo: (time: number) => void;
  skipSeconds: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setSpeed: (rate: number) => void;
}

const DEFAULT_LIVE_TRACK: ActiveTrack = {
  id: "main",
  type: "LIVE",
  title: "94.5 FM Radio Agape Semarang",
  subtitle: "Mitra Sejati Penyejuk Hati (Siaran Studio 24/7)",
  url: RADIO_INFO.liveStreamUrl,
  coverImage: "/agapelogo.png",
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<ActiveTrack>(DEFAULT_LIVE_TRACK);
  const [activeChannelId, setActiveChannelId] = useState<string>("main");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.volume = volume;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onTimeUpdate = () => {
      if (audio) setCurrentTime(audio.currentTime);
    };
    const onDurationChange = () => {
      if (audio && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.subtitle,
        album: "Radio Agape 94.5 FM Semarang",
        artwork: [
          { src: currentTrack.coverImage, sizes: "512x512", type: "image/png" },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current?.play().catch(console.error);
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current?.pause();
      });
      if (currentTrack.type === "PODCAST") {
        navigator.mediaSession.setActionHandler("seekbackward", () => {
          skipSeconds(-10);
        });
        navigator.mediaSession.setActionHandler("seekforward", () => {
          skipSeconds(30);
        });
      }
    }
  }, [currentTrack]);

  const loadAndPlayTrack = async (track: ActiveTrack) => {
    if (!audioRef.current) return;
    setIsLoading(true);
    setCurrentTrack(track);

    audioRef.current.src = track.url;
    audioRef.current.playbackRate = playbackRate;
    audioRef.current.load();

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Audio play blocked or stream buffering:", err);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src || audioRef.current.src === "") {
        await loadAndPlayTrack(currentTrack);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          console.error("Play error:", e);
        }
      }
    }
  };

  const playLive = (channelId: string = "main") => {
    const ch = RADIO_INFO.channels.find(c => c.id === channelId) || RADIO_INFO.channels[0];
    setActiveChannelId(ch.id);

    const liveTrack: ActiveTrack = {
      id: ch.id,
      type: "LIVE",
      title: ch.name,
      subtitle: `${RADIO_INFO.frequency} • ${ch.genre}`,
      url: ch.url,
      coverImage: "/agapelogo.png",
    };

    loadAndPlayTrack(liveTrack);
  };

  const playPodcast = (episode: PodcastEpisode) => {
    const podcastTrack: ActiveTrack = {
      id: episode.id,
      type: "PODCAST",
      title: episode.title,
      subtitle: `${episode.speaker} • ${episode.series}`,
      url: episode.audioUrl,
      coverImage: episode.coverImage,
      durationSeconds: episode.durationSeconds,
    };
    loadAndPlayTrack(podcastTrack);
  };

  const seekTo = (time: number) => {
    if (!audioRef.current || currentTrack.type === "LIVE") return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const skipSeconds = (seconds: number) => {
    if (!audioRef.current || currentTrack.type === "LIVE") return;
    const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const setVolume = (val: number) => {
    if (!audioRef.current) return;
    const clamped = Math.max(0, Math.min(1, val));
    audioRef.current.volume = clamped;
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const setSpeed = (rate: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isLive: currentTrack.type === "LIVE",
        volume,
        isMuted,
        currentTime,
        duration: currentTrack.type === "PODCAST" ? (duration || currentTrack.durationSeconds || 0) : 0,
        playbackRate,
        isLoading,
        activeChannelId,
        togglePlay,
        playLive,
        playPodcast,
        seekTo,
        skipSeconds,
        setVolume,
        toggleMute,
        setSpeed,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
