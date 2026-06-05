import { useState, useEffect, useRef } from 'react';
import { TrendingUp, DollarSign, Target, Zap, Activity, Play, Pause, AlertTriangle, Settings } from 'lucide-react';
import type { Lang, TranslationKey } from '../i18n';
import { translations } from '../i18n';

interface DashboardProps {
  lang: Lang;
  user: any;
}

const PAIRS = [
  { symbol: 'EUR/USD', category: 'Forex', price: 1.0876, change: 0.34, signal: 'BUY', confidence: 87 },
  { symbol: 'GBP/USD', category: 'Forex', price: 1.2734, change: -0.21, signal: 'SELL', confidence: 72 },
  { symbol: 'USD/JPY', category: 'Forex', price: 149.23, change: 0.56, signal: 'BUY', confidence: 81 },
  { symbol: 'XAU/USD', category: 'Metal', price: 2034.50, change: 1.24, signal: 'BUY', confidence: 92 },
  { symbol: 'XAG/USD', category: 'Metal', price: 22.87, change: -0.45, signal: 'HOLD', confidence: 55 },
  { symbol: 'BTC/USD', category: 'Crypto', price: 67420, change: 2.34, signal: 'BUY', confidence: 78 },
  { symbol: 'ETH/USD', category: 'Crypto', price: 3521, change: 1.87, signal: 'BUY', confidence: 75 },
  { symbol: 'AUD/USD', category: 'Forex', price: 0.6543, change: -0.12, signal: 'SELL', confidence: 68 },
];

