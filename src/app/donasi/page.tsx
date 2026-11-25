"use client";

import React, { useState } from "react";
import { RADIO_INFO } from "@/data/radioData";
import { withBasePath } from "@/lib/utils";
import SplitStage from "@/components/stage/SplitStage";
import { Copy, Check } from "lucide-react";

export default function DonasiPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(RADIO_INFO.bankDonation.accountNumber.replace(/-/g, ""));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const allocations = [
    {
      title: "Pemancar darat 94.5 MHz & listrik studio",
      detail: "Operasional ruang siaran 24 jam penuh di Jl. Pringgading 13 Semarang.",
    },
    {
      title: "Server relay audio 5 saluran",
      detail: "Bandwidth streaming Icecast tanpa jeda bagi pendengar di luar kota dan luar negeri.",
    },
    {
      title: "Perekaman khotbah & pelayanan syafaat",
      detail: "Pengarsipan renungan harian dan pendampingan doa jemaat sepanjang minggu.",
    },
  ];

  return (
    <section className="px-[var(--margin)] pb-20 lg:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-[var(--gutter)] gap-y-10 items-start">
        {/* Block 1: Hero Introduction */}
        <div className="lg:col-span-6 lg:col-start-1 pt-5 lg:pt-12 lg:pr-10 space-y-5 max-w-[48ch]">
          <h1 className="type-display lines m-0 text-paper-ink">
            <span className="line">
              <span data-line style={{ ["--i" as string]: 0 }}>
                Dukungan pelayanan
              </span>
            </span>
          </h1>

          <p
            data-load
            style={{ ["--d" as string]: "140ms" }}
            className="type-body m-0 text-paper-ink"
          >
            Persembahan kasih Anda menjaga pemancar 94.5 FM Semarang, lima saluran streaming
            Alkitab dan pujian, serta produksi rekaman renungan tetap mengudara setiap hari.
          </p>

          <div data-load style={{ ["--d" as string]: "220ms" }}>
            <button type="button" onClick={copyToClipboard} className="btn-flat">
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Nomor Rekening Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Rekening BCA Yayasan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Block 2: Sticky Semarang Broadcast Stage */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 self-stretch">
          <SplitStage initialSlide={0} />
        </div>

        {/* Block 3: Official Bank Transfer Block & Operational Use */}
        <div className="lg:col-span-6 lg:col-start-1 pt-4 lg:pt-10 lg:pr-10 space-y-6 max-w-[54ch]">
          <h2 data-reveal className="type-head m-0 text-paper-ink">
            Rekening yayasan
          </h2>

          <div
            data-reveal
            style={{ ["--delay" as string]: "50ms" }}
            className="bg-paper-surface p-6 sm:p-8 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="m-0 tabular whitespace-nowrap type-head text-paper-ink">
                {RADIO_INFO.bankDonation.accountNumber}
              </p>
              <button
                type="button"
                onClick={copyToClipboard}
                className="btn-surface !min-h-[42px] !py-2 !px-4 !text-[14px] whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-paper-accent" />
                    <span>Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Nomor</span>
                  </>
                )}
              </button>
            </div>

            <p className="m-0 type-body text-paper-ink max-w-[48ch]">
              Rekening resmi {RADIO_INFO.bankDonation.bankName} atas nama{" "}
              {RADIO_INFO.bankDonation.accountHolder} untuk operasional siaran Semarang.
            </p>

            <div className="pt-1">
              <a
                href={`${RADIO_INFO.whatsappBroadcast}%20/%20Konfirmasi%20Dukungan%20Kasih`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-action type-small"
              >
                Konfirmasi transfer atau minta kode QRIS resmi melalui WhatsApp Yayasan
              </a>
            </div>
          </div>

          {/* Transparent Operational Use */}
          <div className="space-y-3 pt-2">
            {allocations.map((item, idx) => (
              <div
                key={item.title}
                data-reveal
                style={{ ["--delay" as string]: `${(idx + 1) * 55}ms` }}
                className="bg-paper-surface p-5 space-y-1.5"
              >
                <p className="m-0 type-lead text-paper-ink">{item.title}</p>
                <p className="m-0 type-body text-paper-ink">{item.detail}</p>
              </div>
            ))}
          </div>

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
              Seluruh laporan penerimaan dan pemeliharaan perangkat siaran dikelola langsung oleh
              pengurus Yayasan Media Kasih Agape di Semarang.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
