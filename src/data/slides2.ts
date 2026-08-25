import React from 'react';
import { SlideCase2 } from '../types';
import { HeroCase } from '../components/cases2/HeroCase';
import { FormCase } from '../components/cases2/FormCase';
import { DashboardCase } from '../components/cases2/DashboardCase';
import { NavCase } from '../components/cases2/NavCase';
import { AlertCase } from '../components/cases2/AlertCase';
import { TutorialCase2 } from '../components/cases2/TutorialCase2';

export interface RegisteredSlide2 extends SlideCase2 {
  Component: React.FC<{ variant: 'A' | 'B' }>;
}

export const TUTORIAL_SLIDE_2: RegisteredSlide2 = {
  id: 'game2-tutorial',
  title: 'Simulasi & Pemanasan: Raw AI vs Human Taste',
  topic: 'Pemanasan Gameplay & Scoring Poin',
  aiPitfall: 'AI cenderung membuat desain heboh dan over-decorated tanpa memikirkan fungsi.',
  humanSolution: 'Human taste memprioritaskan keterbacaan, hierarki tombol, dan kemudahan pengguna.',
  description: 'Pilih desain yang menurut Anda paling nyaman dan menerapkan kaidah UI/UX. Jawab secepat dan setepat mungkin untuk meraih poin maksimal di Leaderboard!',
  correctOption: 'B',
  optionA: {
    label: 'Desain A',
    title: 'Raw AI Generated Button',
    description: 'Tombol dengan gradasi pelangi berlebihan dan teks sulit dibaca.',
    isCorrect: false,
    isRawAI: true,
    keyPoints: [
      'Over-decorated: Gradasi warna berlebih menurunkan keterbacaan teks.',
      'Accessibility Fail: Kontras warna tidak memenuhi standar WCAG.',
      'AI Bias: AI sering menganggap warna-warni heboh sama dengan desain modern.'
    ]
  },
  optionB: {
    label: 'Desain B',
    title: 'Human Taste UI/UX Button',
    description: 'Tombol dengan warna solid kontras tinggi dan ikon pemandu arah yang jelas.',
    isCorrect: true,
    isRawAI: false,
    keyPoints: [
      'Clear Affordance: Jelas terlihat sebagai tombol yang dapat diklik.',
      'High Visual Contrast: Memenuhi standar WCAG AAA sehingga nyaman dibaca.',
      'Action-Oriented: Mengarahkan fokus pengguna menyelesaikan tugas.'
    ]
  },
  mentorExplanation: {
    whyAIFailed: 'AI generator sering terjebak dalam ilusi visual "semakin banyak efek gradasi dan 3D, semakin keren". AI tidak memiliki empati terhadap mata manusia yang mudah lelah.',
    howHumanFixedIt: 'Desainer dengan human taste membuang dekorasi yang tidak berguna dan fokus pada 1 tujuan: memandu pengguna bertindak tanpa berpikir keras.',
    pjblApplication: 'Dalam tugas PJBL kalian, jangan biarkan aplikasi kalian penuh gradasi heboh. Utamakan kejelasan fungsi!',
    keyTakeaway: 'Desain yang baik bukan yang paling banyak pernak-perniknya, melainkan yang paling cepat membantu pengguna mencapai tujuannya.'
  },
  Component: TutorialCase2,
};

