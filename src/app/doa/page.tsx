"use client";

import React, { useState } from "react";
import { INITIAL_PRAYER_REQUESTS, PrayerRequest } from "@/data/radioData";
import { HeartHandshake, Send, CheckCircle2, ShieldCheck, Heart, MapPin } from "lucide-react";

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
      city: formData.city || "Indonesia",
      phone: formData.phone,
      category: formData.category,
      content: formData.content,
      allowBroadcast: formData.allowBroadcast,
      status: "PENDING",
      createdAt: "Baru saja",
    };

    // Save to localStorage for real-time pickup by the Studio Cockpit CMS
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("agape_prayers");
      const list = stored ? JSON.parse(stored) : INITIAL_PRAYER_REQUESTS;
      localStorage.setItem("agape_prayers", JSON.stringify([newRequest, ...list]));
    }

    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <HeartHandshake className="w-4 h-4" /> Pelayanan Syafaat & Konseling Doa
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Kirimkan Permohonan Doa Anda
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          &quot;Sebab di mana dua atau tiga orang berkumpul dalam Nama-Ku, di situ Aku ada di tengah-tengah mereka.&quot; (Matius 18:20). Mari bersama-sama membawa pergumulan Anda ke dalam hadirat Tuhan.
        </p>
      </div>

      {/* Form Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
        {submitted ? (
          <div className="text-center py-12 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Permohonan Doa Anda Telah Diterima
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Terima kasih, <strong>{formData.name}</strong>. Pokok doa Anda telah masuk ke dalam sistem kami dan diteruskan ke tim pastoral Radio Agape. Kiranya damai sejahtera Kristus senantiasa menyertai Anda.
            </p>
            <button
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
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700"
            >
              Kirim Pokok Doa Lainnya
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nama Pengirim */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Nama Anda / Inisial <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ibu Maria / Bpk. Yohanes"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-agape-500 transition"
                />
              </div>

              {/* Kota / Lokasi */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Kota / Wilayah Anda
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Surabaya / Jakarta / Medan"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-agape-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* WhatsApp (Opsional) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Nomor WhatsApp (Opsional)
                </label>
                <input
                  type="tel"
                  placeholder="0812-xxxx-xxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-agape-500 transition"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Untuk konfirmasi doa dari tim pastoral kami.
                </p>
              </div>

              {/* Kategori Pokok Doa */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Kategori Kebutuhan Doa
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as PrayerRequest["category"] })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-agape-500 transition"
                >
                  <option value="Kesehatan">Kesehatan & Pemulihan Sakit</option>
                  <option value="Keluarga">Keluarga & Hubungan Pernikahan</option>
                  <option value="Pekerjaan">Pekerjaan, Bisnis & Finansial</option>
                  <option value="Spiritual">Pertumbuhan Rohani & Ketenangan Jiwa</option>
                  <option value="Lainnya">Ucapan Syukur & Pokok Lainnya</option>
                </select>
              </div>
            </div>

            {/* Pokok Doa Textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Tuliskan Pokok Doa Anda Secara Rinci <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Ceritakan apa yang sedang Anda pergumulkan, agar kami dapat mendoakannya dengan tepat..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-agape-500 transition leading-relaxed resize-none"
              />
            </div>

            {/* Privacy Option */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.allowBroadcast}
                  onChange={(e) => setFormData({ ...formData, allowBroadcast: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-agape-600 focus:ring-agape-500 accent-agape-500"
                />
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-white block">
                    Izinkan Pokok Doa Ini Dibacakan di Udara (On-Air Siaran Radio)
                  </span>
                  <span className="text-xs text-slate-400">
                    Bila dicentang, penyiar dapat membacakan nama depan dan pokok doa Anda saat jam siaran doa bersama jemaat. Bila tidak dicentang, pokok doa hanya akan didoakan secara rahasia oleh tim pastoral.
                  </span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-agape-600 to-amber-600 hover:brightness-110 text-white shadow-xl shadow-agape-600/30 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Kirimkan Permohonan Doa ke Radio Agape
            </button>
          </form>
        )}
      </div>

      {/* Reassurance Footer */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-agape-400" />
        <span>Setiap permohonan doa diperlakukan dengan penuh hormat dan kerahasiaan kasih.</span>
      </div>
    </div>
  );
}
