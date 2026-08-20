import React from 'react';
import { SlideCase } from '../types';
import { LoginFormCase } from '../components/cases/LoginFormCase';
import { CheckoutCase } from '../components/cases/CheckoutCase';
import { PricingCase } from '../components/cases/PricingCase';
import { NavigationCase } from '../components/cases/NavigationCase';
import { ModalAlertCase } from '../components/cases/ModalAlertCase';
import { TutorialCase } from '../components/cases/TutorialCase';

export interface RegisteredSlide extends SlideCase {
  Component: React.FC<{ variant: 'A' | 'B' }>;
}

export const TUTORIAL_SLIDE: RegisteredSlide = {
  id: 'case-0-tutorial',
  title: 'Panduan & Simulasi: Cara Melakukan Voting',
  category: 'Panduan Sesi Interaktif UI/UX',
  description: 'Di setiap studi kasus, amati 2 desain di proyektor lalu ketuk Pad A atau Pad B di smartphone Anda dalam 30 detik. Coba lakukan vote percobaan sekarang!',
  optionA: {
    label: 'Desain A',
    title: 'Pilihan Sisi Kiri (Pad A)',
    description: 'Ketuk Pad A pada layar smartphone Anda untuk memilih desain di sebelah kiri.',
    isCorrect: true,
    keyPoints: [
      'Gunakan tombol A di HP untuk memilih desain di sebelah kiri.',
      'Waktu berpikir adalah 30 detik di setiap studi kasus.',
      'Setelah waktu habis, hasil persentase voting audiens akan muncul secara live.'
    ]
  },
  optionB: {
    label: 'Desain B',
    title: 'Pilihan Sisi Kanan (Pad B)',
    description: 'Ketuk Pad B pada layar smartphone Anda untuk memilih desain di sebelah kanan.',
    isCorrect: true,
    keyPoints: [
      'Gunakan tombol B di HP untuk memilih desain di sebelah kanan.',
      'Pilih berdasarkan insting, kenyamanan, dan logika UX Anda.',
      'Mentor akan membedah prinsip dan rahasia desain terbaik bersama Anda.'
    ]
  },
  mentorExplanation: {
    summary: 'Selamat datang di UI/UX SplitVote! Sesi ini bertujuan mengasah intuisi desain dan memahami alasan ilmiah di balik keputusan UI/UX nyata di industri.',
    takeaway: 'Jangan ragu memilih sesuai insting Anda. Setelah voting, kita akan bedah bersama setiap studi kasus!',
    uxPrinciples: ['Interactive Learning', 'Real-time Intuition', 'Scientific UX Reasoning']
  },
  Component: TutorialCase,
};