export const SLIDES_DATA_2: RegisteredSlide2[] = [
  {
    id: 'game2-case-1-hero',
    title: 'Studi Kasus 1: Hero Section & Call-to-Action (CTA)',
    topic: 'Visual Hierarchy vs AI Over-decoration',
    aiPitfall: 'Menjejali 4 tombol aksi sekaligus dan memakai teks gradasi yang sulit dibaca.',
    humanSolution: 'Membuat 1 Primary Action tegas + 1 Secondary Action dengan kontras tinggi.',
    description: 'Bandingkan dua landing page hero section di bawah ini. Desain mana yang paling efektif memandu pengguna mengambil keputusan tanpa merasa bingung?',
    correctOption: 'B',
    optionA: {
      label: 'Desain A',
      title: 'Raw AI Generated Hero',
      description: 'Menampilkan 4 tombol aksi sekaligus dengan teks gradasi warna-warni yang bertabrakan.',
      isCorrect: false,
      isRawAI: true,
      keyPoints: [
        'Choice Paralysis (Hick’s Law): 4 tombol dengan warna sama kuat membuat pengguna bingung harus klik yang mana.',
        'Contrast Failure: Teks judul gradasi tipis di atas background ungu menurunkan tingkat keterbacaan hingga 50%.',
        'AI Clutter: AI menambahkan badge-badge acak tanpa hierarki prioritas pesan.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Human Taste UI/UX Hero',
      description: 'Value proposition tegas, 1 tombol aksi utama (Primary CTA) + 1 link sekunder, dan kontras WCAG AAA.',
      isCorrect: true,
      isRawAI: false,
      keyPoints: [
        'Clear Visual Hierarchy: 1 Primary CTA ("Coba Gratis 14 Hari") langsung menangkap 80% fokus mata.',
        'High Accessibility (WCAG AAA): Kontras teks hitam solid di atas kartu putih sangat nyaman dibaca.',
        'Human Empathy: Menghilangkan kecemasan pengguna dengan microcopy "Tanpa Kartu Kredit".'
      ]
    },
    mentorExplanation: {
      whyAIFailed: 'AI generator sering menganggap bahwa semua opsi harus ditampilkan sekaligus (Try, Demo, Sales, Download) dan mempercantik layar dengan gradasi neon. Akibatnya pengguna mengalami kelumpuhan keputusan (Choice Paralysis).',
      howHumanFixedIt: 'Desainer manusia memahami psikologi keputusan: Pengguna hanya butuh 1 pintu masuk utama (Primary CTA) dan 1 jalur alternatif (Secondary).',
      pjblApplication: 'Pada landing page aplikasi PJBL kalian, tentukan HANYA 1 tombol utama yang paling ingin kalian klik oleh user!',
      keyTakeaway: 'Hierarki visual adalah kunci konversi. Jika semua tombol teriak bersamaan, tidak ada tombol yang akan didengar oleh pengguna.'
    },
    Component: HeroCase,
  },
  {
    id: 'game2-case-2-form',
    title: 'Studi Kasus 2: Formulir Checkout & Registrasi',
    topic: 'Cognitive Load vs Progressive Disclosure',
    aiPitfall: 'Menjejalkan 12 input field sekaligus dalam 1 grid sempit tanpa tahapan logis.',
    humanSolution: 'Membagi formulir menjadi 3 langkah progresif (*Chunking Information*).',
    description: 'Ketika pengguna harus melengkapi data identitas dan alamat pengiriman, arsitektur formulir mana yang paling minim membuat pengguna frustrasi?',
    correctOption: 'B',
    optionA: {
      label: 'Desain A',
      title: 'Raw AI All-in-One Form',
      description: '12 kolom input dijejalkan dalam grid 3 kolom yang sempit tanpa pembagian tahapan.',
      isCorrect: false,
      isRawAI: true,
      keyPoints: [
        'Form Fatigue / Cognitive Overload: Pengguna langsung merasa lelah melihat formulir yang tampak rumit.',
        'Tingkat Drop-off Tinggi: Pengguna cenderung menunda atau membatalkan registrasi di tengah jalan.',
        'Layout Sempit: Input 3-kolom menyulitkan pengetikan di smartphone.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Human Taste Progressive Form',
      description: 'Membagi input ke dalam 3 tahap logis dengan progress bar dan fokus 2-3 field per langkah.',
      isCorrect: true,
      isRawAI: false,
      keyPoints: [
        'Progressive Disclosure: Hanya menampilkan field yang relevan pada tahap aktif untuk menjaga fokus mental.',
        'Goal Gradient Effect: Indikator langkah (1 dari 3) memotivasi pengguna menyelesaikan formulir hingga akhir.',
        'Chunking (Miller’s Law): Otak manusia memproses 2-3 informasi jauh lebih cepat dan minim kesalahan.'
      ]
    },
    mentorExplanation: {
      whyAIFailed: 'AI hanya melihat database: "Ada 12 kolom yang harus diisi", lalu melempar semuanya ke dalam satu grid tabel HTML. AI tidak merasakan rasa malas atau kewalahan yang dialami manusia.',
      howHumanFixedIt: 'Desainer menerapkan Progressive Disclosure: Memecah tugas besar menjadi langkah-langkah kecil yang terasa ringan bagi otak manusia.',
      pjblApplication: 'Saat mendesain form registrasi atau transaksi di tugas PJBL, jangan pernah masukkan semua input dalam 1 layar panjang!',
      keyTakeaway: 'Formulir yang baik tidak menuntut energi pengguna di awal, melainkan membimbing mereka langkah demi langkah.'
    },
    Component: FormCase,
  },
  {
    id: 'game2-case-3-dashboard',
    title: 'Studi Kasus 3: Desain Dashboard & Visualisasi Metrik',
    topic: 'Semantic Colors & Information Architecture',
    aiPitfall: 'Memakai 8 warna neon acak dan membalik arti warna semantik (Merah untuk naik, Hijau untuk turun).',
    humanSolution: 'Menggunakan warna semantik standar (Hijau: Positif, Merah: Negatif) dan tipografi KPI jelas.',
    description: 'Bandingkan ringkasan metrik analitik bisnis ini. Tampilan mana yang paling cepat dibaca dan tidak memicu salah interpretasi data keuangan?',
    correctOption: 'B',
    optionA: {
      label: 'Desain A',
      title: 'Raw AI Neon Chaos',
      description: 'Kartu metrik dengan 8 warna neon acak dan pemakaian warna merah untuk metrik kenaikan positif.',
      isCorrect: false,
      isRawAI: true,
      keyPoints: [
        'Semantic Violation: Menggunakan warna merah untuk kenaikan revenue dan hijau untuk penurunan user membingungkan otak.',
        'Visual Fatigue: 8 warna neon bertabrakan membuat mata tidak tahu angka mana yang paling krusial.',
        'Fake Data Chart: Grafik hiasan tanpa sumbu X/Y yang tidak memiliki nilai informasi nyata.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Human Taste Semantic Dashboard',
      description: 'Latar belakang netral bersih, angka KPI besar menonjol, dan warna semantik standar yang universal.',
      isCorrect: true,
      isRawAI: false,
      keyPoints: [
        'Consistent Semantics: Hijau untuk metrik pertumbuhan positif, merah untuk alert/penurunan risiko.',
        'Scannability Hierarchy: Angka nominal KPI langsung terbaca dalam 1 detik pertama tanpa distraksi.',
        'High Financial Trust: Desain monokrom netral membangun rasa percaya dan profesionalitas data.'
      ]
    },
    mentorExplanation: {
      whyAIFailed: 'AI memilih warna secara estetika acak (random sampling warna cerah) tanpa memahami bahwa dalam kultur manusia, Merah = Bahaya/Stop dan Hijau = Sukses/Aman.',
      howHumanFixedIt: 'Desainer menggunakan warna secara fungsional: 90% warna netral (slate/white), dan warna cerah hanya dipakai sebagai aksen semantik untuk data penting.',
      pjblApplication: 'Untuk dashboard aplikasi PJBL, gunakan warna secara hemat. Warna bukan untuk hiasan, melainkan penyampai pesan!',
      keyTakeaway: 'Dalam visualisasi data, keindahan visual sejati lahir dari kejelasan informasi, bukan keramaian palet warna.'
    },
    Component: DashboardCase,
  },
  {
    id: 'game2-case-4-nav',
    title: 'Studi Kasus 4: Navigasi Bawah Aplikasi Mobile',
    topic: 'Universal Mental Models vs AI Hallucination',
    aiPitfall: 'Membuat 6 ikon geometris abstrak buatan AI tanpa teks label (*Mystery Meat Navigation*).',
    humanSolution: 'Menggunakan 4 menu standar industri dengan ikon familiar + teks label terarah.',
    description: 'Pada aplikasi smartphone, struktur navigasi bawah mana yang paling cepat dipahami pengguna tanpa perlu menebak-nebak fungsinya?',
    correctOption: 'B',
    optionA: {
      label: 'Desain A',
      title: 'Raw AI Mystery Icons',
      description: '6 ikon abstrak tanpa teks keterangan yang memaksa pengguna menebak fungsinya satu per satu.',
      isCorrect: false,
      isRawAI: true,
      keyPoints: [
        'Mystery Meat UI: Ikon abstrak (seperti api, berlian, spiral) tidak memiliki arti konseptual yang universal.',
        'Narrow Touch Target: 6 ikon dalam 1 baris membuat tombol terlalu sempit dan rawan salah sentuh (*misclick*).',
        'High Cognitive Friction: Pengguna harus mengklik semua ikon hanya untuk mencari letak halaman tugas.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Human Taste Ergonomic Navigation',
      description: '4 menu prioritas terpenting dengan kombinasi ikon standar + teks label yang jelas dan tombol lega.',
      isCorrect: true,
      isRawAI: false,
      keyPoints: [
        'Jakob’s Law & Mental Models: Memanfaatkan pola navigasi yang sudah biasa dipakai pengguna di aplikasi populer.',
        'Icon + Text Pairing: Menghilangkan keraguan arti ikon dan mempercepat navigasi hingga 95%.',
        'Thumb Zone Comfort: Lebar tombol >80px sangat ergonomis untuk jangkauan jempol satu tangan.'
      ]
    },
    mentorExplanation: {
      whyAIFailed: 'AI generator sering membuat ikon-ikon kustom yang terlihat "futuristik" tapi melupakan bahwa manusia butuh konsistensi simbol (Mental Models).',
      howHumanFixedIt: 'Desainer mematuhi standar ergonomi mobile: batasi 3-5 menu terpenting dan selalu pasangkan ikon dengan teks label.',
      pjblApplication: 'Pada prototipe mobile PJBL kalian, jangan pernah buat menu bawah berisi 6-8 ikon tanpa teks!',
      keyTakeaway: 'Navigasi yang hebat adalah navigasi yang tidak membuat pengguna berpikir atau menebak cara berpindah halaman.'
    },
    Component: NavCase,
  },
  {
    id: 'game2-case-5-alert',
    title: 'Studi Kasus 5: Penanganan Error & Pesan Sistem',
    topic: 'Empathetic UX Writing vs Robotic Jargon',
    aiPitfall: 'Menampilkan pesan teknis menyeramkan yang menyalahkan sistem/pengguna dengan tombol abort.',
    humanSolution: 'Memberi rasa tenang bahwa data aman dan menyediakan tombol solusi nyata (*Graceful Recovery*).',
    description: 'Ketika koneksi internet terputus saat pengguna menyimpan draf, dialog pesan error mana yang paling manusiawi dan menenangkan?',
    correctOption: 'B',
    optionA: {
      label: 'Desain A',
      title: 'Raw AI Robotic Error',
      description: 'Menampilkan kode server internal menyeramkan ("FATAL_EXCEPTION_403") dengan tombol "ABORT".',
      isCorrect: false,
      isRawAI: true,
      keyPoints: [
        'Fear & Anxiety: Pengguna mengira aplikasi rusak total atau data mereka terhapus permanen.',
        'Robotic Jargon: Istilah "payload rejected by proxy" sama sekali tidak berguna bagi pengguna awam.',
        'Dead-End Button: Tombol "ABORT" tidak memberi jalan keluar bagaimana cara menyelesaikan masalah.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Human Taste Empathetic Alert',
      description: 'Bahasa santun yang menjelaskan masalah, menenangkan data draf aman, dan ada tombol "Coba Simpan Lagi".',
      isCorrect: true,
      isRawAI: false,
      keyPoints: [
        'Graceful Error Recovery (Nielsen #9): Membantu pengguna mengenali, mendiagnosis, dan memulihkan error tanpa panik.',
        'Reassurance: Menegaskan bahwa seluruh perubahan tugas aman tersimpan di perangkat lokal.',
        'Actionable Next Step: Tombol "Coba Simpan Lagi" dan link bantuan memberi solusi instan 1-klik.'
      ]
    },
    mentorExplanation: {
      whyAIFailed: 'AI meniru output log terminal backend ("Exception 403 / StackTrace") karena AI tidak memahami rasa panik manusia saat kehilangan data pekerjaan penting.',
      howHumanFixedIt: 'Desainer menerapkan Empathetic Microcopy: Menerjemahkan masalah teknis menjadi bahasa manusiawi yang menenangkan dan solutif.',
      pjblApplication: 'Di tugas PJBL kalian, buatlah pesan error yang sopan, ramah, dan selalu sediakan tombol retry!',
      keyTakeaway: 'Pesan error bukan tempat menampilkan log programmer, melainkan momen terpenting untuk menunjukkan kepedulian kepada pengguna.'
    },
    Component: AlertCase,
  }
];
