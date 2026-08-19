# UI/UX SplitVote 🎮 (Arena Voting Mentor Interaktif)

Aplikasi web voting perbandingan UI/UX split-screen interaktif (gaya Kahoot / Mentimeter) yang dirancang khusus untuk presentasi mentoring UI/UX kepada adik tingkat / audiens. Dibuat dengan **React + Vite + TypeScript + Tailwind CSS**, siap di-deploy langsung ke **Vercel** dan disinkronkan secara realtime dengan **Firebase Realtime Database** (atau mode **Local Fallback** tanpa setup).

---

## ✨ Fitur Utama

- 🎯 **3 Peran Tampilan Terpisah**:
  - `/host` : **Layar Proyektor** (Lobby QR Code/PIN, Split-screen komparasi desain, Live Countdown Timer, Animasi bar persentase suara, Konfeti perayaan).
  - `/admin` : **Remote Mentor** (Mulai ronde, atur durasi timer 15s/30s/45s/60s, tutup vote/buka hasil seketika, lompat antar kasus, monitoring suara live).
  - `/` atau `/play` : **Layar Peserta Mobile** (Onboarding nickname instan tanpa password, preview visual desain di HP, tombol voting responsif, feedback lock suara).
- 🧩 **5 Studi Kasus UI/UX Nyata (Live Rendered Code)**:
  1. **Form Login & Autentikasi** (Anti-pattern vs Explicit Labels & Accessible Feedback).
  2. **Pricing / Subscription Cards** (Flat equal weight vs Visual Anchor & Decision Hierarchy).
  3. **Tombol Checkout & Ringkasan Bayar** (Accidental misclick danger vs Primary/Secondary hierarchy & Trust cues).
  4. **Mobile Bottom Navigation** (Overcrowded mystery meat vs Thumb zone 48px touch targets).
  5. **Modal Error & Dialog Konfirmasi** (Technical jargon 500 error vs Human empathetic & actionable recovery).
- ⚡ **Web Audio API Game Sound Effects**: Efek suara arcade murni tanpa file eksternal (Tick jam, detik genting terakhir, chime vote masuk, fanfare hasil reveal, gong waktu habis).
- 🚀 **100% Vercel & Serverless Ready**:
  - Menggunakan Firebase Realtime DB untuk WebSocket sync instan (<50ms).
  - Dilengkapi **Smart Local Fallback Mode (BroadcastChannel)** sehingga langsung bisa dicoba di laptop secara offline tanpa setup awal sekalipun!

---

## 🛠️ Cara Menjalankan Secara Lokal

1. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
2. Buka browser:
   - **Layar Proyektor**: [http://localhost:5173/host](http://localhost:5173/host)
   - **Panel Admin Mentor**: [http://localhost:5173/admin](http://localhost:5173/admin)
   - **Layar Peserta**: [http://localhost:5173/](http://localhost:5173/)

*(Jika HP peserta dan laptop berada di jaringan WiFi/Hotspot yang sama, peserta bisa scan QR Code untuk membuka IP laptop lokal kamu, misalnya `http://192.168.1.5:5173`)*.

---

## 🌐 Cara Deploy ke Vercel (Gratis)

1. **Push proyek ke GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: UI/UX SplitVote app"
   git branch -M main
   git remote add origin <URL_REPO_GITHUB_KAMU>
   git push -u origin main
   ```
2. **Deploy di Vercel**:
   - Buka [vercel.com](https://vercel.com) &rarr; **Add New Project** &rarr; Pilih repository GitHub kamu.
   - Framework Preset: **Vite**
   - Klik **Deploy**.

---

## 🔥 Panduan Setup Firebase Realtime Database (2 Menit)

Agar aplikasi bisa diakses peserta lewat internet/Vercel secara realtime:

1. Buka [Firebase Console](https://console.firebase.google.com) &rarr; Klik **Add project** (beri nama bebas).
2. Di menu navigasi samping kiri, buka **Build** &rarr; **Realtime Database** &rarr; Klik **Create Database**.
3. Pilih lokasi server (misal `Singapore` atau `United States`) & pilih mode **Start in test mode** &rarr; Klik **Enable**.
4. Buka Project Settings (ikon ⚙️ di pojok kiri atas) &rarr; Scroll ke bawah ke bagian **Your apps** &rarr; Klik ikon Web `</>`.
5. Salin nilai config dan masukkan ke Environment Variables di Vercel atau buat file `.env` di lokal:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=proyek-kamu.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://proyek-kamu-default-rtdb.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=proyek-kamu
   VITE_FIREBASE_STORAGE_BUCKET=proyek-kamu.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456:web:abcdef
   ```
6. Atau klik tombol **Database Status** di navbar atas aplikasi web untuk memasukkan config langsung melalui browser!

---

## 🎨 Menambah & Mengubah Studi Kasus UI/UX

Semua slide dan materi edukasi mentor tersimpan di file:
[`src/data/slides.ts`](file:///home/rayhan/Windows-D/project/uiux-1/src/data/slides.ts)

Komponen visual studi kasus dapat dimodifikasi atau ditambah di folder:
[`src/components/cases/`](file:///home/rayhan/Windows-D/project/uiux-1/src/components/cases/)
