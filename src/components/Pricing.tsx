import { Check, X, Crown, Zap, Shield, Sparkles, Rocket, Gift, AlertCircle } from 'lucide-react';
import type { Lang } from '../i18n';

interface PricingProps {
  lang: Lang;
  user: any;
  onUpgrade: () => void;
}

export default function Pricing({ lang, user, onUpgrade }: PricingProps) {
  const isId = lang === 'id';

  const freeFeatures = [
    { t: true, text: isId ? 'Akses dashboard dasar' : 'Basic dashboard access' },
    { t: true, text: isId ? 'TradingView chart (delayed)' : 'TradingView chart (delayed)' },
    { t: true, text: isId ? '2 AI Agent terbatas' : '2 AI agents (limited)' },
    { t: true, text: isId ? 'Mode Paper Trading' : 'Paper Trading mode' },
    { t: true, text: isId ? 'Sinyal basic' : 'Basic signals' },
    { t: false, text: isId ? 'Auto-trade eksekusi' : 'Auto-trade execution' },
    { t: false, text: isId ? 'EA compilation' : 'EA compilation' },
    { t: false, text: isId ? 'Webhook & API' : 'Webhook & API access' },
  ];

  const proFeatures = [
    { t: true, text: isId ? 'Semua fitur Free' : 'Everything in Free' },
    { t: true, text: isId ? '5 AI Agent lengkap (Opus, GPT-4o, Seedance, Gemini, DeepSeek)' : 'All 5 AI agents (Opus, GPT-4o, Seedance, Gemini, DeepSeek)' },
    { t: true, text: isId ? 'Auto-trade eksekusi langsung ke broker' : 'Direct broker auto-trade execution' },
    { t: true, text: isId ? 'EA MQL5 compile & deploy' : 'EA MQL5 compile & deploy' },
    { t: true, text: isId ? 'Image & Video generation (Seedance)' : 'Image & Video generation (Seedance)' },
    { t: true, text: isId ? 'Real-time signals (5-30m TF)' : 'Real-time signals (5-30m TF)' },
    { t: true, text: isId ? 'Notifikasi event pasar penting (NFP, FOMC)' : 'Critical market event notifications (NFP, FOMC)' },
    { t: true, text: isId ? 'Webhook & API premium' : 'Premium webhook & API' },
    { t: true, text: isId ? 'Support prioritas 24/7' : '24/7 priority support' },
    { t: true, text: isId ? '🎁 Bonus Welcome Pro 7 hari' : '🎁 Welcome Bonus Pro 7 days' },
  ];

  return (
    <div className="p-6 overflow-y-auto h-full chart-bg">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3 h-3" />
            {isId ? 'PROMO AKTIF' : 'ACTIVE PROMO'}
          </div>
          <h1 className="text-4xl font-bold mb-3">
            {isId ? 'Upgrade ke ' : 'Upgrade to '}
            <span className="text-gradient">RoadFX Pro</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {isId
              ? 'Akses 5 AI agent canggih, auto-trading ke broker, notifikasi event pasar, dan semua fitur premium.'
              : 'Access 5 advanced AI agents, broker auto-trading, market event notifications, and all premium features.'}
          </p>

          {/* Bonus Banner */}
          <div className="mt-6 inline-flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/30 animate-pulse-glow">
            <Gift className="w-8 h-8 text-amber-400" />
            <div className="text-left">
              <div className="text-sm font-bold text-amber-300">🎉 {isId ? 'BONUS WELCOME PRO' : 'WELCOME PRO BONUS'}</div>
              <div className="text-xs text-gray-300">
                {isId
                  ? 'Gratis 7 hari Pro setelah registrasi via forge.mql5.io!'
                  : 'Free 7 days Pro after registration via forge.mql5.io!'}
              </div>
            </div>
            <a
              href="https://forge.mql5.io/ivan_i_82/roadfx-mql5/settings"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 rounded-lg bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition"
            >
              Claim Now →
            </a>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-gray-400" />
              <h3 className="text-xl font-bold">Free</h3>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-gray-400 text-sm"> / forever</span>
            </div>
            <ul className="space-y-2 mb-6">
              {freeFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  {f.t ? (
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-red-400/50 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={f.t ? 'text-gray-300' : 'text-gray-500'}>{f.text}</span>
                </li>
              ))}
            </ul>
            <button
              disabled={user?.plan === 'free' || !user}
              className="w-full py-2.5 rounded-lg bg-[#1a2234] text-gray-400 text-sm font-semibold disabled:opacity-50"
            >
              {user?.plan === 'free' ? 'Current Plan' : user ? 'Downgrade' : 'Sign up for Free'}
            </button>
          </div>

          {/* Pro */}
          <div className="relative card p-6 border-amber-500/40 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-red-500/5 animate-pulse-glow">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[10px] font-bold flex items-center gap-1">
              <Crown className="w-3 h-3" /> MOST POPULAR
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-amber-400" />
              <h3 className="text-xl font-bold text-gradient">Pro</h3>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">$29.99</span>
              <span className="text-gray-400 text-sm"> / month</span>
              <div className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                <Gift className="w-3 h-3" /> First 7 days FREE with Welcome Bonus
              </div>
            </div>
            <ul className="space-y-2 mb-6">
              {proFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">{f.text}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onUpgrade}
              className="w-full py-2.5 rounded-lg btn-primary text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              {isId ? 'Upgrade via PayPal' : 'Upgrade via PayPal'}
            </button>
            <div className="mt-3 text-[10px] text-gray-500 text-center">
              {isId ? 'Pembayaran aman via PayPal. Batalkan kapan saja.' : 'Secure payment via PayPal. Cancel anytime.'}
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-10 card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-cyan-400" /> Security & Trust</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {[
              { icon: Shield, label: 'PayPal Verified', desc: 'Buyer protection' },
              { icon: Sparkles, label: '5 AI Agents', desc: 'Latest models' },
              { icon: Rocket, label: 'Auto-Trading', desc: 'Direct to broker' },
              { icon: AlertCircle, label: 'Paper Mode Default', desc: 'Safe testing' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-start gap-2">
                  <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">{s.label}</div>
                    <div className="text-gray-500">{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-6 card p-6">
          <h3 className="font-bold mb-4">FAQ</h3>
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-semibold mb-1">{isId ? 'Bagaimana cara mengklaim bonus 7 hari?' : 'How to claim 7-day bonus?'}</div>
              <div className="text-gray-400 text-xs">Register via forge.mql5.io link, bonus otomatis aktif setelah login pertama.</div>
            </div>
            <div>
              <div className="font-semibold mb-1">{isId ? 'Apakah pembayaran aman?' : 'Is payment secure?'}</div>
              <div className="text-gray-400 text-xs">Ya, kami menggunakan PayPal dengan buyer protection. Dana Anda aman.</div>
            </div>
            <div>
              <div className="font-semibold mb-1">{isId ? 'Bisa batal kapan saja?' : 'Can I cancel anytime?'}</div>
              <div className="text-gray-400 text-xs">Tentu. Batalkan langganan langsung dari dashboard atau via PayPal.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