export const SLIDES_DATA: RegisteredSlide[] = [
  {
    id: 'case-1-login',
    title: 'Studi Kasus 1: Form Login & Autentikasi',
    category: 'Form & Memory UX',
    description: 'Bandingkan dua formulir login ini. Mengapa form yang tampak "minimalis" di Desain A justru sering membuat pengguna bingung saat mengetik?',
    optionA: {
      label: 'Desain A',
      title: 'Minimalis Placeholder-Only',
      description: 'Mengandalkan placeholder abu-abu tanpa label permanen, tanpa opsi intip kata sandi, dan tombol submit datar.',
      isCorrect: false,
      keyPoints: [
        'Jebakan Placeholder: Teks petunjuk hilang saat pengguna mulai mengetik, membebani ingatan (Memory Load).',
        'Tanpa Fitur Intip Sandi: Menyulitkan pengguna mengecek typo pada layar sentuh smartphone.',
        'Kontras Tombol Rendah: Terkesan seperti tombol nonaktif/disabled.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Explicit Label & Password Toggle',
      description: 'Label jelas permanen di atas kolom input, fitur intip kata sandi (toggle eye), dan tombol aksi utama kontras tinggi.',
      isCorrect: true,
      keyPoints: [
        'Recognition over Recall: Label permanen memastikan konteks kolom input tidak pernah hilang.',
        'Toggle Intip Sandi: Mengurangi hingga 80% kesalahan input kata sandi pada perangkat mobile.',
        'Hierarki Visual Jelas: Tombol aksi utama berwarna kontras memandu mata pengguna menyelesaikan tugas.'
      ]
    },
    mentorExplanation: {
      summary: 'Prinsip Recognition over Recall: Jangan pernah menggantikan label field dengan placeholder yang hilang saat diketik. Otak manusia jauh lebih cepat mengenali daripada mengingat.',
      takeaway: 'Gunakan label permanen di atas kolom input dan selalu sediakan tombol intip kata sandi untuk mencegah frustrasi login di smartphone.',
      uxPrinciples: ['Nielsen Heuristic #6: Recognition over recall', 'WCAG 2.1 Visual Contrast', 'Error Prevention (Nielsen #5)']
    },
    Component: LoginFormCase,
  },
  {
    id: 'case-2-buttons',
    title: 'Studi Kasus 2: Tombol Aksi Penting vs Tombol Bahaya',
    category: 'Button Hierarchy & Error Prevention',
    description: 'Perhatikan penataan tombol aksi pada dialog konfirmasi akun ini. Mana tata letak yang paling aman mencegah pengguna tidak sengaja salah klik?',
    optionA: {
      label: 'Desain A',
      title: 'Tombol Sejajar Sama Kuat',
      description: 'Tombol aksi destruktif (Hapus Akun) dan tombol simpan diletakkan berdampingan dengan ukuran dan warna sama mencolok.',
      isCorrect: false,
      keyPoints: [
        'Fat-Finger Error: Jempol pengguna sangat rawan salah menyentuh tombol Hapus saat ingin Simpan.',
        'Tanpa Hierarki Visual: Aksi berbahaya diberi bobot visual yang sama kuat dengan aksi positif.',
        'Memicu Kecemasan: Pengguna harus membaca berulang-ulang karena takut salah pencet.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Primary Action vs Subtle Secondary',
      description: 'Tombol Simpan dominan sebagai Primary Action, sedangkan aksi bahaya/batal dipisahkan sebagai tombol sekunder yang aman.',
      isCorrect: true,
      keyPoints: [
        'Pencegahan Salah Sentuh: Tombol aksi utama (Simpan) dipisahkan secara tegas dari aksi berisiko.',
        'Hierarki Bobot Visual: Warna solid hanya untuk aksi yang paling diinginkan pengguna.',
        'Microcopy Transparan: Memberikan rasa aman dan kejelasan konsekuensi tindakan.'
      ]
    },
    mentorExplanation: {
      summary: 'Hierarki Tombol (Primary vs Destructive): Jangan pernah mendudukkan aksi destruktif sejajar secara visual dengan aksi utama dalam layar krusial.',
      takeaway: 'Gunakan solid button hanya untuk Primary Action, dan jadikan aksi pembatalan berupa ghost button atau subtle text link untuk mencegah accidental click.',
      uxPrinciples: ['Error Prevention (Nielsen #5)', 'Visual Weight & Button Hierarchy', 'Fitts’s Law & Safe Touch Zones']
    },
    Component: CheckoutCase,
  },
  {
    id: 'case-3-darkmode',
    title: 'Studi Kasus 3: Desain Dark Mode (Kenyamanan Mata)',
    category: 'Visual Ergonomics & Dark Mode',
    description: 'Bandingkan dua implementasi mode gelap (Dark Mode) pada kartu artikel & metrik ini. Mana yang memberikan kenyamanan mata dan kedalaman visual terbaik?',
    optionA: {
      label: 'Desain A',
      title: 'True Black (#000000) & Pure White (#FFFFFF)',
      description: 'Menggunakan latar belakang hitam pekat #000000 dengan teks putih murni #FFFFFF tanpa layer kedalaman elevasi.',
      isCorrect: false,
      keyPoints: [
        'Halation Effect: Teks putih murni di atas hitam pekat memicu silau dan membuat mata cepat lelah di ruangan gelap.',
        'Kehilangan Kedalaman (No Depth): Bayangan kartu tidak terlihat di atas latar belakang hitam 100%.',
        'Kontras Ekstrem (21:1): Melebihi ambang batas nyaman mata untuk membaca teks dalam durasi lama.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Layered Dark Surface (#0F172A / #1E293B)',
      description: 'Latar belakang dark slate dengan permukaan kartu bertingkat dan teks off-white yang lembut bagi mata.',
      isCorrect: true,
      keyPoints: [
        'Surface Elevation: Tingkatan warna abu-abu gelap (#1E293B di atas #0F172A) menciptakan kedalaman hirarki visual.',
        'High Reading Comfort: Teks off-white (#F1F5F9) nyaman dibaca dalam durasi lama tanpa efek pendar silau.',
        'Standar Industri Apple & Google: Material Design & iOS Dark Mode menggunakan surface abu-abu bertingkat.'
      ]
    },
    mentorExplanation: {
      summary: 'Dark Mode bukan sekadar mengubah background menjadi hitam pekat (#000000). Gunakan permukaan abu-abu gelap bertingkat untuk menjaga kedalaman visual dan kenyamanan mata.',
      takeaway: 'Gunakan warna dark slate/grey (misal #121212 atau #0F172A) untuk background, naikkan kecerahan sedikit pada kartu di atasnya (#1E293B), dan gunakan teks off-white.',
      uxPrinciples: ['Visual Ergonomics & Eye Fatigue', 'Material Design Dark Theme Elevation', 'WCAG Contrast Ratio for Dark Mode']
    },
    Component: PricingCase,
  },
  {
    id: 'case-4-navigation',
    title: 'Studi Kasus 4: Navigasi Bawah Aplikasi Mobile',
    category: 'Mobile Ergonomics & Simplicity',
    description: 'Bandingkan bottom navigation bar di aplikasi mobile berikut. Mana yang paling nyaman dioperasikan dengan jempol satu tangan?',
    optionA: {
      label: 'Desain A',
      title: '8 Menu Disesaki Icon-Only',
      description: '8 ikon dijejalkan dalam satu baris sempit tanpa teks label dengan area sentuh kecil.',
      isCorrect: false,
      keyPoints: [
        'Mystery Meat Navigation: Ikon abstrak tanpa teks membuat pengguna harus menebak-nebak fungsinya.',
        'Touch Target Terlalu Sempit: Jarak antar ikon rapat, rawan salah pencet saat satu tangan.',
        'Visual Clutter: Membuat antarmuka mobile terlihat penuh dan murah.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: '4 Menu Utama Berlabel & Rapi',
      description: 'Maksimal 4 menu terpenting dengan kombinasi ikon + teks label yang jelas dan jarak sentuh ergonomis.',
      isCorrect: true,
      keyPoints: [
        'Rule of Thumb: 4-5 menu adalah batas ideal navigasi bawah smartphone.',
        'Icon + Label Teks: Meningkatkan kecepatan pemahaman fitur hingga 95%.',
        'Target Sentuh Ergonomis: Ukuran tombol >48px pas dengan jangkauan jempol natural (Thumb Zone).'
      ]
    },
    mentorExplanation: {
      summary: 'Mobile Ergonomics: Navigasi bawah smartphone bukan tempat menaruh semua fitur aplikasi. Batasi hanya pada 3-5 tugas terpenting (Top Tasks).',
      takeaway: 'Ikon tanpa teks hanya efektif untuk konsep universal (Home, Search). Selalu sertakan label teks pada menu navigasi utama aplikasi Anda.',
      uxPrinciples: ['Thumb Zone Ergonomics (Steven Hoober)', 'Apple HIG / Material Design 3 Standard', 'Cognitive Simplicity']
    },
    Component: NavigationCase,
  },
  {
    id: 'case-5-error',
    title: 'Studi Kasus 5: Pesan Error Sistem (Microcopy)',
    category: 'Human-Centered UX Writing',
    description: 'Ketika pengguna gagal menyimpan data atau koneksi bermasalah, bagaimana dialog pesan error seharusnya menyapa pengguna?',
    optionA: {
      label: 'Desain A',
      title: 'Bahasa Teknis & Menakutkan',
      description: 'Menampilkan istilah kode teknis internal ("Error #401: Invalid Request") dengan tombol "OK" yang pasif.',
      isCorrect: false,
      keyPoints: [
        'Menyalahkan/Membingungkan: Pengguna awam tidak paham arti istilah kode server.',
        'Tombol Pasif: Tombol "OK" tidak memberi tahu apa yang harus dilakukan selanjutnya.',
        'Tingkat Frustrasi Tinggi: Pengguna mengira aplikasi rusak dan langsung keluar (Abandonment).'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Bahasa Manusiawi & Solutif',
      description: 'Bahasa ramah, menenangkan bahwa data draf aman, dan menyediakan tombol solusi "Coba Simpan Lagi".',
      isCorrect: true,
      keyPoints: [
        'Empathetic Copywriting: Menjelaskan masalah dengan tenang tanpa menyalahkan pengguna.',
        'Reassurance: Menegaskan bahwa data draf pengguna tidak hilang.',
        'Actionable Solution: Tombol aksi langsung menawarkan jalan keluar (Coba Lagi / Hubungi Bantuan).'
      ]
    },
    mentorExplanation: {
      summary: 'Human-Centered Microcopy: Pesan error bukan tempat menampilkan log programmer, melainkan cara aplikasi berbicara dan menolong manusia menyelesaikan masalah.',
      takeaway: 'Pesan error yang baik selalu memiliki 3 unsur: 1) Jelaskan apa yang terjadi dengan bahasa santun, 2) Tenangkan data pengguna, 3) Beri tombol solusi langsung.',
      uxPrinciples: ['Nielsen Heuristic #9: Help users recognize, diagnose, and recover from errors', 'Empathetic UX Writing', 'Graceful Error Recovery']
    },
    Component: ModalAlertCase,
  }
];
