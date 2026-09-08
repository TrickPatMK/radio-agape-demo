export interface ScheduleItem {
  id: string;
  day: number; // 0 = Minggu, 1 = Senin, ... 6 = Sabtu
  startTime: string; // "06:00"
  endTime: string;   // "08:00"
  title: string;
  host: string;
  category: 'Renungan' | 'Pujian' | 'Talkshow' | 'Doa' | 'Youth' | 'Keluarga';
  description: string;
  image?: string;
}

export interface PodcastEpisode {
  id: string;
  series: string;
  title: string;
  speaker: string;
  duration: string;
  durationSeconds: number;
  publishedDate: string;
  scripture: string;
  showNotes: string;
  audioUrl: string;
  coverImage: string;
}

export interface PrayerRequest {
  id: string;
  senderName: string;
  city: string;
  phone?: string;
  category: 'Kesehatan' | 'Keluarga' | 'Pekerjaan' | 'Spiritual' | 'Lainnya';
  content: string;
  allowBroadcast: boolean;
  status: 'PENDING' | 'ON_AIR_READING' | 'COMPLETED' | 'PASTORAL_CARE';
  createdAt: string;
}

export interface RundownItem {
  id: string;
  timeSlot: string;
  title: string;
  host: string;
  type: 'LIVE' | 'RECORDED' | 'MUSIC' | 'PRAYER';
  status: 'ON_AIR' | 'UP_NEXT' | 'COMPLETED' | 'SCHEDULED';
  producerNote: string;
}

export const RADIO_INFO = {
  name: "Radio Agape",
  tagline: "Menyapa Hati dengan Kasih & Pengharapan",
  description: "Stasiun siaran radio rohani 24/7 menghadirkan firman, renungan inspiratif, dan pujian penyembahan tanpa henti bagi keluarga dan komunitas.",
  liveStreamUrl: "https://stream.zeno.fm/f3wvbbqmdg8uv", // Reliable public audio stream sample
  whatsappBroadcast: "https://wa.me/6281234567890?text=Shalom%20Radio%20Agape,%20saya%20ingin%20request%20lagu%20dan%20titip%20salam",
  studioPhone: "+62 812-3456-7890",
  bankDonation: {
    bankName: "BCA (Bank Central Asia)",
    accountNumber: "8420-9988-12",
    accountHolder: "Yayasan Media Kasih Agape",
  }
};

