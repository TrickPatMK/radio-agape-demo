import { withBasePath } from "@/lib/utils";

export interface ScheduleItem {
  id: string;
  day: number; // 0 = Minggu, 1 = Senin, ... 6 = Sabtu
  startTime: string; // "06:00"
  endTime: string; // "08:00"
  title: string;
  host: string;
  category: "Renungan" | "Pujian" | "Talkshow" | "Doa" | "Youth" | "Keluarga";
  description: string;
}

export interface PodcastEpisode {
  id: string;
  series: string;
  shortTab: string;
  title: string;
  speaker: string;
  duration: string;
  durationSeconds: number;
  publishedDate: string;
  scripture: string;
  showNotes: string;
  audioUrl: string;
  coverImage: string;
  coverAlt: string;
}

export interface PrayerRequest {
  id: string;
  senderName: string;
  city: string;
  phone?: string;
  category: "Kesehatan" | "Keluarga" | "Pekerjaan" | "Spiritual" | "Lainnya";
  content: string;
  allowBroadcast: boolean;
  status: "PENDING" | "ON_AIR_READING" | "COMPLETED" | "PASTORAL_CARE";
  createdAt: string;
}

export interface RundownItem {
  id: string;
  timeSlot: string;
  title: string;
  host: string;
  type: "LIVE" | "RECORDED" | "MUSIC" | "PRAYER";
  status: "ON_AIR" | "UP_NEXT" | "COMPLETED" | "SCHEDULED";
  producerNote: string;
}

export interface StageSlide {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  windowLabel: string;
}

export const RADIO_INFO = {
  name: "Radio Agape FM Semarang",
  frequency: "94.5 MHz FM",
  tagline: "Mitra Sejati Penyejuk Hati",
  description:
    "Stasiun Radio 94.5 FM Agape Semarang menyiarkan musik rohani penyejuk hati, pembacaan Alkitab, renungan harian, dan pembinaan keluarga 24 jam nonstop dari Jl. Pringgading 13.",
  address: "Jl. Pringgading 13, Semarang 50135, Jawa Tengah",
  email: "info@agapefm.com",
  officialWebsite: "http://agapefm.com",
  liveStreamUrl: "http://radio.agapefm.com:8000/agapelive",
  channels: [
    {
      id: "main",
      shortLabel: "94.5 Utama",
      dialMark: "94.5 MHz",
      name: "94.5 FM Siaran Utama Studio",
      genre: "Siaran langsung ruang studio Semarang",
      url: "http://radio.agapefm.com:8000/agapelive",
      format: "application/ogg",
    },
    {
      id: "alkitab",
      shortLabel: "Alkitab 24J",
      dialMark: "CH 2",
      name: "Alkitab Suara 24 Jam",
      genre: "Pembacaan firman berurutan tanpa henti",
      url: "http://radio.agapefm.com:8000/alkitab.ogg",
      format: "application/ogg",
    },
    {
      id: "khotbah",
      shortLabel: "Khotbah",
      dialMark: "CH 3",
      name: "Khotbah & Pujian Penyejuk Hati",
      genre: "Pengajaran firman dan kidung rohani",
      url: "http://radio.agapefm.com:8000/khotbahpujian.ogg",
      format: "application/ogg",
    },
    {
      id: "pujian",
      shortLabel: "Pujian",
      dialMark: "CH 4",
      name: "Pujian Nonstop",
      genre: "Musik penyembahan dan instrumen teduh",
      url: "http://radio.agapefm.com:8000/pujian.ogg",
      format: "application/ogg",
    },
    {
      id: "mp3fallback",
      shortLabel: "Jalur MP3",
      dialMark: "MP3",
      name: "Audio Stream MP3 Hemat Data",
      genre: "Jalur kompatibilitas jaringan seluler",
      url: "http://radio.agapefm.com:8000/dkjlive",
      format: "audio/mpeg",
    },
  ],
  socials: {
    instagram: "https://www.instagram.com/94.5agapefm_smg/",
    facebook: "https://www.facebook.com/profile.php?id=100063828833703",
    onlineRadioBox: "https://onlineradiobox.com/id/agape/?cs=id.agape",
    fmStreaming: "http://fmstream.org/index.php?i=45616",
    surfMusic: "https://www.surfmusic.de/radio-station/agape-94-5-fm,16115.html",
  },
  whatsappBroadcast:
    "https://wa.me/6281234567890?text=Shalom%2094.5%20Agape%20FM%20Semarang,%20saya%20ingin%20request%20lagu%20dan%20titip%20salam",
  bankDonation: {
    bankName: "BCA (Bank Central Asia)",
    accountNumber: "8420-9988-12",
    accountHolder: "Yayasan Media Kasih Agape",
  },
};

