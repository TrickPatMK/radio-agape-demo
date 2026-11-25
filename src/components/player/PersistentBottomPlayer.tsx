"use client";

import React from "react";
import { useAudio } from "@/context/AudioContext";

/**
 * Retained module export for backwards compatibility; live transport & 5-channel tuner
 * now live inside Navbar (top bar) and SplitStage (sticky stage) so no bottom overlay
 * collides with scrolled headings or mobile content.
 */
export default function PersistentBottomPlayer() {
  useAudio();
  return null;
}
