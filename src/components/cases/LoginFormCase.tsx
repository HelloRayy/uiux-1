import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

interface CaseProps {
  variant: 'A' | 'B';
}

export const LoginFormCase: React.FC<CaseProps> = ({ variant }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (variant === 'A') {
    // VARIANT A: Minimalist Placeholder-Only Form without Labels
    return (
      <div className="w-full max-w-sm mx-auto text-slate-600 font-sans py-2">
        <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-5 text-center font-mono">
          Authentication
        </h3>
        <div className="space-y-3.5">
          {/* No Labels, only placeholders */}
          <div>
            <input
              type="text"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300" />
              <span>Ingat saya</span>
            </label>
            <span className="cursor-pointer hover:underline text-slate-500">Reset?</span>
          </div>

          <button
            type="button"
            className="w-full py-2.5 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-xl text-xs font-semibold cursor-pointer transition border border-slate-300"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  // VARIANT B: Explicit Labels & Accessible Controls
  return (
    <div className="w-full max-w-md mx-auto text-slate-900 font-sans py-2">
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Selamat Datang Kembali!</h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">Masukkan kredensial akun Anda untuk melanjutkan.</p>
      </div>

      <div className="space-y-3.5">
        {/* Clear Top Label + Icon + Input */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 font-sans">
            Alamat Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0560FD] focus:bg-white transition font-sans"
            />
          </div>
        </div>

        {/* Clear Password Label + Show/Hide Toggle */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs sm:text-sm font-bold text-slate-800 font-sans">Kata Sandi</label>
            <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs font-bold text-[#0560FD] hover:underline transition font-sans">
              Lupa kata sandi?
            </a>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimal 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0560FD] focus:bg-white transition font-sans"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition p-1 cursor-pointer"
              aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Prominent CTA */}
        <button
          type="button"
          className="w-full py-3 bg-[#0560FD] hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/25 transition cursor-pointer flex items-center justify-center gap-1.5 font-sans"
        >
          Masuk ke Akun
        </button>

        <p className="text-xs text-center text-slate-600 font-sans">
          Belum punya akun?{' '}
          <span className="text-[#0560FD] font-bold cursor-pointer hover:underline">Daftar sekarang</span>
        </p>
      </div>
    </div>
  );
};