export const STAGE_SLIDES: StageSlide[] = [
  {
    id: "lawang-sewu",
    src: withBasePath("/media/semarang-lawang-sewu-02.jpg"),
    width: 1920,
    height: 2886,
    alt: "Deretan lengkung putih dan menara kembar gedung bersejarah Lawang Sewu di bawah langit Semarang",
    caption: "Semarang Tengah, jangkauan pemancar darat 94.5 MHz",
    windowLabel: "Siaran Pagi & Siang",
  },
  {
    id: "blenduk",
    src: withBasePath("/media/exterior-of-blenduk-church-semarang-2014-06.jpg"),
    width: 1920,
    height: 1481,
    alt: "Kubah tembaga dan dua menara jam putih Gereja Blenduk di kawasan Kota Lama Semarang",
    caption: "Kawasan Kota Lama Semarang, tak jauh dari Jl. Pringgading",
    windowLabel: "Ibadah & Renungan",
  },
  {
    id: "bandungan",
    src: withBasePath("/media/sunrise-bandungan-semarang-regency-2014-10-01.jpg"),
    width: 1920,
    height: 1280,
    alt: "Cahaya matahari terbit menembus kabut pagi di atas perbukitan Bandungan, Kabupaten Semarang",
    caption: "Fajar di perbukitan Bandungan, waktu Embun Pagi 05:00 WIB",
    windowLabel: "Saat Teduh Fajar",
  },
  {
    id: "kota-lama",
    src: withBasePath("/media/bangunan-kompleks-kota-lama-semarang-01.jpg"),
    width: 1920,
    height: 2560,
    alt: "Balkon dan atap pelana bangunan tua di kompleks Kota Lama Semarang menghadap langit senja",
    caption: "Sudut teduh Kota Lama Semarang menjelang petang",
    windowLabel: "Malam Penyejuk Hati",
  },
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
  {
    id: "sch-1",
    day: 1,
    startTime: "05:00",
    endTime: "07:00",
    title: "Embun Pagi: Saat Teduh Bersama Firman",
    host: "Pdt. Yohanes Santoso",
    category: "Renungan",
    description:
      "Memulai pagi dengan doa fajar, pembacaan Mazmur harian, dan pujian teduh sebelum warga Semarang memulai aktivitas.",
  },
  {
    id: "sch-2",
    day: 1,
    startTime: "07:00",
    endTime: "09:00",
    title: "Agape Morning Booster Semarang",
    host: "Ruth Novita & Daniel Pratama",
    category: "Pujian",
    description:
      "Lagu pujian pagi, sapaan pendengar lintas wilayah Semarang, serta informasi pelayanan gereja lokal.",
  },
  {
    id: "sch-3",
    day: 1,
    startTime: "09:00",
    endTime: "11:00",
    title: "Bincang Keluarga Bahtera Kasih",
    host: "Ibu Maria & Ev. Andreas",
    category: "Keluarga",
    description:
      "Percakapan hangat seputar pernikahan, pendampingan anak, dan pemulihan relasi di dalam rumah tangga.",
  },
  {
    id: "sch-4",
    day: 1,
    startTime: "11:00",
    endTime: "13:00",
    title: "Alunan Pujian di Tengah Hari",
    host: "Siaran Musik Studio",
    category: "Pujian",
    description:
      "Rangkaian kidung penyembahan dan musik instrumen rohani menemani jam istirahat siang.",
  },
  {
    id: "sch-5",
    day: 1,
    startTime: "13:00",
    endTime: "15:00",
    title: "Ruang Syafaat: Doa Bagi Kota & Bangsa",
    host: "Pnt. Stefanus",
    category: "Doa",
    description:
      "Sesi siaran langsung membacakan pokok doa kiriman pendengar dan mendoakan kota Semarang.",
  },
  {
    id: "sch-6",
    day: 1,
    startTime: "15:00",
    endTime: "17:00",
    title: "Youth Agape Sound 94.5",
    host: "Kevin & Michelle",
    category: "Youth",
    description:
      "Musik rohani generasi muda, obrolan panggilan studi serta pekerjaan, dan titip salam sore.",
  },
  {
    id: "sch-7",
    day: 1,
    startTime: "17:00",
    endTime: "19:00",
    title: "Agape Sore Menjelang Senja",
    host: "David Gunawan",
    category: "Talkshow",
    description:
      "Menemani perjalanan pulang kerja di jalanan Semarang dengan lagu penyejuk hati dan renungan singkat.",
  },
  {
    id: "sch-8",
    day: 1,
    startTime: "19:00",
    endTime: "21:00",
    title: "Mimbar Firman Malam",
    host: "Pdt. Dr. Samuel Halim",
    category: "Renungan",
    description:
      "Pengajaran eksposisi Alkitab mendalam bagi pertumbuhan iman jemaat di rumah.",
  },
  {
    id: "sch-9",
    day: 1,
    startTime: "21:00",
    endTime: "00:00",
    title: "Malam Teduh Penyejuk Hati",
    host: "Siaran Malam Agape",
    category: "Pujian",
    description:
      "Pembacaan pasal-pasal Mazmur dan kidung malam pengantar istirahat yang damai.",
  },
];

