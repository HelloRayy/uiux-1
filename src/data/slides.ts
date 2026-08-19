import React from 'react';
import { SlideCase } from '../types';
import { LoginFormCase } from '../components/cases/LoginFormCase';
import { CheckoutCase } from '../components/cases/CheckoutCase';
import { PricingCase } from '../components/cases/PricingCase';
import { NavigationCase } from '../components/cases/NavigationCase';
import { ModalAlertCase } from '../components/cases/ModalAlertCase';

export interface RegisteredSlide extends SlideCase {
  Component: React.FC<{ variant: 'A' | 'B' }>;
}

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
    id: 'case-3-pricing',
    title: 'Studi Kasus 3: Pilihan Paket Langganan (Pricing Cards)',
    category: 'Visual Anchoring & Decision Making',
    description: 'Bandingkan tampilan 3 paket langganan ini. Desain mana yang paling cepat memandu mata pengguna mengambil keputusan tanpa merasa bingung?',
    optionA: {
      label: 'Desain A',
      title: 'Flat Equal Weighting',
      description: 'Ketiga kartu paket memiliki tinggi, warna, dan gaya tombol yang sama persis tanpa penekanan.',
      isCorrect: false,
      keyPoints: [
        'Choice Overload: Otak pengguna dipaksa membandingkan dan membaca semua teks satu per satu.',
        'Tanpa Visual Anchor: Tidak ada titik fokus yang membimbing paket mana yang paling direkomendasikan.',
        'Waktu Keputusan Lambat: Pengguna ragu-ragu dan cenderung menunda pembelian (Drop-off).'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Visual Anchor & Highlight Rekomendasi',
      description: 'Paket rekomendasi (Pro) dibuat sedikit lebih tinggi, memiliki badge "Paling Populer", dan tombol aksi lebih menonjol.',
      isCorrect: true,
      keyPoints: [
        'Visual Anchoring: Mata pengguna otomatis tertuju pada paket unggulan dalam 3 detik pertama.',
        'Social Proof: Badge "Paling Populer" memberikan rasa aman dan keyakinan psikologis.',
        'Scannable Hierarchy: Memudahkan perbandingan fitur tanpa membuat mata cepat lelah.'
      ]
    },
    mentorExplanation: {
      summary: 'Visual Anchoring: Otak manusia secara alami mencari titik fokus utama saat melihat banyak pilihan. Ciptakan satu kartu unggulan sebagai pemandu keputusan.',
      takeaway: 'Saat menyajikan lebih dari 2 pilihan paket, selalu sorot satu paket terbaik dengan badge "Rekomendasi" dan tombol visual yang lebih tegas.',
      uxPrinciples: ['Visual Anchoring & Contrast', 'Cognitive Load Reduction', 'Scannability Pattern']
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