export const MOCK_SCHEDULE: ScheduleItem[] = [
  {
    id: "sch-1",
    day: 1, // Senin
    startTime: "05:00",
    endTime: "07:00",
    title: "Embun Pagi: Saat Teduh Bersama Firman",
    host: "Pdt. Yohanes Santoso",
    category: "Renungan",
    description: "Memulai pagi dengan doa fajar, renungan ayat emas hari ini, dan pujian penyembahan teduh.",
  },
  {
    id: "sch-2",
    day: 1,
    startTime: "07:00",
    endTime: "09:00",
    title: "Agape Morning Booster",
    host: "Ruth Novita & Daniel Pratama",
    category: "Pujian",
    description: "Lagu-lagu pujian berenergi, kabar baik inspiratif, dan salam pendengar pembakar semangat kerja.",
  },
  {
    id: "sch-3",
    day: 1,
    startTime: "09:00",
    endTime: "11:00",
    title: "Bincang Keluarga Bahtera Kasih",
    host: "Ibu Maria & Ev. Andreas",
    category: "Keluarga",
    description: "Diskusi seputar komunikasi suami-istri, mendidik anak di era digital, dan konseling keluarga.",
  },
  {
    id: "sch-4",
    day: 1,
    startTime: "11:00",
    endTime: "13:00",
    title: "Pujian di Tengah Hari",
    host: "AutoDJ Agape",
    category: "Pujian",
    description: "Kompilasi lagu pujian dan penyembahan instrumental menemani waktu istirahat siang.",
  },
  {
    id: "sch-5",
    day: 1,
    startTime: "13:00",
    endTime: "15:00",
    title: "Ruang Syafaat & Pokok Doa",
    host: "Pnt. Stefanus",
    category: "Doa",
    description: "Sesi siaran langsung membawa permohonan doa pendengar ke hadapan Tuhan secara serempak.",
  },
  {
    id: "sch-6",
    day: 1,
    startTime: "15:00",
    endTime: "17:00",
    title: "Youth Agape Sound",
    host: "Kevin & Michelle",
    category: "Youth",
    description: "Konten relevan untuk generasi muda, musik rohani kontemporer, dan obrolan seputar panggilan hidup.",
  },
  {
    id: "sch-7",
    day: 1,
    startTime: "17:00",
    endTime: "19:00",
    title: "Agape Sore Menjelang Senja",
    host: "David Gunawan",
    category: "Talkshow",
    description: "Menemani perjalanan pulang kerja dengan lagu penyejuk hati dan refleksi hikmat harian.",
  },
  {
    id: "sch-8",
    day: 1,
    startTime: "19:00",
    endTime: "21:00",
    title: "Mimbar Firman Malam",
    host: "Pdt. Dr. Samuel Halim",
    category: "Renungan",
    description: "Kajian eksposisi firman Tuhan yang mendalam untuk memperkuat fondasi iman keluarga.",
  },
  {
    id: "sch-9",
    day: 1,
    startTime: "21:00",
    endTime: "00:00",
    title: "Malam Teduh Bersama Kasih-Nya",
    host: "AutoDJ Agape",
    category: "Pujian",
    description: "Alunan himne klasik dan mazmur pengantar istirahat malam yang damai.",
  },
];