const SUNDAY_OVERRIDES: Partial<Record<number, Partial<ScheduleItem>>> = {
  0: {
    title: "Fajar Minggu & Persiapan Ibadah",
    host: "Pdt. Yohanes Santoso",
    description: "Doa pagi hari Minggu dan kidung persiapan hati menyambut ibadah raya.",
  },
  1: {
    title: "Ibadah Raya Udara 94.5 FM",
    host: "Pdt. Dr. Samuel Halim",
    category: "Renungan",
    description: "Siaran ibadah Minggu pagi bagi jemaat lansia dan pendengar yang berhalangan hadir di gedung gereja.",
  },
  2: {
    title: "Sekolah Minggu & Cerita Alkitab Anak",
    host: "Kak Ruth & Tim Pelayanan Anak",
    category: "Keluarga",
    description: "Lagu ceria Sekolah Minggu dan kisah tokoh Alkitab untuk keluarga muda di rumah.",
  },
  4: {
    title: "Kesaksian Pujian Minggu Siang",
    host: "Ibu Maria",
    category: "Pujian",
    description: "Kisah nyata pertolongan Tuhan dari surat dan pesan pendengar Semarang.",
  },
};

const SATURDAY_OVERRIDES: Partial<Record<number, Partial<ScheduleItem>>> = {
  2: {
    title: "Akhir Pekan Keluarga Semarang",
    host: "Ev. Andreas & Ibu Maria",
    category: "Keluarga",
    description: "Bincang santai akhir pekan tentang kebersamaan keluarga dan pelayanan masyarakat.",
  },
  5: {
    title: "Panggung Pujian Pemuda Semarang",
    host: "Kevin, Michelle & Komunitas Musik",
    category: "Youth",
    description: "Apresiasi karya lagu rohani musisi muda gereja-gereja di Jawa Tengah.",
  },
  7: {
    title: "Malam Persiapan Hari Tuhan",
    host: "Pnt. Stefanus",
    category: "Doa",
    description: "Saat teduh Sabtu malam dan doa syafaat menyambut ibadah hari Minggu.",
  },
};

const WEDNESDAY_OVERRIDES: Partial<Record<number, Partial<ScheduleItem>>> = {
  4: {
    title: "Persekutuan Doa Tengah Minggu",
    host: "Tim Pastoral Agape",
    category: "Doa",
    description: "Dua jam khusus mendoakan pergumulan kesehatan, usaha, dan keluarga pendengar.",
  },
  7: {
    title: "Pendalaman Kitab Para Nabi",
    host: "Pdt. Dr. Samuel Halim",
    category: "Renungan",
    description: "Studi Alkitab berseri setiap Rabu malam dengan sesi tanya jawab pendengar.",
  },
};

