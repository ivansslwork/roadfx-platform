import { Activity, TrendingUp, TrendingDown, Target, DollarSign, PieChart, BarChart3, Eye } from 'lucide-react';
import type { Lang } from '../i18n';

interface ViewsProps {
  lang: Lang;
  user: any;
}

export function SignalsView({ lang }: ViewsProps) {
  const isId = lang === 'id';
  const signals = [
    { pair: 'EUR/USD', type: 'BUY', entry: 1.0865, tp: 1.0895, sl: 1.0845, confidence: 87, time: '2m ago', agent: 'Opus' },
    { pair: 'XAU/USD', type: 'BUY', entry: 2034.50, tp: 2052.00, sl: 2024.00, confidence: 92, time: '5m ago', agent: 'GPT-4o' },
    { pair: 'BTC/USD', type: 'BUY', entry: 67420, tp: 68500, sl: 66800, confidence: 78, time: '8m ago', agent: 'DeepSeek' },
    { pair: 'GBP/USD', type: 'SELL', entry: 1.2734, tp: 1.2690, sl: 1.2760, confidence: 72, time: '12m ago', agent: 'Gemini' },
    { pair: 'USD/JPY', type: 'BUY', entry: 149.23, tp: 150.00, sl: 148.80, confidence: 81, time: '15m ago', agent: 'Opus' },
    { pair: 'ETH/USD', type: 'BUY', entry: 3521, tp: 3650, sl: 3450, confidence: 75, time: '20m ago', agent: 'GPT-4o' },
  ];

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-7xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="w-7 h-7 text-cyan-400 animate-pulse" />
            {isId ? 'Sinyal Trading Live' : 'Live Trading Signals'}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {isId ? 'Timeframe 5-30 menit · Real-time dari 5 AI agents' : '5-30 minute timeframe · Real-time from 5 AI agents'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: isId ? 'Sinyal Aktif' : 'Active Signals', value: '6', icon: Activity, color: 'cyan' },
            { label: isId ? 'Win Rate Hari Ini' : 'Today Win Rate', value: '73%', icon: Target, color: 'emerald' },
            { label: isId ? 'Profit Harian' : 'Daily Profit', value: '+$247', icon: TrendingUp, color: 'emerald' },
            { label: isId ? 'Sinyal Eksekusi' : 'Executed Signals', value: '18', icon: BarChart3, color: 'purple' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="card p-4">
                <Icon className={`w-5 h-5 text-${s.color}-400 mb-2`} />
                <div className="text-xs text-gray-400">{s.label}</div>
                <div className="text-xl font-bold">{s.value}</div>
              </div>
            );
          })}
        </div>

        {/* Signals List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {signals.map((s, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{s.pair}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${s.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {s.type === 'BUY' ? <TrendingUp className="w-3 h-3 inline" /> : <TrendingDown className="w-3 h-3 inline" />} {s.type}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{s.time}</div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                <div className="p-2 rounded bg-[#0a0e1a]">
                  <div className="text-gray-500 text-[10px]">Entry</div>
                  <div className="font-semibold">{s.entry}</div>
                </div>
                <div className="p-2 rounded bg-emerald-500/5">
                  <div className="text-emerald-400 text-[10px]">TP</div>
                  <div className="font-semibold text-emerald-400">{s.tp}</div>
                </div>
                <div className="p-2 rounded bg-red-500/5">
                  <div className="text-red-400 text-[10px]">SL</div>
                  <div className="font-semibold text-red-400">{s.sl}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Agent:</span>
                  <span className="text-xs font-semibold text-cyan-400">{s.agent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-[#1a2234] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" style={{ width: `${s.confidence}%` }} />
                  </div>
                  <span className="text-xs font-bold">{s.confidence}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PortfolioView({ lang }: ViewsProps) {
  const isId = lang === 'id';
  const positions = [
    { pair: 'EUR/USD', type: 'BUY', size: 0.5, entry: 1.0850, current: 1.0876, pnl: 13.00, pnlPercent: 2.4 },
    { pair: 'XAU/USD', type: 'BUY', size: 0.1, entry: 2020.00, current: 2034.50, pnl: 145.00, pnlPercent: 7.2 },
    { pair: 'BTC/USD', type: 'BUY', size: 0.05, entry: 66500, current: 67420, pnl: 46.00, pnlPercent: 1.4 },
    { pair: 'GBP/USD', type: 'SELL', size: 0.3, entry: 1.2750, current: 1.2734, pnl: 4.80, pnlPercent: 1.3 },
  ];

  const totalPnl = positions.reduce((sum, p) => sum + p.pnl, 0);

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-7xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <PieChart className="w-7 h-7 text-cyan-400" />
            {isId ? 'Portofolio' : 'Portfolio'}
          </h1>
          <p className="text-sm text-gray-400 mt-1">{isId ? 'Posisi & performa trading Anda' : 'Your trading positions & performance'}</p>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="card p-4">
            <DollarSign className="w-5 h-5 text-cyan-400 mb-2" />
            <div className="text-xs text-gray-400">{isId ? 'Total Balance' : 'Total Balance'}</div>
            <div className="text-2xl font-bold">$12,847.52</div>
          </div>
          <div className="card p-4">
            <TrendingUp className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-xs text-gray-400">{isId ? 'Total P&L' : 'Total P&L'}</div>
            <div className="text-2xl font-bold text-emerald-400">+${totalPnl.toFixed(2)}</div>
          </div>
          <div className="card p-4">
            <Activity className="w-5 h-5 text-purple-400 mb-2" />
            <div className="text-xs text-gray-400">{isId ? 'Posisi Terbuka' : 'Open Positions'}</div>
            <div className="text-2xl font-bold">{positions.length}</div>
          </div>
          <div className="card p-4">
            <Eye className="w-5 h-5 text-amber-400 mb-2" />
            <div className="text-xs text-gray-400">{isId ? 'Equity' : 'Equity'}</div>
            <div className="text-2xl font-bold">${(12847.52 + totalPnl).toFixed(2)}</div>
          </div>
        </div>

        {/* Positions Table */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="font-semibold">{isId ? 'Posisi Terbuka' : 'Open Positions'}</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-[#0a0e1a] text-xs text-gray-400">
              <tr>
                <th className="text-left p-3">{isId ? 'Pair' : 'Pair'}</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Size</th>
                <th className="text-left p-3">Entry</th>
                <th className="text-left p-3">Current</th>
                <th className="text-right p-3">P&L</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p, i) => (
                <tr key={i} className="border-t border-[#1f2937] hover:bg-[#1a2234]/30">
                  <td className="p-3 font-semibold">{p.pair}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${p.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="p-3 text-xs">{p.size}</td>
                  <td className="p-3 text-xs font-mono">{p.entry}</td>
                  <td className="p-3 text-xs font-mono">{p.current}</td>
                  <td className="p-3 text-right">
                    <div className="font-semibold text-emerald-400">+${p.pnl.toFixed(2)}</div>
                    <div className="text-xs text-emerald-400">+{p.pnlPercent}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="card p-5">
          <h3 className="font-semibold mb-4">{isId ? 'Performa 30 Hari' : '30-Day Performance'}</h3>
          <div className="h-48 flex items-end gap-1">
            {Array.from({ length: 30 }).map((_, i) => {
              const h = 30 + Math.random() * 70;
              const positive = Math.random() > 0.3;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${positive ? 'bg-gradient-to-t from-emerald-500 to-emerald-400' : 'bg-gradient-to-t from-red-500 to-red-400'}`}
                  style={{ height: `${h}%` }}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
