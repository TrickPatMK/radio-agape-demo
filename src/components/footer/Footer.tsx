import React from "react";
import Link from "next/link";
import { RADIO_INFO } from "@/data/radioData";
import { withBasePath } from "@/lib/utils";

export default function Footer() {
  const menuItems = [
    { href: "/", label: "Beranda Siaran" },
    { href: "/jadwal", label: "Jadwal Harian" },
    { href: "/podcast", label: "Arsip Khotbah" },
    { href: "/doa", label: "Pokok Doa" },
    { href: "/donasi", label: "Dukungan Kasih" },
    { href: "/cockpit", label: "Studio Cockpit" },
  ];

  return (
    <footer className="bg-paper-surface text-paper-ink grid grid-cols-1 lg:grid-cols-12 min-h-[82svh]">
      {/* Left Half: Close Architectural Crop of Gereja Blenduk Semarang */}
      <div className="lg:col-span-6 h-[46svh] lg:h-auto overflow-clip bg-paper-ink shutter">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBasePath("/media/exterior-of-blenduk-church-semarang-2014-06.jpg")}
          width={1920}
          height={1481}
          alt="Kubah tembaga dan menara kembar Gereja Blenduk di kawasan Kota Lama Semarang"
          loading="lazy"
          decoding="async"
          className="plate-photo object-[52%_38%]"
        />
      </div>

      {/* Right Half: Large Menu, Studio Address, and Open-Collection Credits */}
      <div className="lg:col-span-6 px-[var(--margin)] lg:pl-12 lg:pr-[var(--margin)] py-12 lg:py-16 flex flex-col justify-between gap-12">
        <div className="space-y-8">
          <div
            data-reveal
            className="flex flex-wrap items-baseline justify-between gap-2 type-small text-paper-muted"
          >
            <span>Radio Agape · Mitra Sejati Penyejuk Hati</span>
            <span className="tabular">94.5 MHz FM Semarang</span>
          </div>

          <nav aria-label="Tautan penutup situs" className="flex flex-col items-start gap-3">
            {menuItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                data-reveal
                style={{ ["--delay" as string]: `${idx * 45}ms` }}
                className="footer-menu-link type-head text-paper-ink no-underline transition-transform duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div data-reveal className="space-y-1.5">
            <h2 className="m-0 type-body font-semibold text-paper-ink">Studio Semarang</h2>
            <p className="m-0 type-small text-paper-muted">{RADIO_INFO.address}</p>
            <p className="m-0 type-small">
              <a href={`mailto:${RADIO_INFO.email}`} className="text-action">
                {RADIO_INFO.email}
              </a>
            </p>
            <p className="m-0 type-small">
              <a
                href={RADIO_INFO.whatsappBroadcast}
                target="_blank"
                rel="noopener noreferrer"
                className="text-action"
              >
                WhatsApp Ruang Siaran
              </a>
            </p>
          </div>

          <div
            data-reveal
            style={{ ["--delay" as string]: "60ms" }}
            className="space-y-1.5"
          >
            <h2 className="m-0 type-body font-semibold text-paper-ink">Jaringan Siaran</h2>
            <ul className="m-0 p-0 list-none space-y-1 type-small">
              <li>
                <a
                  href={RADIO_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-action"
                >
                  Instagram @94.5agapefm_smg
                </a>
              </li>
              <li>
                <a
                  href={RADIO_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-action"
                >
                  Halaman Facebook Resmi
                </a>
              </li>
              <li>
                <a
                  href={RADIO_INFO.socials.onlineRadioBox}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-action"
                >
                  Online Radio Box Indonesia
                </a>
              </li>
              <li>
                <a
                  href={RADIO_INFO.socials.fmStreaming}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-action"
                >
                  Direktori FMStream
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div data-reveal className="space-y-3 max-w-[56ch]">
          <p className="m-0 type-small text-paper-ink">
            Foto dan rekaman visual:{" "}
            <a
              href="https://commons.wikimedia.org/w/index.php?curid=33518515"
              target="_blank"
              rel="noopener noreferrer"
              className="text-action"
            >
              “Blenduk Church”
            </a>{" "}
            &amp;{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Sunrise,_Bandungan,_Semarang_Regency,_2014-10-01.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-action"
            >
              “Sunrise, Bandungan”
            </a>{" "}
            oleh Crisco 1492 (
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-action"
            >
              CC BY-SA
            </a>
            );{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Semarang_-_Lawang_Sewu_02.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-action"
            >
              “Lawang Sewu”
            </a>{" "}
            oleh P. Hughes (CC BY 4.0);{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Bangunan_Kompleks_Kota_Lama_Semarang_01.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-action"
            >
              “Kota Lama Semarang”
            </a>{" "}
            oleh Candramawa99 (CC BY 4.0);{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Vacuum_tube_radio_receiver_Philips_680A_IMG_7964.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-action"
            >
              “Philips 680A”
            </a>{" "}
            oleh Alex P. Kok (CC BY-SA 4.0);{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Tuning_fork_creates_waves_in_water.webm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-action"
            >
              “Tuning fork waves”
            </a>{" "}
            oleh Lordgurke (CC BY-SA 4.0), Wikimedia Commons.
          </p>
          <div className="flex flex-wrap items-baseline justify-between gap-2 type-small text-paper-muted">
            <span>© 2026 Yayasan Media Kasih Agape</span>
            <span>Jl. Pringgading 13, Semarang</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