export default function Dashboard({ lang, user }: DashboardProps) {
  const t = (k: TranslationKey) => translations[lang][k];
  const [autoTrade, setAutoTrade] = useState(false);
  const [paperMode, setPaperMode] = useState(true);
  const [selectedPair, setSelectedPair] = useState(PAIRS[0].symbol);
  const [filter, setFilter] = useState<'All' | 'Forex' | 'Metal' | 'Crypto'>('All');
  const [prices, setPrices] = useState(PAIRS);
  const [timeframe, setTimeframe] = useState('15');
  const chartRef = useRef<HTMLDivElement>(null);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        price: +(p.price * (1 + (Math.random() - 0.5) * 0.001)).toFixed(p.price > 1000 ? 2 : 5),
        change: +(p.change + (Math.random() - 0.5) * 0.1).toFixed(2),
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Load TradingView widget
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.innerHTML = '';
      const tvSymbol = selectedPair.replace('/', '');
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        if ((window as any).TradingView && chartRef.current) {
          new (window as any).TradingView.widget({
            width: '100%',
            height: 500,
            symbol: `OANDA:${tvSymbol}`,
            interval: timeframe,
            timezone: 'Etc/UTC',
            theme: 'dark',
            style: '1',
            locale: lang === 'id' ? 'id' : 'en',
            toolbar_bg: '#0a0e1a',
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            container_id: chartRef.current.id,
            studies: ['RSI@tv-basicstudies', 'MACD@tv-basicstudies', 'BB@tv-basicstudies'],
          });
        }
      };
      document.head.appendChild(script);
    }
  }, [selectedPair, timeframe, lang]);

  const filteredPairs = prices.filter(p => filter === 'All' || p.category === filter);
  const selected = prices.find(p => p.symbol === selectedPair) || prices[0];

  const stats = [
    { label: t('portfolioValue'), value: '$12,847.52', change: '+12.4%', icon: DollarSign, color: 'cyan' },
    { label: t('todayPnl'), value: '+$247.83', change: '+1.96%', icon: TrendingUp, color: 'emerald' },
    { label: t('winRate'), value: '73.4%', change: '+2.1%', icon: Target, color: 'purple' },
    { label: t('activeEAs'), value: '3 / 5', change: 'Running', icon: Zap, color: 'amber' },
  ];

  const canAutoTrade = user && (user.plan === 'pro' || user.role === 'admin');

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('welcome')}, {user?.name || 'Trader'} 👋</h1>
          <p className="text-sm text-gray-400 mt-1">{new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Auto Trade Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#111827] border border-[#1f2937]">
            <button
              onClick={() => setPaperMode(!paperMode)}
              disabled={!canAutoTrade}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition ${paperMode ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-300'} ${!canAutoTrade ? 'opacity-50' : ''}`}
            >
              {paperMode ? `📋 ${t('paperMode')}` : `🔴 ${t('liveMode')}`}
            </button>
            <button
              onClick={() => canAutoTrade && setAutoTrade(!autoTrade)}
              disabled={!canAutoTrade}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold transition
                ${autoTrade ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-[#1a2234] text-gray-400'}
                ${!canAutoTrade ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a2234]'}`}
            >
              {autoTrade ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {t('autoTrade')}
            </button>
          </div>
          {!canAutoTrade && (
            <div className="text-xs text-amber-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Pro only
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const colorMap: any = {
            cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
            emerald: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
            purple: 'from-purple-500/10 to-purple-500/5 border-purple-500/20 text-purple-400',
            amber: 'from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-400',
          };
          return (
            <div key={i} className={`card p-4 bg-gradient-to-br ${colorMap[s.color]} border`}>
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5`} />
                <span className="text-xs font-medium text-gray-400">{s.change}</span>
              </div>
              <div className="text-xs text-gray-400 mb-1">{s.label}</div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart Area - 2 cols */}
        <div className="lg:col-span-2 card p-0 overflow-hidden">
          <div className="p-4 border-b border-[#1f2937] flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="text-lg font-bold">{selected.symbol}</div>
              <div className={`text-sm font-semibold ${selected.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ${selected.price.toLocaleString()} {selected.change >= 0 ? '▲' : '▼'} {Math.abs(selected.change)}%
              </div>
              <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                selected.signal === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' :
                selected.signal === 'SELL' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
              }`}>
                AI: {selected.signal}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {['5', '15', '30'].map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded text-xs font-semibold ${timeframe === tf ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:bg-[#1a2234]'}`}
                >
                  {tf}m
                </button>
              ))}
              <button className="p-1.5 rounded hover:bg-[#1a2234] text-gray-400">
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div ref={chartRef} id="tv_chart_container" className="w-full h-[500px] chart-bg" />
          <div className="p-3 text-[10px] text-gray-500 border-t border-[#1f2937] flex items-center gap-2">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>Real-time chart via TradingView · Indicators: RSI, MACD, Bollinger Bands · Timeframe 5-30 min</span>
          </div>
        </div>

        {/* Pairs List */}
        <div className="card p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#1f2937]">
            <div className="text-sm font-semibold mb-3 flex items-center justify-between">
              <span>{t('pairs')}</span>
              <span className="text-xs text-emerald-400 flex items-center gap-1"><span className="status-dot online" /> LIVE</span>
            </div>
            <div className="flex gap-1">
              {(['All', 'Forex', 'Metal', 'Crypto'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded text-xs font-medium transition ${filter === f ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:bg-[#1a2234]'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[580px]">
            {filteredPairs.map((p) => (
              <div
                key={p.symbol}
                onClick={() => setSelectedPair(p.symbol)}
                className={`p-3 border-b border-[#1f2937]/50 cursor-pointer transition hover:bg-[#1a2234]/50 ${selectedPair === p.symbol ? 'bg-cyan-500/5' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{p.symbol}</span>
                    <span className="text-[10px] text-gray-500 px-1.5 py-0.5 bg-[#1a2234] rounded">{p.category}</span>
                  </div>
                  <span className={`text-xs font-bold ${p.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {p.change >= 0 ? '+' : ''}{p.change}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">${p.price.toLocaleString()}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1 bg-[#1a2234] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" style={{ width: `${p.confidence}%` }} />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      p.signal === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' :
                      p.signal === 'SELL' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {p.signal}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Consensus Panel */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              AI Agent Consensus · {selected.symbol}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">5 agents analyzing in real-time</p>
          </div>
          <div className="text-xs text-gray-500">Updated 2s ago</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { name: 'Opus', verdict: 'STRONG BUY', conf: 92, color: 'emerald' },
            { name: 'GPT-4o', verdict: 'BUY', conf: 87, color: 'emerald' },
            { name: 'Seedance', verdict: 'BUY', conf: 78, color: 'cyan' },
            { name: 'Gemini', verdict: 'HOLD', conf: 62, color: 'amber' },
            { name: 'DeepSeek', verdict: 'BUY', conf: 81, color: 'emerald' },
          ].map((a, i) => (
            <div key={i} className="p-3 rounded-lg bg-[#0a0e1a]/50 border border-[#1f2937]">
              <div className="text-xs font-semibold mb-1">{a.name}</div>
              <div className={`text-xs font-bold mb-2 ${a.color === 'emerald' ? 'text-emerald-400' : a.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'}`}>
                {a.verdict}
              </div>
              <div className="w-full h-1 bg-[#1a2234] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" style={{ width: `${a.conf}%` }} />
              </div>
              <div className="text-[10px] text-gray-500 mt-1">{a.conf}% confidence</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
