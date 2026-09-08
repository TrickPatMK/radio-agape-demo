export interface ScheduleItem {
  id: string;
  day: number; // 0 = Minggu, 1 = Senin, ... 6 = Sabtu
  startTime: string; // "06:00"
  endTime: string;   // "08:00"
  title: string;
  host: string;
  category: 'Renungan' | 'Pujian' | 'Talkshow' | 'Doa' | 'Youth' | 'Keluarga';
  description: string;
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
  name: "Radio Agape FM Semarang",
  frequency: "94.5 MHz FM",
  tagline: "Mitra Sejati Penyejuk Hati",
  description: "Stasiun Radio 94.5 FM Agape Semarang menghadirkan alunan musik rohani penyejuk hati, firman, renungan inspiratif, dan pembinaan keluarga 24 jam nonstop bagi masyarakat Semarang dan seluruh dunia.",
  address: "Jl. Pringgading 13, Semarang 50135, Jawa Tengah, Indonesia",
  email: "info@agapefm.com",
  officialWebsite: "http://agapefm.com",
  liveStreamUrl: "http://radio.agapefm.com:8000/agapelive",
  channels: [
    {
      id: "main",
      name: "94.5 FM Siaran Utama Studio",
      genre: "Mitra Sejati Penyejuk Hati",
      url: "http://radio.agapefm.com:8000/agapelive",
      format: "application/ogg"
    },
    {
      id: "alkitab",
      name: "Alkitab Suara 24 Jam",
      genre: "Musik Rohani Penyejuk Hati",
      url: "http://radio.agapefm.com:8000/alkitab.ogg",
      format: "application/ogg"
    },
    {
      id: "khotbah",
      name: "Khotbah & Pujian Penyejuk Hati",
      genre: "Khotbah dan Pujian penyejuk Hati",
      url: "http://radio.agapefm.com:8000/khotbahpujian.ogg",
      format: "application/ogg"
    },
    {
      id: "pujian",
      name: "Pujian Nonstop",
      genre: "Musik Pujian Penyejuk Hati",
      url: "http://radio.agapefm.com:8000/pujian.ogg",
      format: "application/ogg"
    },
    {
      id: "mp3fallback",
      name: "Audio Stream MP3",
      genre: "Compatibility Stream",
      url: "http://radio.agapefm.com:8000/dkjlive",
      format: "audio/mpeg"
    }
  ],
  socials: {
    instagram: "https://www.instagram.com/94.5agapefm_smg/",
    facebook: "https://www.facebook.com/profile.php?id=100063828833703",
    onlineRadioBox: "https://onlineradiobox.com/id/agape/?cs=id.agape",
    fmStreaming: "http://fmstream.org/index.php?i=45616",
    surfMusic: "https://www.surfmusic.de/radio-station/agape-94-5-fm,16115.html"
  },
  whatsappBroadcast: "https://wa.me/6281234567890?text=Shalom%2094.5%20Agape%20FM%20Semarang,%20saya%20ingin%20request%20lagu%20dan%20titip%20salam",
  bankDonation: {
    bankName: "BCA (Bank Central Asia)",
    accountNumber: "8420-9988-12",
    accountHolder: "Yayasan Media Kasih Agape",
  }
};