export const MOCK_PODCASTS: PodcastEpisode[] = [
  {
    id: "pod-1",
    series: "Embun Pagi Seri Mazmur",
    title: "Ketenangan di Tengah Badai Hidup",
    speaker: "Pdt. Yohanes Santoso",
    duration: "24:18",
    durationSeconds: 1458,
    publishedDate: "7 Sep 2026",
    scripture: "Mazmur 46:1-12",
    showNotes: "Tuhan adalah tempat perlindungan dan kekuatan kita, sebagai penolong dalam kesesakan sangat terbukti. Dalam renungan ini kita belajar berhenti mengandalkan kekuatan diri sendiri dan melepaskan kendali kepada Allah yang berdaulat.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverImage: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pod-2",
    series: "Bahtera Keluarga",
    title: "Membangun Mezbah Doa di Tengah Kesibukan Rumah Tangga",
    speaker: "Ev. Andreas & Ibu Maria",
    duration: "32:05",
    durationSeconds: 1925,
    publishedDate: "5 Sep 2026",
    scripture: "Yosua 24:14-15",
    showNotes: "Bagaimana sebuah keluarga Kristen modern menjaga persekutuan doa di tengah jadwal kerja dan sekolah yang padat? Temukan 4 langkah praktis menyusun waktu doa keluarga yang bermakna tanpa rasa tertekan.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pod-3",
    series: "Khotbah Minggu Raya",
    title: "Iman yang Tidak Goyah di Masa Ketidakpastian",
    speaker: "Pdt. Dr. Samuel Halim",
    duration: "41:30",
    durationSeconds: 2490,
    publishedDate: "1 Sep 2026",
    scripture: "Ibrani 11:1-6",
    showNotes: "Khotbah eksposisi mengenai definisi iman yang sejati. Iman bukan berarti ketiadaan masalah, melainkan kehadiran Kristus yang memberi kepastian di dalam hati kita saat masa depan tampak samar.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverImage: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pod-4",
    series: "Youth Agape Talks",
    title: "Menemukan Panggilan & Karir yang Memuliakan Tuhan",
    speaker: "Kevin Pratama & Ruth Novita",
    duration: "28:45",
    durationSeconds: 1725,
    publishedDate: "28 Agu 2026",
    scripture: "Kolose 3:23-24",
    showNotes: "Apakah panggilan pelayanan hanya untuk pendeta? Obrolan santai namun mendalam bagi anak muda yang sedang mencari arah kerja, kuliah, dan karya di dunia profesional.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_RUNDOWN: RundownItem[] = [
  {
    id: "rd-1",
    timeSlot: "05:00 - 07:00",
    title: "Embun Pagi: Saat Teduh Bersama Firman",
    host: "Pdt. Yohanes Santoso",
    type: "LIVE",
    status: "COMPLETED",
    producerNote: "Pembukaan lancar, permohonan doa pagi 14 pokok telah dibacakan."
  },
  {
    id: "rd-2",
    timeSlot: "07:00 - 09:00",
    title: "Agape Morning Booster",
    host: "Ruth Novita & Daniel Pratama",
    type: "LIVE",
    status: "COMPLETED",
    producerNote: "Segmen salam pendengar berjalan ramai, request lagu penuh."
  },
  {
    id: "rd-3",
    timeSlot: "09:00 - 11:00",
    title: "Bincang Keluarga Bahtera Kasih",
    host: "Ibu Maria & Ev. Andreas",
    type: "LIVE",
    status: "ON_AIR",
    producerNote: "Narasumber hadir di studio. Buka sesi tanya jawab via WhatsApp pada pukul 10:15."
  },
  {
    id: "rd-4",
    timeSlot: "11:00 - 13:00",
    title: "Pujian di Tengah Hari",
    host: "AutoDJ Agape",
    type: "MUSIC",
    status: "UP_NEXT",
    producerNote: "Playlist rotasi otomatis. Cek audio level sebelum handover."
  },
  {
    id: "rd-5",
    timeSlot: "13:00 - 15:00",
    title: "Ruang Syafaat & Pokok Doa",
    host: "Pnt. Stefanus",
    type: "PRAYER",
    status: "SCHEDULED",
    producerNote: "Fokus pada doa kesembuhan dan keluarga jemaat yang masuk hari ini."
  }
];

export const INITIAL_PRAYER_REQUESTS: PrayerRequest[] = [
  {
    id: "pray-1",
    senderName: "Ibu Susan Wijaya",
    city: "Surabaya",
    phone: "081298765432",
    category: "Kesehatan",
    content: "Mohon dukungan doa untuk kesembuhan ibu mertua saya yang sedang dirawat di RS karena komplikasi jantung. Kiranya Tuhan beri kekuatan dan pemulihan sempurna.",
    allowBroadcast: true,
    status: "PENDING",
    createdAt: "10 menit yang lalu"
  },
  {
    id: "pray-2",
    senderName: "Bpk. Daniel Sitorus",
    city: "Medan",
    phone: "081377889900",
    category: "Pekerjaan",
    content: "Mohon doa untuk kelancaran usaha keluarga yang sedang mengalami tantangan finansial. Percaya Tuhan buka jalan dan mencukupkan.",
    allowBroadcast: true,
    status: "ON_AIR_READING",
    createdAt: "25 menit yang lalu"
  },
  {
    id: "pray-3",
    senderName: "Anonim (Hamba Tuhan)",
    city: "Jakarta Barat",
    category: "Spiritual",
    content: "Mohon didoakan pergumulan batin pribadi agar diberi kelegaan dan pengampunan. Kiranya tim pastoral berkenan mendoakan secara khusus.",
    allowBroadcast: false,
    status: "PASTORAL_CARE",
    createdAt: "1 jam yang lalu"
  },
  {
    id: "pray-4",
    senderName: "Theresia & Suami",
    city: "Bandung",
    phone: "085612345678",
    category: "Keluarga",
    content: "Mengucap syukur atas ulang tahun pernikahan ke-10 hari ini. Mohon doa agar pernikahan kami terus berakar kuat di dalam kasih Kristus.",
    allowBroadcast: true,
    status: "COMPLETED",
    createdAt: "2 jam yang lalu"
  }
];
