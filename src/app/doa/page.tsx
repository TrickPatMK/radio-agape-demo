"use client";

import React, { useState } from "react";
import { INITIAL_PRAYER_REQUESTS, PrayerRequest } from "@/data/radioData";
import { withBasePath } from "@/lib/utils";
import SplitStage from "@/components/stage/SplitStage";
import { Send, CheckCircle2 } from "lucide-react";

export default function DoaPage() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    category: "Kesehatan" as PrayerRequest["category"],
    content: "",
    allowBroadcast: true,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) return;

    const newRequest: PrayerRequest = {
      id: `pray-${Date.now()}`,
      senderName: formData.name,
      city: formData.city || "Semarang",
      phone: formData.phone,
      category: formData.category,
      content: formData.content,
      allowBroadcast: formData.allowBroadcast,
      status: "PENDING",
      createdAt: "Baru saja",
    };

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("agape_prayers");
      const list = stored ? JSON.parse(stored) : INITIAL_PRAYER_REQUESTS;
      localStorage.setItem("agape_prayers", JSON.stringify([newRequest, ...list]));
    }

    setSubmitted(true);
  };

  return (
    <section className="px-[var(--margin)] pb-20 lg:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-[var(--gutter)] gap-y-10 items-start">
        {/* Block 1: Hero Introduction */}
        <div className="lg:col-span-6 lg:col-start-1 pt-5 lg:pt-12 lg:pr-10 space-y-5 max-w-[48ch]">
          <h1 className="type-display lines m-0 text-paper-ink">
            <span className="line">
              <span data-line style={{ ["--i" as string]: 0 }}>
                Permohonan doa
              </span>
            </span>
          </h1>

          <p
            data-load
            style={{ ["--d" as string]: "140ms" }}
            className="type-body m-0 text-paper-ink"
          >
            Mari membawa pergumulan kesehatan, keluarga, atau pekerjaan Anda dalam doa bersama pada
            Ruang Syafaat pukul 13:00 WIB maupun secara rahasia bersama tim pastoral.
          </p>

          <div data-load style={{ ["--d" as string]: "220ms" }}>
            <a href="#form-doa" className="btn-flat">
              <span>Isi Lembar Pokok Doa</span>
            </a>
          </div>
        </div>

        {/* Block 2: Sticky Semarang Broadcast Stage */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 self-stretch">
          <SplitStage initialSlide={3} />
        </div>

        {/* Block 3: Prayer Form Sheet */}
        <div
          id="form-doa"
          className="lg:col-span-6 lg:col-start-1 pt-4 lg:pt-10 lg:pr-10 space-y-6 max-w-[54ch]"
        >
          <h2 data-reveal className="type-head m-0 text-paper-ink">
            Lembar pokok doa
          </h2>

          {submitted ? (
            <div className="bg-paper-surface p-7 space-y-4">
              <div className="flex items-center gap-2.5 text-paper-accent font-semibold type-lead">
                <CheckCircle2 className="w-6 h-6 flex-none" />
                <span>Pokok doa telah diterima</span>
              </div>
              <p className="m-0 type-body text-paper-ink">
                Terima kasih, <strong>{formData.name}</strong>. Permohonan doa Anda langsung
                tercatat pada meja siaran dan tim pastoral Radio Agape Semarang.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    city: "",
                    phone: "",
                    category: "Kesehatan",
                    content: "",
                    allowBroadcast: true,
                  });
                }}
                className="btn-flat"
              >
                Kirim Pokok Doa Lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                data-reveal
                style={{ ["--delay" as string]: "45ms" }}
              >
                <div className="space-y-2">
                  <label htmlFor="pray-name" className="block type-small font-medium text-paper-ink">
                    Nama atau inisial Anda *
                  </label>
                  <input
                    id="pray-name"
                    type="text"
                    required
                    placeholder="Ibu Maria / Bpk. Yohanes"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="paper-field"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="pray-city" className="block type-small font-medium text-paper-ink">
                    Kota atau wilayah
                  </label>
                  <input
                    id="pray-city"
                    type="text"
                    placeholder="Semarang Barat / Ungaran"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="paper-field"
                  />
                </div>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                data-reveal
                style={{ ["--delay" as string]: "85ms" }}
              >
                <div className="space-y-2">
                  <label htmlFor="pray-phone" className="block type-small font-medium text-paper-ink">
                    Nomor WhatsApp (opsional)
                  </label>
                  <input
                    id="pray-phone"
                    type="tel"
                    placeholder="0812-xxxx-xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="paper-field tabular"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="pray-cat" className="block type-small font-medium text-paper-ink">
                    Kebutuhan doa
                  </label>
                  <select
                    id="pray-cat"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as PrayerRequest["category"],
                      })
                    }
                    className="paper-field"
                  >
                    <option value="Kesehatan">Kesehatan &amp; Pemulihan Sakit</option>
                    <option value="Keluarga">Keluarga &amp; Pernikahan</option>
                    <option value="Pekerjaan">Pekerjaan &amp; Usaha</option>
                    <option value="Spiritual">Pertumbuhan Rohani</option>
                    <option value="Lainnya">Ucapan Syukur &amp; Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2" data-reveal style={{ ["--delay" as string]: "125ms" }}>
                <label htmlFor="pray-body" className="block type-small font-medium text-paper-ink">
                  Pokok doa secara rinci *
                </label>
                <textarea
                  id="pray-body"
                  required
                  rows={5}
                  placeholder="Ceritakan pergumulan atau ucapan syukur Anda..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="paper-field resize-y"
                />
              </div>

              <div
                className="bg-paper-surface p-5"
                data-reveal
                style={{ ["--delay" as string]: "160ms" }}
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allowBroadcast}
                    onChange={(e) =>
                      setFormData({ ...formData, allowBroadcast: e.target.checked })
                    }
                    className="mt-1.5 h-4 w-4 accent-[#085830]"
                  />
                  <span className="space-y-1">
                    <span className="block font-semibold type-body text-paper-ink">
                      Izinkan dibacakan pada jam Ruang Syafaat 94.5 FM
                    </span>
                    <span className="block type-body text-paper-ink max-w-[44ch]">
                      Bila tidak dicentang, pokok doa hanya didoakan secara tertutup oleh tim
                      pastoral tanpa disiarkan di udara.
                    </span>
                  </span>
                </label>
              </div>

              <div data-reveal style={{ ["--delay" as string]: "195ms" }}>
                <button type="submit" className="btn-flat w-full sm:w-auto">
                  <Send className="w-4 h-4" />
                  <span>Kirimkan Pokok Doa</span>
                </button>
              </div>
            </form>
          )}

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
              Setiap pesan yang masuk langsung tampil pada layar moderasi ruang siaran dengan
              penanda privasi yang Anda pilih.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
