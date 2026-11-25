"use client";

import React, { useState, useEffect, useCallback } from "react";
import { withBasePath } from "@/lib/utils";
import { Menu, RefreshCw } from "lucide-react";

export interface StreamTelemetry {
  online: boolean;
  totalListeners: number;
  peakListeners?: number;
  serverName: string;
  updatedLabel: string;
  loading: boolean;
  error?: string;
}

interface StudioHeaderProps {
  telemetry: StreamTelemetry;
  onRefresh: () => void;
  onOpenMenu: () => void;
}

export function useStreamTelemetry() {
  const [telemetry, setTelemetry] = useState<StreamTelemetry>({
    online: true,
    totalListeners: 18,
    peakListeners: 24,
    serverName: "radio.agapefm.com",
    updatedLabel: "Baru dimuat",
    loading: false,
  });

  const refresh = useCallback(async () => {
    const isStaticDemo = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
    const stamp = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (
      isStaticDemo &&
      typeof window !== "undefined" &&
      window.location.protocol === "https:"
    ) {
      setTelemetry({
        online: true,
        totalListeners: 18,
        peakListeners: 24,
        serverName: "radio.agapefm.com",
        updatedLabel: `Snapshot Demo ${stamp} WIB`,
        loading: false,
      });
      return;
    }

    setTelemetry((prev) => ({ ...prev, loading: true }));
    try {
      const endpoint = isStaticDemo
        ? "http://radio.agapefm.com:8000/status-json.xsl"
        : withBasePath("/api/stream-status");
      const res = await fetch(endpoint);
      const data = await res.json();

      if (isStaticDemo && data?.icestats) {
        const sources = Array.isArray(data.icestats.source)
          ? data.icestats.source
          : [data.icestats.source].filter(Boolean);
        const totalListeners = sources.reduce(
          (acc: number, cur: { listeners?: number }) => acc + (cur.listeners || 0),
          0
        );
        const peakListeners = sources.reduce(
          (acc: number, cur: { listener_peak?: number }) =>
            Math.max(acc, cur.listener_peak || 0),
          24
        );
        setTelemetry({
          online: true,
          totalListeners,
          peakListeners,
          serverName: data.icestats.server_id || "radio.agapefm.com",
          updatedLabel: `Diperbarui ${stamp} WIB`,
          loading: false,
        });
        return;
      }

      if (res.ok && data.online) {
        setTelemetry({
          online: true,
          totalListeners: typeof data.totalListeners === "number" ? data.totalListeners : 0,
          peakListeners: typeof data.peakListeners === "number" ? data.peakListeners : 24,
          serverName: data.serverName || "radio.agapefm.com",
          updatedLabel: `Diperbarui ${stamp} WIB`,
          loading: false,
        });
      } else {
        // Truthful offline handling: never mask an offline stream as online
        setTelemetry((prev) => ({
          ...prev,
          online: false,
          totalListeners: 0,
          updatedLabel: `Dicek ${stamp} WIB`,
          loading: false,
          error: data.error || data.message || "Relay Icecast tidak merespons",
        }));
      }
    } catch {
      const stamp = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTelemetry((prev) => ({
        ...prev,
        online: false,
        totalListeners: 0,
        updatedLabel: `Gagal ${stamp} WIB`,
        loading: false,
        error: "Tidak dapat menghubungi endpoint telemetri Icecast",
      }));
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = window.setInterval(refresh, 20000);
    return () => window.clearInterval(interval);
  }, [refresh]);

  return { telemetry, refresh };
}

export default function StudioHeader({
  telemetry,
  onRefresh,
  onOpenMenu,
}: StudioHeaderProps) {
  const [timeStr, setTimeStr] = useState("09:30:00 WIB");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " WIB"
      );
    };
    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="cockpit-topbar">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Buka navigasi studio"
          className="md:hidden cockpit-btn !px-3"
        >
          <Menu className="w-4 h-4" />
          <span>Menu</span>
        </button>

        <span
          className={`cockpit-pill ${telemetry.online ? "pos" : "neg"}`}
          title={telemetry.error || "Status koneksi relay Icecast"}
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              backgroundColor: telemetry.online ? "#3fc07a" : "#e5566f",
            }}
          />
          <span className="hidden sm:inline">
            {telemetry.online
              ? "Relay Icecast Aktif"
              : "Relay Icecast Terputus"}
          </span>
          <span className="sm:hidden">
            {telemetry.online ? "Icecast Aktif" : "Terputus"}
          </span>
        </span>

        <span className="hidden sm:inline text-[13px] text-[#b4b4b4] truncate">
          radio.agapefm.com:8000/agapelive
        </span>
      </div>

      <div className="flex items-center gap-3 flex-none">
        <span className="hidden lg:inline text-[12px] text-[#949494] tabular">
          {telemetry.updatedLabel}
        </span>

        <button
          type="button"
          onClick={onRefresh}
          aria-label="Segarkan status server"
          className="cockpit-btn !h-[32px] !px-3 !text-[12px]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${telemetry.loading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Segarkan</span>
        </button>

        <span className="text-[14px] font-medium text-white tabular">{timeStr}</span>
      </div>
    </header>
  );
}
