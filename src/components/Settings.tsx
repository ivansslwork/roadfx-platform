import { useState } from 'react';
import { Settings as SettingsIcon, User, Key, Globe, Bell, Palette, Shield, Link2, Facebook, MessageCircle, Send, Copy, Check } from 'lucide-react';
import type { Lang } from '../i18n';
import { translations } from '../i18n';

interface SettingsProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  user: any;
}

export default function Settings({ lang, setLang, user }: SettingsProps) {
  const t = translations[lang];
  const [tab, setTab] = useState<'profile' | 'api' | 'social' | 'notifications' | 'appearance'>('profile');
  const [apiKey, setApiKey] = useState('rfrx_sk_live_' + Math.random().toString(36).substring(2, 18));
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerateKey = () => {
    setApiKey('rfrx_sk_live_' + Math.random().toString(36).substring(2, 18));
  };

  const tabs = [
    { id: 'profile', label: lang === 'id' ? 'Profil' : 'Profile', icon: User },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'social', label: lang === 'id' ? 'Media Sosial' : 'Social Media', icon: Link2 },
    { id: 'notifications', label: t.notifications, icon: Bell },
    { id: 'appearance', label: lang === 'id' ? 'Tampilan' : 'Appearance', icon: Palette },
  ];

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-4xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><SettingsIcon className="w-7 h-7 text-cyan-400" />{t.settings}</h1>
          <p className="text-sm text-gray-400 mt-1">{user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <aside className="space-y-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as any)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition
                    ${tab === t.id ? 'bg-gradient-to-r from-cyan-500/15 to-purple-500/15 text-cyan-300 border border-cyan-500/20' : 'text-gray-400 hover:bg-[#1a2234]'}`}
                >
                  <Icon className="w-4 h-4" /> {t.label}
                </button>
              );
            })}
          </aside>

          <div className="md:col-span-3 card p-6">
            {tab === 'profile' && (
              <div className="space-y-4">
                <h3 className="font-semibold">{lang === 'id' ? 'Profil Pengguna' : 'User Profile'}</h3>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-3xl font-bold">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{user?.name}</div>
                    <div className="text-sm text-gray-400">{user?.email}</div>
                    <button className="mt-2 text-xs text-cyan-400 hover:underline">{lang === 'id' ? 'Ubah Avatar' : 'Change Avatar'}</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">{lang === 'id' ? 'Nama Lengkap' : 'Full Name'}</label>
                    <input defaultValue={user?.name} className="w-full px-3 py-2 input-field rounded text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">{t.email}</label>
                    <input defaultValue={user?.email} className="w-full px-3 py-2 input-field rounded text-sm" readOnly />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">{t.username}</label>
                    <input defaultValue={user?.name?.toLowerCase().replace(' ', '')} className="w-full px-3 py-2 input-field rounded text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">{t.password}</label>
                    <input type="password" defaultValue="••••••••" className="w-full px-3 py-2 input-field rounded text-sm" />
                  </div>
                </div>
                <button className="btn-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  {lang === 'id' ? 'Simpan Perubahan' : 'Save Changes'}
                </button>
              </div>
            )}

            {tab === 'api' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">API Keys</h3>
                  <p className="text-xs text-gray-500 mt-1">Use these keys to authenticate your EA with RoadFX API</p>
                </div>
                <div className="p-4 rounded-lg bg-[#0a0e1a] border border-[#1f2937]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Live Secret Key</span>
                    <div className="flex gap-1">
                      <button onClick={copyKey} className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                        {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-cyan-400 bg-black/50 p-2 rounded break-all">{apiKey}</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                  ⚠️ Keep this key secret. Do not share it or commit to git.
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-400 mb-1">Endpoint URLs</div>
                  <div className="font-mono text-xs text-cyan-400 bg-[#0a0e1a] p-2 rounded">https://api.roadfx.io/v1/signals</div>
                  <div className="font-mono text-xs text-cyan-400 bg-[#0a0e1a] p-2 rounded">https://api.roadfx.io/v1/heartbeat</div>
                </div>
                <button onClick={regenerateKey} className="px-4 py-2 rounded-lg bg-[#1a2234] text-sm hover:bg-[#1f2937]">
                  Regenerate Key
                </button>
              </div>
            )}

            {tab === 'social' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{lang === 'id' ? 'Hubungkan Media Sosial' : 'Connect Social Media'}</h3>
                  <p className="text-xs text-gray-500 mt-1">Link your accounts (ready for PlayStore release)</p>
                </div>
                {[
                  { name: 'Google', icon: Shield, color: 'bg-red-500/20 text-red-400', connected: true },
                  { name: 'Facebook', icon: Facebook, color: 'bg-blue-500/20 text-blue-400', connected: false },
                  { name: 'Discord', icon: MessageCircle, color: 'bg-indigo-500/20 text-indigo-400', connected: false },
                  { name: 'Telegram', icon: Send, color: 'bg-sky-500/20 text-sky-400', connected: false },
                  { name: 'WhatsApp', icon: MessageCircle, color: 'bg-emerald-500/20 text-emerald-400', connected: false },
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-[#111827] border border-[#1f2937]">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{s.name}</div>
                          <div className="text-xs text-gray-500">{s.connected ? 'Connected' : 'Not connected'}</div>
                        </div>
                      </div>
                      <button className={`px-3 py-1.5 rounded text-xs font-semibold ${s.connected ? 'bg-red-500/10 text-red-400' : 'btn-primary text-white'}`}>
                        {s.connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {tab === 'notifications' && (
              <div className="space-y-3">
                <h3 className="font-semibold">{t.notifications}</h3>
                {[
                  { label: lang === 'id' ? 'Sinyal trading' : 'Trading signals', on: true },
                  { label: lang === 'id' ? 'Event pasar penting (NFP, FOMC)' : 'Critical market events (NFP, FOMC)', on: true },
                  { label: lang === 'id' ? 'Promosi & bonus' : 'Promos & bonuses', on: true },
                  { label: lang === 'id' ? 'Eksekusi auto-trade' : 'Auto-trade executions', on: true },
                  { label: lang === 'id' ? 'Update produk' : 'Product updates', on: false },
                  { label: lang === 'id' ? 'Email marketing' : 'Marketing emails', on: false },
                ].map((n, i) => (
                  <label key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#111827] cursor-pointer hover:bg-[#1a2234]">
                    <span className="text-sm">{n.label}</span>
                    <input type="checkbox" defaultChecked={n.on} className="accent-cyan-500 w-4 h-4" />
                  </label>
                ))}
              </div>
            )}

            {tab === 'appearance' && (
              <div className="space-y-4">
                <h3 className="font-semibold">{lang === 'id' ? 'Tampilan & Bahasa' : 'Appearance & Language'}</h3>
                <div>
                  <label className="text-xs text-gray-400 block mb-2 flex items-center gap-1"><Globe className="w-3 h-3" /> Language / Bahasa</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLang('en')}
                      className={`flex-1 p-3 rounded-lg border text-sm ${lang === 'en' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' : 'border-[#1f2937] text-gray-400'}`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => setLang('id')}
                      className={`flex-1 p-3 rounded-lg border text-sm ${lang === 'id' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' : 'border-[#1f2937] text-gray-400'}`}
                    >
                      🇮🇩 Bahasa Indonesia
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-2">Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Dark (Default)', 'Midnight', 'Ocean'].map((th, i) => (
                      <button key={th} className={`p-3 rounded-lg border text-xs ${i === 0 ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' : 'border-[#1f2937] text-gray-400'}`}>
                        {th}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
