import React, { useState } from 'react';
import { X, Database, Check, ExternalLink, RefreshCw, Key, ShieldCheck, Sparkles } from 'lucide-react';
import { getStoredFirebaseConfig, saveCustomFirebaseConfig, clearCustomFirebaseConfig } from '../services/firebase';

interface Props {
  onClose: () => void;
}

export const FirebaseSetupModal: React.FC<Props> = ({ onClose }) => {
  const currentConfig = getStoredFirebaseConfig();
  const [apiKey, setApiKey] = useState(currentConfig?.apiKey || '');
  const [databaseURL, setDatabaseURL] = useState(currentConfig?.databaseURL || '');
  const [projectId, setProjectId] = useState(currentConfig?.projectId || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !databaseURL) {
      alert('Mohon isi minimal API Key dan Realtime Database URL.');
      return;
    }
    saveCustomFirebaseConfig({
      apiKey,
      databaseURL,
      projectId: projectId || 'demo-project',
      authDomain: `${projectId || 'demo-project'}.firebaseapp.com`,
      storageBucket: `${projectId || 'demo-project'}.appspot.com`,
      messagingSenderId: '123456789',
      appId: '1:123456:web:abcdef',
    });
  };

  const handleReset = () => {
    if (confirm('Kembalikan ke mode Local Demo?')) {
      clearCustomFirebaseConfig();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-ash rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-smoke hover:text-ink rounded-xl bg-mist hover:bg-ash/60 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-electric-blue/10 text-electric-blue rounded-2xl border border-electric-blue/20">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-ink flex items-center gap-2">
              Koneksi Realtime Database
              <span className="text-xs px-2 py-0.5 rounded-full bg-electric-blue/15 text-electric-blue font-semibold font-mono">
                Vercel Ready
              </span>
            </h3>
            <p className="text-xs text-smoke font-sans">
              Sinkronisasi data otomatis antara Proyektor, Mentor, dan Peserta.
            </p>
          </div>
        </div>

        {/* Info Box: Local Mode vs Firebase */}
        <div className="p-4 rounded-2xl bg-mist border border-ash mb-5">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-ink block font-sans">Mode Saat Ini:</span>
              <p className="text-charcoal font-sans">
                {currentConfig ? (
                  <span className="text-signal-green font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Terhubung ke Firebase Realtime DB Cloud.
                  </span>
                ) : (
                  <span className="text-signal-amber font-medium">
                    ⚡ <strong>Local Fallback Mode:</strong> Berjalan otomatis antar tab di browser yang sama tanpa perlu setup apapun!
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-step Guide */}
        <div className="mb-5 bg-mist/70 p-4 rounded-2xl border border-ash">
          <h4 className="text-xs font-bold text-graphite uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
            <Key className="w-3.5 h-3.5 text-electric-blue" /> Panduan Cepat Setup Firebase (Gratis 2 Menit):
          </h4>
          <ol className="text-xs text-smoke space-y-1.5 list-decimal pl-4 font-sans">
            <li>Buka <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-electric-blue underline inline-flex items-center gap-0.5">Firebase Console <ExternalLink className="w-2.5 h-2.5" /></a> dan klik <strong>Tambah Proyek</strong>.</li>
            <li>Di menu samping kiri, klik <strong>Build &rarr; Realtime Database</strong> &rarr; <strong>Create Database</strong> (Pilih mode: <em>Start in test mode</em>).</li>
            <li>Klik ikon gerigi ⚙️ <strong>Project Settings</strong> &rarr; scroll ke bawah ke <strong>Web App</strong> &rarr; copy config.</li>
            <li>Paste nilainya ke form di bawah ini atau simpan ke file <code>.env</code> / Environment Variables di Vercel.</li>
          </ol>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div>
            <label className="block text-graphite font-semibold mb-1 font-sans">
              Database URL <span className="text-signal-red">*</span>
            </label>
            <input
              type="text"
              placeholder="https://proyek-kamu-default-rtdb.firebaseio.com"
              value={databaseURL}
              onChange={(e) => setDatabaseURL(e.target.value)}
              className="w-full px-3 py-2 bg-mist border border-ash rounded-xl text-ink placeholder-smoke focus:outline-none focus:border-electric-blue"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-graphite font-semibold mb-1 font-sans">
                API Key <span className="text-signal-red">*</span>
              </label>
              <input
                type="text"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 bg-mist border border-ash rounded-xl text-ink placeholder-smoke focus:outline-none focus:border-electric-blue"
              />
            </div>
            <div>
              <label className="block text-graphite font-semibold mb-1 font-sans">Project ID</label>
              <input
                type="text"
                placeholder="my-uiux-project"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2 bg-mist border border-ash rounded-xl text-ink placeholder-smoke focus:outline-none focus:border-electric-blue"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-ash">
            {currentConfig && (
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-2 text-smoke hover:text-signal-red transition flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Reset ke Local
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-mist hover:bg-ash/70 text-charcoal rounded-xl font-semibold transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-electric-blue hover:bg-electric-blue/90 text-white rounded-xl font-bold shadow-md shadow-electric-blue/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" /> Simpan & Aktifkan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
