"use client";

import React, { useState } from "react";
import { HOURLY_LISTENERS } from "@/data/radioData";

interface ListenerChartProps {
  liveListeners: number;
}

export default function ListenerChart({ liveListeners }: ListenerChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const series = HOURLY_LISTENERS.map((pt, idx) =>
    idx === 4 ? { ...pt, listeners: Math.max(liveListeners, pt.listeners) } : pt
  );

  const width = 620;
  const height = 228;
  const padL = 34;
  const padR = 14;
  const padT = 28;
  const padB = 26;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const yTicks = [0, 10, 20, 30];
  const maxVal = 30;

  const xAt = (i: number) => padL + (i / (series.length - 1)) * plotW;
  const yAt = (v: number) => padT + plotH - (v / maxVal) * plotH;

  const observed = series.slice(0, 6);
  const forecast = series.slice(5);

  const observedPath = observed
    .map((p, i) => `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)},${yAt(p.listeners).toFixed(1)}`)
    .join(" ");

  const forecastPath = forecast
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"}${xAt(i + 5).toFixed(1)},${yAt(p.listeners).toFixed(1)}`
    )
    .join(" ");

  const peakIdx = 2; // 07:00 peak
  const peakPoint = series[peakIdx];
  const xLabels = [0, 2, 4, 6, 8, 10, 11];

  return (
    <div className="cockpit-card h-full flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="m-0 text-[16px] font-semibold text-white">
            Pergerakan pendengar streaming hari ini
          </h2>
          <p className="m-0 text-[12px] text-[#949494] mt-0.5">
            Garis utuh: terukur dari Icecast · Garis putus: proyeksi jam siaran berikutnya
          </p>
        </div>
        <span className="text-[12px] text-[#b4b4b4] tabular">
          {hoverIdx !== null
            ? `${series[hoverIdx].hour} WIB · ${series[hoverIdx].listeners} pendengar`
            : "05:00–21:00 WIB"}
        </span>
      </div>

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height={height}
          role="img"
          aria-label="Grafik jumlah pendengar streaming Radio Agape dari pukul 05:00 hingga 21:00 WIB, mencapai puncak pagi 24 pendengar pada pukul 07:00"
          className="block overflow-visible tabular"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {/* 4 quiet horizontal gridlines, no y-axis spine */}
          {yTicks.map((t) => {
            const y = yAt(t);
            return (
              <g key={t}>
                <line
                  x1={padL}
                  x2={width - padR}
                  y1={y}
                  y2={y}
                  stroke="#2b2b2b"
                  strokeWidth={t === 0 ? 1.5 : 1}
                  shapeRendering="crispEdges"
                />
                <text
                  x={padL - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#949494"
                >
                  {t}
                </text>
              </g>
            );
          })}

          {/* Peak event annotation in dedicated top lane */}
          <line
            x1={xAt(peakIdx)}
            x2={xAt(peakIdx)}
            y1={14}
            y2={yAt(peakPoint.listeners) - 3}
            stroke="#6b6b6b"
            strokeWidth="1"
          />
          <text
            x={xAt(peakIdx) + 5}
            y={15}
            fontSize="12"
            fill="#b4b4b4"
          >
            07:00 Embun Pagi ({peakPoint.listeners} pendengar)
          </text>

          {/* Straight 2px segments in the one data hue (#4cb3f0) */}
          <path
            d={observedPath}
            fill="none"
            stroke="#4cb3f0"
            strokeWidth="2"
            strokeLinejoin="miter"
          />

          {/* Forecast after current window */}
          <path
            d={forecastPath}
            fill="none"
            stroke="#4cb3f0"
            strokeWidth="1.75"
            strokeDasharray="4 4"
            opacity="0.7"
          />

          {/* Hover dot & interactive hit bands */}
          {hoverIdx !== null && (
            <circle
              cx={xAt(hoverIdx)}
              cy={yAt(series[hoverIdx].listeners)}
              r="4"
              fill="#4cb3f0"
            />
          )}

          {series.map((pt, i) => {
            const bandW = plotW / series.length;
            return (
              <rect
                key={pt.hour}
                x={xAt(i) - bandW / 2}
                y={padT}
                width={bandW}
                height={plotH}
                fill="transparent"
                onMouseEnter={() => setHoverIdx(i)}
              />
            );
          })}

          {/* Evenly stepped flat X labels */}
          {xLabels.map((idx) => (
            <text
              key={series[idx].hour}
              x={
                idx === 0
                  ? xAt(idx)
                  : idx === series.length - 1
                  ? xAt(idx) - 28
                  : xAt(idx) - 14
              }
              y={height - 6}
              fontSize="12"
              fill="#949494"
            >
              {series[idx].hour}
            </text>
          ))}
        </svg>
      </div>

      <p className="m-0 text-[12px] text-[#949494] tabular">
        Rerata pagi (05:00–10:00 WIB): 18 pendengar · Puncak terukur 07:00 WIB ({peakPoint.listeners} pendengar)
      </p>
    </div>
  );
}
