import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("http://radio.agapefm.com:8000/status-json.xsl", {
      next: { revalidate: 10 },
      headers: {
        "User-Agent": "AgapeFM-WebClient/2.0",
      },
    });

    if (!res.ok) {
      return NextResponse.json({
        online: false,
        listeners: 0,
        message: "Stream server responded with non-200 status",
      });
    }

    const data = await res.json();
    const icestats = data.icestats;
    const sources = Array.isArray(icestats.source) ? icestats.source : [icestats.source].filter(Boolean);

    // Find main live stream source
    const mainLiveSource = sources.find((s: { listenurl?: string }) => 
      s.listenurl && s.listenurl.includes("agapelive")
    ) || sources[0];

    const totalListeners = sources.reduce((acc: number, cur: { listeners?: number }) => 
      acc + (cur.listeners || 0), 0
    );

    const peakListeners = sources.reduce((acc: number, cur: { listener_peak?: number }) => 
      Math.max(acc, cur.listener_peak || 0), 0
    );

    const channels = sources.map((s: { 
      server_name?: string; 
      listenurl?: string; 
      genre?: string; 
      listeners?: number; 
      server_type?: string;
      title?: string;
      artist?: string;
    }) => ({
      name: s.server_name || "Agape Stream",
      mount: s.listenurl ? s.listenurl.split(":8000")[1] || s.listenurl : "/agapelive",
      url: s.listenurl ? `http://radio.agapefm.com:8000${s.listenurl.split(":8000")[1] || "/agapelive"}` : "http://radio.agapefm.com:8000/agapelive",
      genre: s.genre || "Mitra Sejati Penyejuk Hati",
      listeners: s.listeners || 0,
      format: s.server_type || "application/ogg",
      nowPlaying: s.title ? (s.artist ? `${s.artist} - ${s.title}` : s.title) : undefined,
    }));

    return NextResponse.json({
      online: true,
      serverName: icestats.server_id || "Agape streaming",
      admin: icestats.admin,
      totalListeners,
      peakListeners,
      mainLive: {
        genre: mainLiveSource?.genre || "Mitra Sejati Penyejuk Hati",
        listeners: mainLiveSource?.listeners || 0,
        description: mainLiveSource?.server_description || "94.5 MHz AGAPE FM Semarang",
        nowPlaying: mainLiveSource?.title || "Siaran Studio 94.5 FM Live",
      },
      channels,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching Agape FM stream status:", error);
    return NextResponse.json({
      online: false,
      listeners: 0,
      error: "Unable to reach stream server at this moment",
    });
  }
}