export const MOCK_SCHEDULE: ScheduleItem[] = [
  {
    id: "sch-1",
    day: 1,
    startTime: "05:00",
    endTime: "07:00",
    title: "Embun Pagi: Saat Teduh Bersama Firman",
    host: "Pdt. Yohanes Santoso",
    category: "Renungan",
    description: "Memulai pagi dengan doa fajar, renungan ayat emas hari ini, dan pujian penyembahan penyejuk hati.",
  },
  {
    id: "sch-2",
    day: 1,
    startTime: "07:00",
    endTime: "09:00",
    title: "Agape Morning Booster Semarang",
    host: "Ruth Novita & Daniel Pratama",
    category: "Pujian",
    description: "Lagu-lagu pujian berenergi, kabar baik seputar kota Semarang, dan salam pendengar pembakar semangat kerja.",
  },
  {
    id: "sch-3",
    day: 1,
    startTime: "09:00",
    endTime: "11:00",
    title: "Bincang Keluarga Bahtera Kasih",
    host: "Ibu Maria & Ev. Andreas",
    category: "Keluarga",
    description: "Konseling keluarga dan tanya jawab seputar komunikasi suami-istri dan pengasuhan anak.",
  },
  {
    id: "sch-4",
    day: 1,
    startTime: "11:00",
    endTime: "13:00",
    title: "Alunan Pujian di Tengah Hari",
    host: "AutoDJ Agape",
    category: "Pujian",
    description: "Kompilasi lagu pujian dan penyembahan instrumental menemani waktu istirahat siang.",
  },
  {
    id: "sch-5",
    day: 1,
    startTime: "13:00",
    endTime: "15:00",
    title: "Ruang Syafaat: Doa Bagi Kota & Bangsa",
    host: "Pnt. Stefanus",
    category: "Doa",
    description: "Sesi siaran langsung membawa permohonan doa pendengar dan doa bagi kesejahteraan kota Semarang.",
  },
  {
    id: "sch-6",
    day: 1,
    startTime: "15:00",
    endTime: "17:00",
    title: "Youth Agape Sound 94.5",
    host: "Kevin & Michelle",
    category: "Youth",
    description: "Musik rohani kontemporer, inspirasi anak muda, dan obrolan seputar gaya hidup beriman.",
  },
  {
    id: "sch-7",
    day: 1,
    startTime: "17:00",
    endTime: "19:00",
    title: "Agape Sore Menjelang Senja",
    host: "David Gunawan",
    category: "Talkshow",
    description: "Menemani perjalanan pulang di jalanan Semarang dengan lagu penyejuk hati dan refleksi hikmat.",
  },
  {
    id: "sch-8",
    day: 1,
    startTime: "19:00",
    endTime: "21:00",
    title: "Mimbar Firman Malam",
    host: "Pdt. Dr. Samuel Halim",
    category: "Renungan",
    description: "Kajian eksposisi firman Tuhan untuk membangun keteguhan iman seluruh anggota keluarga.",
  },
  {
    id: "sch-9",
    day: 1,
    startTime: "21:00",
    endTime: "00:00",
    title: "Malam Teduh Penyejuk Hati",
    host: "AutoDJ Agape",
    category: "Pujian",
    description: "Alunan kidung puji-pujian dan pembacaan Mazmur pengantar istirahat malam yang damai.",
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
    showNotes: "Tuhan adalah tempat perlindungan dan kekuatan kita, sebagai penolong dalam kesesakan sangat terbukti. Dalam renungan ini kita belajar melepaskan kecemasan kepada Allah yang berdaulat.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverImage: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pod-2",
    series: "Bahtera Keluarga",
    title: "Membangun Mezbah Doa di Rumah Tangga",
    speaker: "Ev. Andreas & Ibu Maria",
    duration: "32:05",
    durationSeconds: 1925,
    publishedDate: "5 Sep 2026",
    scripture: "Yosua 24:14-15",
    showNotes: "Bagaimana menjaga persekutuan doa keluarga di tengah kesibukan kerja dan sekolah di kota besar? Temukan 4 langkah praktis menyusun saat teduh bersama keluarga.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pod-3",
    series: "Khotbah Minggu Raya",
    title: "Iman yang Berakar Kuat di Masa Sukar",
    speaker: "Pdt. Dr. Samuel Halim",
    duration: "41:30",
    durationSeconds: 2490,
    publishedDate: "1 Sep 2026",
    scripture: "Ibrani 11:1-6",
    showNotes: "Khotbah mendalam mengenai fondasi iman sejati di dalam Kristus Yesus.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverImage: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pod-4",
    series: "Youth Agape Talks",
    title: "Panggilan Hidup & Integritas Generasi Muda",
    speaker: "Kevin Pratama & Michelle",
    duration: "28:45",
    durationSeconds: 1725,
    publishedDate: "28 Agu 2026",
    scripture: "Kolose 3:23-24",
    showNotes: "Inspirasi bagi pemuda-pemudi yang sedang bergumul dalam karir, studi, dan pelayanan.",
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
    producerNote: "Siaran pagi lancar, 14 pokok doa pendengar telah dibacakan di udara."
  },
  {
    id: "rd-2",
    timeSlot: "07:00 - 09:00",
    title: "Agape Morning Booster Semarang",
    host: "Ruth Novita & Daniel Pratama",
    type: "LIVE",
    status: "COMPLETED",
    producerNote: "Request lagu dan salam pendengar Semarang penuh antusias."
  },
  {
    id: "rd-3",
    timeSlot: "09:00 - 11:00",
    title: "Bincang Keluarga Bahtera Kasih",
    host: "Ibu Maria & Ev. Andreas",
    type: "LIVE",
    status: "ON_AIR",
    producerNote: "Topik komunikasi keluarga. Buka interaksi live WhatsApp menit ke-30."
  },
  {
    id: "rd-4",
    timeSlot: "11:00 - 13:00",
    title: "Alunan Pujian di Tengah Hari",
    host: "AutoDJ Agape",
    type: "MUSIC",
    status: "UP_NEXT",
    producerNote: "Rotasi musik pujian penyejuk hati otomatis."
  },
  {
    id: "rd-5",
    timeSlot: "13:00 - 15:00",
    title: "Ruang Syafaat: Doa Bagi Kota & Bangsa",
    host: "Pnt. Stefanus",
    type: "PRAYER",
    status: "SCHEDULED",
    producerNote: "Sesi doa khusus bagi kebutuhan jemaat dan kota Semarang."
  }
];