export function getScheduleForDay(day: number): ScheduleItem[] {
  const overrides =
    day === 0
      ? SUNDAY_OVERRIDES
      : day === 6
      ? SATURDAY_OVERRIDES
      : day === 3
      ? WEDNESDAY_OVERRIDES
      : {};

  return MOCK_SCHEDULE.map((item, idx) => {
    const patch = overrides[idx];
    return patch
      ? { ...item, id: `${item.id}-d${day}`, day, ...patch }
      : { ...item, id: `${item.id}-d${day}`, day };
  });
}

export const MOCK_PODCASTS: PodcastEpisode[] = [
  {
    id: "pod-1",
    series: "Embun Pagi Seri Mazmur",
    shortTab: "Mazmur 46",
    title: "Ketenangan di Tengah Badai Hidup",
    speaker: "Pdt. Yohanes Santoso",
    duration: "24:18",
    durationSeconds: 1458,
    publishedDate: "7 Sep 2026",
    scripture: "Mazmur 46:1–12",
    showNotes:
      "Allah adalah tempat perlindungan dan kekuatan kita, sebagai penolong dalam kesesakan sangat terbukti. Renungan pagi tentang melepaskan kecemasan kepada pemeliharaan Tuhan.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverImage: withBasePath("/media/sunrise-bandungan-semarang-regency-2014-10-01.jpg"),
    coverAlt: "Matahari pagi menembus kabut perbukitan Bandungan Semarang",
  },
  {
    id: "pod-2",
    series: "Bahtera Keluarga",
    shortTab: "Keluarga",
    title: "Membangun Mezbah Doa di Rumah Tangga",
    speaker: "Ev. Andreas & Ibu Maria",
    duration: "32:05",
    durationSeconds: 1925,
    publishedDate: "5 Sep 2026",
    scripture: "Yosua 24:14–15",
    showNotes:
      "Bagaimana menjaga persekutuan doa keluarga di tengah kesibukan kerja dan sekolah? Empat langkah sederhana menyusun waktu teduh bersama di meja makan.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverImage: withBasePath("/media/exterior-of-blenduk-church-semarang-2014-06.jpg"),
    coverAlt: "Kubah tembaga dan menara putih Gereja Blenduk Semarang",
  },
  {
    id: "pod-3",
    series: "Khotbah Minggu Raya",
    shortTab: "Ibrani 11",
    title: "Iman yang Berakar Kuat di Masa Sukar",
    speaker: "Pdt. Dr. Samuel Halim",
    duration: "41:30",
    durationSeconds: 2490,
    publishedDate: "1 Sep 2026",
    scripture: "Ibrani 11:1–6",
    showNotes:
      "Khotbah eksposisi mengenai ketekunan iman orang percaya ketika menghadapi ujian ekonomi dan kesehatan.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverImage: withBasePath("/media/semarang-lawang-sewu-02.jpg"),
    coverAlt: "Deretan pilar dan lengkung gedung bersejarah Lawang Sewu Semarang",
  },
  {
    id: "pod-4",
    series: "Youth Agape Talks",
    shortTab: "Generasi Muda",
    title: "Panggilan Hidup & Integritas Generasi Muda",
    speaker: "Kevin Pratama & Michelle",
    duration: "28:45",
    durationSeconds: 1725,
    publishedDate: "28 Agu 2026",
    scripture: "Kolose 3:23–24",
    showNotes:
      "Percakapan praktis bagi mahasiswa dan pekerja muda yang rindu bekerja dengan jujur serta setia dalam perkara kecil.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    coverImage: withBasePath("/media/bangunan-kompleks-kota-lama-semarang-01.jpg"),
    coverAlt: "Balkon bangunan bersejarah di kawasan Kota Lama Semarang",
  },
];

