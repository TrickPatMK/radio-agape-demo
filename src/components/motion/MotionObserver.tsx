"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], .shutter")
    );

    if (reduced.matches || !("IntersectionObserver" in window)) {
      revealTargets.forEach((el) => el.classList.add("is-in"));
    } else {
      const vh = window.innerHeight || 900;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
      );

      revealTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.92) {
          el.classList.add("is-in");
        } else {
          io.observe(el);
        }
      });

      const fallbackTimer = window.setTimeout(() => {
        // Keep scrolled elements responsive even on rapid programmatic scroll
      }, 1200);

      // Manage decorative muted video loops
      const videos = Array.from(
        document.querySelectorAll<HTMLVideoElement>("video[data-loop-video]")
      );
      const inView = new Set<HTMLVideoElement>();
      const syncVideo = (v: HTMLVideoElement) => {
        if (reduced.matches) {
          v.pause();
          return;
        }
        if (inView.has(v)) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      };

      const videoObserver = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const vid = e.target as HTMLVideoElement;
            if (e.isIntersecting) inView.add(vid);
            else inView.delete(vid);
            syncVideo(vid);
          }
        },
        { threshold: 0.15 }
      );

      videos.forEach((v) => videoObserver.observe(v));

      const onMotionChange = () => {
        videos.forEach((v) => syncVideo(v));
        if (reduced.matches) {
          revealTargets.forEach((el) => el.classList.add("is-in"));
        }
      };
      reduced.addEventListener("change", onMotionChange);

      return () => {
        window.clearTimeout(fallbackTimer);
        io.disconnect();
        videoObserver.disconnect();
        reduced.removeEventListener("change", onMotionChange);
      };
    }
  }, [pathname]);

  return null;
}