export const INITIAL_PRAYER_REQUESTS: PrayerRequest[] = [
  {
    id: "pray-1",
    senderName: "Ibu Susan Wijaya",
    city: "Semarang Barat",
    phone: "081298765432",
    category: "Kesehatan",
    content: "Mohon dukungan doa untuk kesembuhan ibu mertua yang sedang dirawat di RS Telogorejo Semarang. Percaya kuasa pemulihan Tuhan.",
    allowBroadcast: true,
    status: "PENDING",
    createdAt: "10 menit yang lalu"
  },
  {
    id: "pray-2",
    senderName: "Bpk. Daniel Sitorus",
    city: "Semarang Candi",
    phone: "081377889900",
    category: "Pekerjaan",
    content: "Mohon doa untuk kelancaran usaha keluarga. Kiranya Tuhan buka jalan dan memberkati pekerjaan tangan kami.",
    allowBroadcast: true,
    status: "ON_AIR_READING",
    createdAt: "25 menit yang lalu"
  },
  {
    id: "pray-3",
    senderName: "Anonim (Jemaat Semarang)",
    city: "Semarang",
    category: "Spiritual",
    content: "Mohon didoakan ketenangan batin dan pemulihan iman pribadi agar terus setia mengiring Tuhan.",
    allowBroadcast: false,
    status: "PASTORAL_CARE",
    createdAt: "1 jam yang lalu"
  },
  {
    id: "pray-4",
    senderName: "Keluarga Bpk. Hendra",
    city: "Semarang Timur",
    phone: "085612345678",
    category: "Keluarga",
    content: "Mengucap syukur atas pertolongan Tuhan dalam pendidikan anak. Terus mohon hikmat surgawi membimbing rumah tangga kami.",
    allowBroadcast: true,
    status: "COMPLETED",
    createdAt: "2 jam yang lalu"
  }
];
