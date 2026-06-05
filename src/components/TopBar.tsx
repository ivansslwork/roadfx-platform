import { useState } from 'react';
import { Search, Bell, Globe, User, Settings, LogOut, Crown, Shield, X, Zap } from 'lucide-react';
import type { Lang, TranslationKey } from '../i18n';
import { translations } from '../i18n';

interface TopBarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  user: any;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onToggleSidebar: () => void;
}

export default function TopBar({ lang, setLang, user, onOpenAuth, onOpenProfile }: TopBarProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [search, setSearch] = useState('');
  const t = (k: TranslationKey) => translations[lang][k];

  const notifications = [
    { id: 1, type: 'promo', title: '🎉 Bonus Welcome Pro', desc: 'Aktif selama 7 hari setelah registrasi!', time: '2m ago' },
    { id: 2, type: 'signal', title: '📈 EUR/USD Strong BUY', desc: 'AI consensus dari 4/5 agen', time: '5m ago' },
    { id: 3, type: 'event', title: '⚡ NFP Event Alert', desc: 'Non-Farm Payroll rilis 30 menit lagi', time: '10m ago' },
    { id: 4, type: 'system', title: '🔔 Auto-Trade Aktif', desc: 'EA RoadFX_v2 berjalan di mode paper', time: '1h ago' },
  ];

  return (
    <header className="h-16 border-b border-[#1f2937] bg-[#0a0e1a]/95 backdrop-blur-xl flex items-center justify-between px-6 relative z-30">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search')}
            className="w-full pl-10 pr-4 py-2 input-field rounded-lg text-sm"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 bg-[#1a2234] px-1.5 py-0.5 rounded border border-[#1f2937]">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Live Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <span className="status-dot online" />
          <span className="text-xs text-emerald-400 font-medium">Paper Trading</span>
        </div>

        {/* Language */}
        <button
          onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
          className="p-2 rounded-lg hover:bg-[#1a2234] text-gray-400 hover:text-white transition flex items-center gap-1.5"
          title="Toggle language"
        >
          <Globe className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase">{lang}</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="p-2 rounded-lg hover:bg-[#1a2234] text-gray-400 hover:text-white transition relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
          {showNotif && (
            <div className="absolute right-0 top-full mt-2 w-80 card p-0 overflow-hidden animate-slide-up z-50">
              <div className="p-3 border-b border-[#1f2937] flex items-center justify-between">
                <span className="text-sm font-semibold">{t('notifications')}</span>
                <button onClick={() => setShowNotif(false)} className="p-1 hover:bg-[#1a2234] rounded"><X className="w-3 h-3" /></button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-[#1a2234]/50 cursor-pointer border-b border-[#1f2937]/50 last:border-0">
                    <div className="text-sm font-medium mb-0.5">{n.title}</div>
                    <div className="text-xs text-gray-400 mb-1">{n.desc}</div>
                    <div className="text-[10px] text-gray-500">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User / Auth */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-lg hover:bg-[#1a2234] transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm relative">
                {user.name?.[0]?.toUpperCase() || 'U'}
                {user.plan === 'pro' && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                    <Crown className="w-2.5 h-2.5 text-black" />
                  </div>
                )}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold">{user.name}</div>
                <div className="text-[10px] text-gray-500 flex items-center gap-1">
                  {user.plan === 'pro' ? (
                    <><Crown className="w-2.5 h-2.5 text-amber-400" /><span className="text-amber-400">PRO</span></>
                  ) : (
                    <><Zap className="w-2.5 h-2.5" /><span>FREE</span></>
                  )}
                </div>
              </div>
            </button>
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-64 card p-2 animate-slide-up z-50">
                <div className="p-3 border-b border-[#1f2937] mb-2">
                  <div className="text-sm font-semibold">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#1a2234] rounded-lg">
                  <User className="w-4 h-4" /> {t('profile')}
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#1a2234] rounded-lg">
                  <Settings className="w-4 h-4" /> {t('settings')}
                </button>
                {user.role === 'admin' && (
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-amber-400 hover:bg-amber-500/10 rounded-lg">
                    <Shield className="w-4 h-4" /> {t('admin')}
                  </button>
                )}
                {user.plan !== 'pro' && (
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-amber-300 hover:bg-amber-500/10 rounded-lg">
                    <Crown className="w-4 h-4" /> {t('pricing')}
                  </button>
                )}
                <div className="border-t border-[#1f2937] mt-2 pt-2">
                  <button onClick={onOpenProfile} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg">
                    <LogOut className="w-4 h-4" /> {t('logout')}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={onOpenAuth} className="btn-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">
            {t('login')}
          </button>
        )}
      </div>
    </header>
  );
}
