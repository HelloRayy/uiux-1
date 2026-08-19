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
    category: 'Recognition vs Recall (Form UX)',
    description: 'Bandingkan dua pendekatan desain formulir login di bawah ini. Mana yang memberikan kenyamanan & kejelasan terbaik bagi pengguna?',
    optionA: {
      label: 'Desain A',
      title: 'Minimalis Placeholder-Only',
      description: 'Hanya mengandalkan placeholder teks tanpa label, tanpa toggle intip sandi, dan tombol submit abu-abu datar.',
      isCorrect: false,
      keyPoints: [
        'Placeholder menghilang saat pengguna mulai mengetik (membebani working memory).',
        'Kontras tombol rendah dan terkesan seperti tombol nonaktif/disabled.',
        'Tidak ada toggle show/hide password, menyulitkan koreksi typo di smartphone.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Explicit Labels & Accessible Controls',
      description: 'Label jelas permanen di atas input, toggle intip kata sandi, dan tombol aksi utama dengan kontras tinggi.',
      isCorrect: true,
      keyPoints: [
        'Recognition over Recall: Label permanen memastikan konteks input tidak hilang saat mengetik.',
        'Toggle intip kata sandi terbukti mengurangi hingga 80% kesalahan input pengguna.',
        'Hierarki visual tombol utama tegas memandu fokus konversi (WCAG AAA compliant).'
      ]
    },
    mentorExplanation: {
      summary: 'Recognition rather than Recall (Nielsen Heuristic #6): Jangan pernah menggantikan label field dengan placeholder yang hilang saat diketik. Manusia jauh lebih cepat mengenali daripada mengingat.',
      takeaway: 'Gunakan label eksplisit di atas input field, sediakan kontrol intip password, dan pastikan Primary CTA memiliki kontras yang kuat.',
      uxPrinciples: ['Nielsen Heuristic #6: Recognition over recall', 'WCAG 2.1 Visual Contrast', 'Cognitive Load Reduction']
    },
    Component: LoginFormCase,
  },
  {
    id: 'case-2-fitts-law',
    title: 'Studi Kasus 2: Penempatan Tombol Konfirmasi Checkout',
    category: "Fitts's Law (Thumb Zone Ergonomics)",
    description: 'Pada layar smartphone modern berukuran besar (6.7"), penempatan tombol konfirmasi pembayaran mana yang paling ergonomis dan minim kesalahan sentuh?',
    optionA: {
      label: 'Desain A',
      title: 'Floating Top-Right Action Button',
      description: 'Tombol konfirmasi pembayaran diletakkan melayang di pojok kanan atas dengan ukuran target 32px.',
      isCorrect: false,
      keyPoints: [
        "Melanggar Fitts's Law: Jarak jangkauan jempol sangat jauh (Hard-to-Reach Zone di pojok atas).",
        'Touch Target Kecil (32px): Berisiko tinggi salah klik atau tidak sengaja memencet elemen lain.',
        'Memaksa Pengguna Memakai 2 Tangan saat posisi sedang berdiri atau berjalan.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Sticky Full-Width Bottom Bar',
      description: 'Tombol sticky selebar layar di tepi bawah (tinggi 52px) tepat di zona jangkauan jempol natural.',
      isCorrect: true,
      keyPoints: [
        "Fitts's Law: Waktu sentuh menjadi sangat cepat karena ukuran target besar dan jarak dari posisi natural jempol dekat.",
        'Ergonomic Thumb Zone: Tepi bawah layar adalah area sentuh paling nyaman untuk operasi 1 tangan.',
        'Target Sentuh >48px: Memenuhi standar aksesibilitas Apple Human Interface Guidelines & WCAG.'
      ]
    },
    mentorExplanation: {
      summary: "Fitts's Law: Waktu yang dibutuhkan untuk mencapai target adalah fungsi dari jarak dan ukuran target tersebut. Semakin dekat dan besar targetnya, semakin cepat dan akurat pengguna menyentuhnya.",
      takeaway: 'Layar smartphone makin tinggi, tetapi jempol manusia tidak bertambah panjang. Selalu tempatkan Primary Action krusial di area sticky bawah.',
      uxPrinciples: ["Fitts's Law", 'Thumb Zone Ergonomics (Steven Hoober)', 'Touch Target Accessibility (WCAG 2.5.5)']
    },
    Component: PricingCase,
  },
  {
    id: 'case-3-hicks-law',
    title: 'Studi Kasus 3: Formulir Pengisian Profil & Onboarding',
    category: "Hick's Law (Progressive Disclosure)",
    description: 'Ketika pengguna diminta melengkapi data profil akun yang cukup panjang, pendekatan arsitektur formulir mana yang menghasilkan angka penyelesaian tertinggi?',
    optionA: {
      label: 'Desain A',
      title: 'Single Long Form (All-in-One Page)',
      description: 'Menampilkan 12 field input sekaligus dalam satu halaman panjang yang harus di-scroll berkali-kali.',
      isCorrect: false,
      keyPoints: [
        "Hick's Law: Waktu keputusan meningkat drastis seiring banyaknya input yang terlihat sekaligus.",
        'Form Fatigue / Cognitive Overload: Pengguna merasa kewalahan melihat formulir yang tampak panjang dan melelahkan.',
        'Tingkat Drop-off Tinggi: Pengguna cenderung menunda atau membatalkan pengisian di tengah jalan.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Progressive Disclosure (3-Step Wizard)',
      description: 'Membagi formulir menjadi 3 tahap terfokus dengan indikator progres yang jelas (3-4 field per tahap).',
      isCorrect: true,
      keyPoints: [
        "Progressive Disclosure: Mengurangi beban kognitif dengan hanya menampilkan data yang relevan di tahap tersebut.",
        'Zeigarnik Effect & Goal Gradient: Indikator langkah (Langkah 1 dari 3) memotivasi pengguna menyelesaikan formulir.',
        'Chunking Information: Otak manusia jauh lebih nyaman memproses 3-4 informasi per sesi daripada 12 sekaligus.'
      ]
    },
    mentorExplanation: {
      summary: "Hick's Law: Waktu yang dibutuhkan untuk mengambil keputusan meningkat secara logaritmik seiring bertambahnya jumlah opsi/elemen yang dihadapi.",
      takeaway: 'Gunakan Progressive Disclosure untuk memecah proses yang rumit menjadi langkah-langkah kecil yang terasa ringan bagi pengguna.',
      uxPrinciples: ["Hick's Law (Decision Time)", 'Progressive Disclosure', "Miller's Law (Chunking 7±2)"]
    },
    Component: CheckoutCase,
  },
  {
    id: 'case-4-doherty-threshold',
    title: 'Studi Kasus 4: Pengalaman Waktu Tunggu Loading Data',
    category: 'Doherty Threshold (Perceived Performance)',
    description: 'Saat aplikasi sedang memuat feed data atau transaksi selama 1.5 detik, representasi loading mana yang memberikan pengalaman paling responsif?',
    optionA: {
      label: 'Desain A',
      title: 'Blank Screen dengan Spinner Memutar',
      description: 'Layar putih kosong dengan animasi spinner mutar abu-abu kecil di tengah layar.',
      isCorrect: false,
      keyPoints: [
        'Perceived Time Terasa Lambat: Layar kosong membuat pengguna merasa waktu tunggu 2x lebih lama dari waktu sebenarnya.',
        'Tidak Memberi Konteks Struktur: Pengguna tidak tahu bentuk konten seperti apa yang akan muncul.',
        'Memicu Kecemasan Sistem Hang: Jika spinner berputar lebih dari 1 detik, pengguna mengira koneksi terputus.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Shimmering Skeleton Placeholder Screen',
      description: 'Kerangka visual berpendar (Skeleton UI) yang merepresentasikan tata letak kartu konten sebelum teks & gambar muncul.',
      isCorrect: true,
      keyPoints: [
        'Doherty Threshold (<400ms feedback): Mata pengguna langsung menerima respons visual instan bahwa halaman sedang aktif dibangun.',
        'Perceived Performance Lebih Cepat: Otak pengguna sudah mulai membaca struktur tata letak kartu sebelum data terisi.',
        'Mencegah Cumulative Layout Shift (CLS): Ruang konten sudah teralokasi dengan ukuran presisi sehingga layar tidak meloncat.'
      ]
    },
    mentorExplanation: {
      summary: 'Doherty Threshold: Produktivitas dan kenyamanan pengguna meningkat drastis ketika sistem memberikan umpan balik visual dalam waktu di bawah 400 milidetik.',
      takeaway: 'Skeleton Screen membuat waktu tunggu terasa jauh lebih singkat dibandingkan spinner statis karena memberikan ilusi proses yang sedang berjalan aktif.',
      uxPrinciples: ['Doherty Threshold (<400ms pace)', 'Perceived Performance Optimization', 'Cumulative Layout Shift (CLS) Prevention']
    },
    Component: NavigationCase,
  },
  {
    id: 'case-5-law-of-proximity',
    title: 'Studi Kasus 5: Struktur Hirarki Rincian Tagihan Biaya',
    category: 'Law of Proximity & Common Region (Gestalt)',
    description: 'Bandingkan ringkasan tagihan pembayaran berikut. Desain mana yang paling cepat dipindai dan tidak memicu kebingungan nominal total bagi pengguna?',
    optionA: {
      label: 'Desain A',
      title: 'Spasi Rata Tanpa Pengelompokan Visual',
      description: 'Seluruh baris rincian item, biaya layanan, diskon promo, dan total akhir disajikan dengan jarak spasi yang seragam tanpa pembatas.',
      isCorrect: false,
      keyPoints: [
        'Melanggar Law of Proximity: Mata pengguna kesulitan membedakan mana biaya dasar, potongan harga, dan biaya tambahan.',
        'Tidak Ada Titik Fokus Total: Angka nominal total akhir tenggelam di antara baris-baris rincian lainnya.',
        'Rawan Kesalahpahaman Biaya: Pengguna harus membaca teliti baris demi baris untuk memastikan tidak ada biaya tersembunyi.'
      ]
    },
    optionB: {
      label: 'Desain B',
      title: 'Gestalt Chunking & Common Region Container',
      description: 'Pengelompokan tegas: Box item belanja terpisah, pill kupon diskon beraksen hijau, dan container total akhir dengan kontras tinggi.',
      isCorrect: true,
      keyPoints: [
        'Law of Proximity: Elemen-elemen yang saling berkaitan diletakkan berdekatan dan dipisahkan dari kelompok logika lainnya.',
        'Law of Common Region: Batasan kartu (*card container*) mempertegas bahwa rincian pembayaran berada dalam satu kesatuan aman.',
        'Clear Visual Anchor: Angka total akhir ditonjolkan dengan bobot visual tegas sehingga langsung terbaca dalam sekali lirik.'
      ]
    },
    mentorExplanation: {
      summary: 'Law of Proximity & Common Region: Elemen-elemen yang berdekatan dan dilingkupi dalam batas visual yang sama akan diproses oleh otak manusia sebagai satu kesatuan fungsional.',
      takeaway: 'Spasi bukan sekadar ruang kosong, melainkan alat pengelompokan informasi. Gunakan spasi dan container untuk membimbing mata pengguna membaca data finansial dengan percaya diri.',
      uxPrinciples: ['Law of Proximity (Gestalt)', 'Law of Common Region', 'Visual Hierarchy & Financial Trust']
    },
    Component: ModalAlertCase,
  }
];
