import React from 'react';
import { SlideCase } from '../types';
import { LoginFormCase } from '../components/cases/LoginFormCase';
import { PricingCase } from '../components/cases/PricingCase';
import { CheckoutCase } from '../components/cases/CheckoutCase';
import { NavigationCase } from '../components/cases/NavigationCase';
import { ModalAlertCase } from '../components/cases/ModalAlertCase';

export interface RegisteredSlide extends SlideCase {
  Component: React.FC<{ variant: 'A' | 'B' }>;
}

export const SLIDES_DATA: RegisteredSlide[] = [
  {
    id: 'case-1-login',
    title: 'Studi Kasus 1: Form Login & Autentikasi',
    category: 'Form & Input UX',
    description: 'Bandingkan dua pendekatan desain formulir login di bawah ini. Mana yang memberikan kenyamanan & kejelasan terbaik bagi pengguna?',
    optionA: {
      label: 'Desain A',
      title: 'Minimalis Tanpa Label',
      description: 'Hanya mengandalkan placeholder teks, tombol submit abu-abu datar, dan tanpa opsi intip kata sandi.',
      isCorrect: false,
      keyPoints: [
        'Placeholder menghilang saat pengguna mulai mengetik (beban kognitif ingatan).',
        'Kontras tombol rendah, terkesan seperti tombol nonaktif/disabled.',
        'Tidak ada toggle show/hide password, menyulitkan pengecekan typo di mobile.',
        'Pesan error tersembunyi dengan bahasa kode teknis yang membingungkan.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Explicit Labels & Accessible Feedback',
      description: 'Label jelas di atas input, toggle intip kata sandi, tombol aksi tegas, dan umpan balik langsung.',
      isCorrect: true,
      keyPoints: [
        'Label permanen di atas field (sesuai standar WCAG Accessibility).',
        'Fitur toggle intip kata sandi mengurangi 80% kesalahan input.',
        'Hierarki visual tombol utama kontras tinggi dengan call-to-action jelas.',
        'Inline validation yang ramah dan menuntun pengguna.'
      ]
    },
    mentorExplanation: {
      summary: 'Prinsip Recognition over Recall: Jangan biarkan pengguna mengingat apa yang harus mereka ketik hanya dari placeholder yang hilang saat diketik.',
      takeaway: 'Gunakan label eksplisit, berikan kontrol visibilitas sandi, dan pastikan tombol aksi utama memiliki kontras minimal 4.5:1 terhadap latar belakang.',
      uxPrinciples: ['Nielsen Heuristic #6: Recognition rather than recall', 'WCAG 2.1 Contrast (Minimum)', 'Error Prevention & Recovery']
    },
    Component: LoginFormCase,
  },
  {
    id: 'case-2-pricing',
    title: 'Studi Kasus 2: Pricing / Subscription Cards',
    category: 'Visual Hierarchy & Decision Making',
    description: 'Bandingkan tampilan kartu paket harga layanan mentorship ini. Desain mana yang lebih memudahkan calon pengguna menentukan pilihan?',
    optionA: {
      label: 'Desain A',
      title: 'Flat Equal Weighting',
      description: 'Kedua kartu paket memiliki ukuran, warna latar, dan gaya tombol yang sama persis tanpa penekanan.',
      isCorrect: false,
      keyPoints: [
        'Hick\'s Law: Pengguna butuh waktu lebih lama membaca dan membandingkan.',
        'Tidak ada visual anchor / paket rekomendasi.',
        'Format harga tidak transparan (apakah bulanan atau tahunan?).',
        'Tombol CTA netral tanpa dorongan psikologis konversi.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Visual Anchor & Clear Differentiation',
      description: 'Paket rekomendasi dipertegas dengan aksen warna, badge keunggulan, dan rincian fitur yang mudah di-scan.',
      isCorrect: true,
      keyPoints: [
        'Decoy Effect & Visual Anchoring: Paket unggulan langsung menarik perhatian mata dalam 3 detik pertama.',
        'Badge \'Rekomendasi\' memberi rasa aman (Social Proof).',
        'Penulisan harga transparan dengan periode langganan jelas.',
        'Tombol aksi paket utama lebih menonjol (Primary CTA vs Secondary CTA).'
      ]
    },
    mentorExplanation: {
      summary: 'Hierarki visual memandu mata pengguna ke keputusan tercepat tanpa merasa kewalahan (Cognitive Load).',
      takeaway: 'Selalu ciptakan titik fokus (Focal Point) pada kartu produk/harga yang paling ingin kamu rekomendasikan ke audiens.',
      uxPrinciples: ['Hick\'s Law (Decision Time)', 'Visual Anchoring & Contrast', 'Scannability Pattern']
    },
    Component: PricingCase,
  },
  {
    id: 'case-3-checkout',
    title: 'Studi Kasus 3: Tombol Aksi Pembayaran (Checkout)',
    category: 'Destructive Actions & Microcopy',
    description: 'Perhatikan layout ringkasan pembayaran dan penataan tombol aksinya. Mana yang mencegah risiko salah klik pengguna?',
    optionA: {
      label: 'Desain A',
      title: 'Equal Split Dangerous Buttons',
      description: 'Tombol Batalkan dan Bayar ditempatkan berdampingan dengan ukuran dan saturasi warna yang sama kuat.',
      isCorrect: false,
      keyPoints: [
        'Rawan fat-finger error: Jari pengguna bisa tidak sengaja memencet Batal saat ingin Bayar.',
        'Aksi destruktif (Batal) diberi bobot visual sama besar dengan aksi utama.',
        'Biaya tambahan muncul tiba-tiba tanpa rincian transparan.',
        'Tidak ada jaminan keamanan transaksi.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Primary Action Hierarchy & Trust Signals',
      description: 'Tombol Bayar sebagai aksi utama yang dominan, aksi batal sebagai secondary text, serta badge keamanan terpercaya.',
      isCorrect: true,
      keyPoints: [
        'Aksi utama (Primary) dan aksi sekunder (Secondary) terpisah dengan sangat tegas.',
        'Rincian harga transparan (item, diskon, biaya admin, total) membangun kepercayaan (Trust).',
        'Microcopy keamanan 256-bit mengurangi kecemasan checkout (Checkout Anxiety).'
      ]
    },
    mentorExplanation: {
      summary: 'Jangan pernah mendudukkan aksi destruktif sejajar secara visual dengan aksi progresif utama dalam form krusial.',
      takeaway: 'Bedakan Primary Action (solid button) dan Secondary/Cancel Action (subtle text link/ghost button) untuk mencegah accidental clicks.',
      uxPrinciples: ['Fitts\'s Law & Touch Targets', 'Error Prevention (Nielsen #5)', 'Trust Building & Transparency']
    },
    Component: CheckoutCase,
  },
  {
    id: 'case-4-navigation',
    title: 'Studi Kasus 4: Navigasi Bawah Aplikasi Mobile',
    category: 'Mobile Accessibility & Ergonomics',
    description: 'Bandingkan bottom navigation bar di aplikasi mobile berikut. Mana yang paling ergonomis dan mudah dioperasikan satu tangan?',
    optionA: {
      label: 'Desain A',
      title: '8 Menu Dijejalkan Icon-Only',
      description: '8 ikon dijejalkan dalam satu baris tanpa teks keterangan, dengan area sentuh kecil di bawah 24px.',
      isCorrect: false,
      keyPoints: [
        'Mystery Meat Navigation: Ikon abstrak tanpa label teks membingungkan pengguna.',
        'Touch target di bawah 48x48px melanggar standar aksesibilitas Google & Apple.',
        'Jarak antar tombol terlalu rapat, rawan salah sentuh.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: '4 Menu Utama Berlabel & Accessible',
      description: 'Maksimal 4-5 menu prioritas dengan ikon dan teks label yang jelas, target sentuh ergonomis.',
      isCorrect: true,
      keyPoints: [
        'Rule of Thumb: 4-5 menu adalah batas ideal navigasi bawah mobile.',
        'Kombinasi Icon + Label teks meningkatkan pemahaman instan hingga 95%.',
        'Touch target 48px nyaman digunakan dengan jempol (Thumb Zone).',
        'Fitur sekunder dikelompokkan rapi ke dalam menu \'Lainnya\'.'
      ]
    },
    mentorExplanation: {
      summary: 'Mobile navigation bukan tempat menaruh semua menu aplikasi. Batasi pada 3-5 tugas terpenting (Top Tasks).',
      takeaway: 'Ikon tanpa label hanya boleh digunakan untuk konsep universal (seperti Search atau Home). Untuk fitur lain, selalu sertakan label teks.',
      uxPrinciples: ['Thumb Zone Ergonomics (Steven Hoober)', 'Apple HIG / Material Design 3 Navigation Standard', 'Cognitive Overload Reduction']
    },
    Component: NavigationCase,
  },
  {
    id: 'case-5-alert',
    title: 'Studi Kasus 5: Pesan Error & Dialog Konfirmasi',
    category: 'Error UX & Human-Centered Microcopy',
    description: 'Ketika sistem mengalami gangguan koneksi, bagaimana dialog error seharusnya menyapa pengguna?',
    optionA: {
      label: 'Desain A',
      title: 'Technical Jargon & Ambiguous Dialog',
      description: 'Menampilkan stack trace kode error mentah dengan tombol aksi \'OK\' dan \'Batal\'.',
      isCorrect: false,
      keyPoints: [
        'Menakut-nakuti pengguna awam dengan istilah teknis internal.',
        'Tombol \'OK\' dan \'Batal\' tidak memberikan kejelasan apa yang akan terjadi selanjutnya.',
        'Tidak menawarkan jalan keluar atau solusi bagi pengguna.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Empathetic Language & Solution-Oriented',
      description: 'Bahasa manusiawi, memberi rasa tenang bahwa data aman, dan menyediakan tombol solusi \'Coba Simpan Lagi\'.',
      isCorrect: true,
      keyPoints: [
        'Empathetic Copywriting: Memberi tahu masalah dengan tenang tanpa menyalahkan pengguna.',
        'Reassurance: Menegaskan bahwa draf tersimpan secara aman.',
        'Actionable Recovery: Tombol aksi langsung menawarkan solusi (\'Coba Simpan Lagi\') daripada \'OK\' yang pasif.'
      ]
    },
    mentorExplanation: {
      summary: 'Error state adalah momen paling rentan pengguna meninggalkan aplikasi (Drop-off). Desainlah pesan error untuk menolong, bukan sekadar melapor.',
      takeaway: 'Pesan error yang baik menjelaskan: 1) Apa yang terjadi dengan bahasa manusiawi, 2) Menenangkan data pengguna, 3) Memberi tombol aksi langsung untuk mencoba kembali.',
      uxPrinciples: ['Nielsen Heuristic #9: Help users recognize, diagnose, and recover from errors', 'Empathetic UX Writing', 'Graceful Degradation']
    },
    Component: ModalAlertCase,
  }
];