export const INITIAL_RUNDOWN: RundownItem[] = [
  {
    id: "rd-1",
    timeSlot: "05:00–07:00",
    title: "Embun Pagi: Saat Teduh Bersama Firman",
    host: "Pdt. Yohanes Santoso",
    type: "LIVE",
    status: "COMPLETED",
    producerNote: "Siaran pagi berjalan baik, 14 pokok doa fajar telah dibacakan di udara.",
  },
  {
    id: "rd-2",
    timeSlot: "07:00–09:00",
    title: "Agape Morning Booster Semarang",
    host: "Ruth Novita & Daniel Pratama",
    type: "LIVE",
    status: "COMPLETED",
    producerNote: "Sapaan pendengar Semarang Barat dan Banyumanik penuh antusiasme.",
  },
  {
    id: "rd-3",
    timeSlot: "09:00–11:00",
    title: "Bincang Keluarga Bahtera Kasih",
    host: "Ibu Maria & Ev. Andreas",
    type: "LIVE",
    status: "ON_AIR",
    producerNote: "Topik komunikasi suami-istri. Buka sapaan WhatsApp pendengar pada menit ke-30.",
  },
  {
    id: "rd-4",
    timeSlot: "11:00–13:00",
    title: "Alunan Pujian di Tengah Hari",
    host: "Rotasi Musik Studio",
    type: "MUSIC",
    status: "UP_NEXT",
    producerNote: "Daftar putar kidung penyembahan siang sudah siap di jalur utama.",
  },
  {
    id: "rd-5",
    timeSlot: "13:00–15:00",
    title: "Ruang Syafaat: Doa Bagi Kota & Bangsa",
    host: "Pnt. Stefanus",
    type: "PRAYER",
    status: "SCHEDULED",
    producerNote: "Siapkan daftar pokok doa jemaat yang bertanda izin baca di udara.",
  },
];

export const INITIAL_PRAYER_REQUESTS: PrayerRequest[] = [
  {
    id: "pray-1",
    senderName: "Ibu Susan Wijaya",
    city: "Semarang Barat",
    phone: "081298765432",
    category: "Kesehatan",
    content:
      "Mohon dukungan doa untuk kesembuhan ibu mertua yang sedang dirawat di RS Telogorejo Semarang. Kami percaya kuasa pemulihan Tuhan.",
    allowBroadcast: true,
    status: "PENDING",
    createdAt: "10 menit lalu",
  },
  {
    id: "pray-2",
    senderName: "Bpk. Daniel Sitorus",
    city: "Semarang Candi",
    phone: "081377889900",
    category: "Pekerjaan",
    content:
      "Mohon doa untuk kelancaran usaha keluarga di masa pergantian musim ini agar Tuhan membuka jalan dan memberkati karyawan kami.",
    allowBroadcast: true,
    status: "ON_AIR_READING",
    createdAt: "25 menit lalu",
  },
  {
    id: "pray-3",
    senderName: "Anonim (Jemaat Semarang)",
    city: "Semarang Selatan",
    category: "Spiritual",
    content:
      "Mohon didoakan ketenangan batin dan pemulihan iman pribadi supaya kembali tekun bersekutu.",
    allowBroadcast: false,
    status: "PASTORAL_CARE",
    createdAt: "1 jam lalu",
  },
  {
    id: "pray-4",
    senderName: "Keluarga Bpk. Hendra",
    city: "Semarang Timur",
    phone: "085612345678",
    category: "Keluarga",
    content:
      "Mengucap syukur atas kelulusan studi putra kami dan memohon hikmat Tuhan bagi langkah pelayanannya.",
    allowBroadcast: true,
    status: "COMPLETED",
    createdAt: "2 jam lalu",
  },
];

export interface HourlyListenerPoint {
  hour: string;
  listeners: number;
  forecast?: boolean;
}

export const HOURLY_LISTENERS: HourlyListenerPoint[] = [
  { hour: "05:00", listeners: 11 },
  { hour: "06:00", listeners: 19 },
  { hour: "07:00", listeners: 24 },
  { hour: "08:00", listeners: 21 },
  { hour: "09:00", listeners: 18 },
  { hour: "10:00", listeners: 16 },
  { hour: "11:00", listeners: 14, forecast: true },
  { hour: "13:00", listeners: 20, forecast: true },
  { hour: "15:00", listeners: 15, forecast: true },
  { hour: "17:00", listeners: 22, forecast: true },
  { hour: "19:00", listeners: 25, forecast: true },
  { hour: "21:00", listeners: 13, forecast: true },
];
