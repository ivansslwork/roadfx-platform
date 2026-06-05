import { useState } from 'react';
import {
  LayoutDashboard, MessageSquare, Bot, Code2, Activity,
  Wallet, Sparkles, Settings, Shield, HeadphonesIcon,
  ChevronLeft, ChevronRight, TrendingUp, Gift, LogOut
} from 'lucide-react';
import type { Lang, TranslationKey } from '../i18n';
import { translations } from '../i18n';

export type View = 'dashboard' | 'arena' | 'agents' | 'ea-studio' | 'signals' | 'portfolio' | 'pricing' | 'settings' | 'admin';

interface SidebarProps {
  view: View;
  setView: (v: View) => void;
  lang: Lang;
  user: any;
  onLogout: () => void;
}

export default function Sidebar({ view, setView, lang, user, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const t = (k: TranslationKey) => translations[lang][k];

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('dashboard'), badge: null },
    { id: 'arena', icon: MessageSquare, label: t('arena'), badge: 'AI' },
    { id: 'agents', icon: Bot, label: t('agents'), badge: '5' },
    { id: 'ea-studio', icon: Code2, label: t('eaStudio'), badge: null },
    { id: 'signals', icon: Activity, label: t('signals'), badge: 'LIVE' },
    { id: 'portfolio', icon: Wallet, label: t('portfolio'), badge: null },
    { id: 'pricing', icon: Sparkles, label: t('pricing'), badge: 'PRO', highlight: true },
  ];

  const bottomItems = [
    { id: 'settings', icon: Settings, label: t('settings') },
    ...(user?.role === 'admin' ? [{ id: 'admin', icon: Shield, label: t('admin') }] : []),
  ];

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 border-r border-[#1f2937] flex flex-col h-full bg-[#0a0e1a]/95 backdrop-blur-xl`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#1f2937]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <div className="text-lg font-bold text-gradient">RoadFX</div>
              <div className="text-[10px] text-gray-500 -mt-0.5">v1.0.0 · Auto Trade</div>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-[#1a2234] text-gray-400 transition"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium group relative
                ${active
                  ? 'bg-gradient-to-r from-cyan-500/15 to-purple-500/15 text-cyan-300 border border-cyan-500/20'
                  : 'text-gray-400 hover:bg-[#1a2234] hover:text-white'
                }
                ${item.highlight ? 'animate-pulse-glow' : ''}
              `}
              title={collapsed ? item.label : ''}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-cyan-400' : ''}`} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold
                      ${item.badge === 'PRO' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black' :
                        item.badge === 'LIVE' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        item.badge === 'AI' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-[#1a2234] text-gray-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {active && <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-r" />}
            </button>
          );
        })}

        {!collapsed && (
          <div className="mt-6 mb-2 px-3">
            <div className="text-[10px] uppercase tracking-wider text-gray-600 font-semibold">
              Support
            </div>
          </div>
        )}

        <a
          href="https://wa.me/62838520326060"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-[#1a2234] hover:text-emerald-400 transition`}
          title={collapsed ? 'WhatsApp Support' : ''}
        >
          <HeadphonesIcon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>WhatsApp Support</span>}
        </a>

        <a
          href="https://twitter.com/ivansslo"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-[#1a2234] hover:text-cyan-400 transition`}
          title={collapsed ? 'Founder' : ''}
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          {!collapsed && <span>Founder @ivansslo</span>}
        </a>
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#1f2937] p-3 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                ${active ? 'bg-[#1a2234] text-white' : 'text-gray-400 hover:bg-[#1a2234] hover:text-white'}`}
              title={collapsed ? item.label : ''}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        {user && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition"
            title={collapsed ? 'Logout' : ''}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>{t('logout')}</span>}
          </button>
        )}

        {!collapsed && (
          <div className="mt-3 p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-semibold text-amber-300">Promo Aktif</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-tight">
              Bonus Welcome Pro 7 hari! <br />
              Berakhir: 7 hari lagi
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
