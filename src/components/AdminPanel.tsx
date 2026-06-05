import { useState } from 'react';
import { Shield, Users, DollarSign, MousePointer, TrendingUp, Download, Plus, Megaphone, FileText, Search, Clock, Gift, BarChart3 } from 'lucide-react';
import type { Lang } from '../i18n';

interface AdminPanelProps {
  lang: Lang;
}

export default function AdminPanel({ lang: _lang }: AdminPanelProps) {
  const [tab, setTab] = useState<'overview' | 'users' | 'payments' | 'promos' | 'broadcasts' | 'audit'>('overview');

  const stats = [
    { label: 'Total Users', value: '12,847', change: '+324 today', icon: Users, color: 'cyan' },
    { label: 'Pro Subscribers', value: '1,429', change: '+47 today', icon: Shield, color: 'amber' },
    { label: 'Revenue (Month)', value: '$28,437', change: '+12.4%', icon: DollarSign, color: 'emerald' },
    { label: 'Click Revenue', value: '$3,284', change: '+8.7%', icon: MousePointer, color: 'purple' },
  ];

  const users = [
    { id: 1, name: 'Ahmad Fauzi', email: 'ahmad@mail.com', plan: 'pro', joined: '2026-01-15', status: 'active', clicks: 234, revenue: 12.40 },
    { id: 2, name: 'Siti Nur', email: 'siti@mail.com', plan: 'free', joined: '2026-01-18', status: 'active', clicks: 45, revenue: 2.30 },
    { id: 3, name: 'Budi Santoso', email: 'budi@mail.com', plan: 'pro', joined: '2026-01-10', status: 'active', clicks: 512, revenue: 28.50 },
    { id: 4, name: 'Maria Lopez', email: 'maria@mail.com', plan: 'free', joined: '2026-01-22', status: 'pending', clicks: 12, revenue: 0.60 },
  ];

  const payments = [
    { id: 'PAY-001', user: 'Ahmad Fauzi', amount: 29.99, date: '2026-01-20 14:23', status: 'completed', method: 'PayPal' },
    { id: 'PAY-002', user: 'Budi Santoso', amount: 29.99, date: '2026-01-20 13:45', status: 'completed', method: 'PayPal' },
    { id: 'PAY-003', user: 'Chen Wei', amount: 29.99, date: '2026-01-20 12:10', status: 'refunded', method: 'PayPal' },
    { id: 'PAY-004', user: 'Kim Park', amount: 29.99, date: '2026-01-20 11:02', status: 'completed', method: 'PayPal' },
  ];

  const promos = [
    { id: 1, name: 'Welcome Bonus Pro 7 Days', code: 'WELCOME7', discount: '100%', active: true, expires: '2026-02-01', uses: 234, maxUses: 500 },
    { id: 2, name: 'New Year Special', code: 'NY2026', discount: '30%', active: false, expires: '2026-01-15', uses: 500, maxUses: 500 },
    { id: 3, name: 'Flash Friday', code: 'FLASH50', discount: '50%', active: true, expires: '2026-01-26', uses: 89, maxUses: 200 },
  ];

  const broadcasts = [
    { id: 1, title: 'NFP Event Alert', message: 'Non-Farm Payrolls rilis 30 menit lagi. Monitor EUR/USD!', date: '2026-01-20 14:00', sent: 12847, openRate: '42%' },
    { id: 2, title: 'New Feature: 5 AI Agents', message: 'Kini RoadFX punya 5 agen AI canggih!', date: '2026-01-18 10:00', sent: 12500, openRate: '67%' },
  ];

  const auditLog = [
    { time: '14:23:45', user: 'roadfrx@gmail.com', action: 'Created promo WELCOME7', ip: '192.168.1.1' },
    { time: '13:45:12', user: 'system', action: 'Payment webhook received PAY-002', ip: '-' },
    { time: '12:10:33', user: 'roadfrx@gmail.com', action: 'Broadcast sent to 12500 users', ip: '192.168.1.1' },
    { time: '11:02:07', user: 'system', action: 'User signup: maria@mail.com', ip: '-' },
    { time: '10:15:22', user: 'roadfrx@gmail.com', action: 'Exported activity log', ip: '192.168.1.1' },
  ];

  const handleExport = () => {
    const data = users.map(u => `${u.name},${u.email},${u.plan},${u.joined},${u.clicks},${u.revenue}`).join('\n');
    const csv = `Name,Email,Plan,Joined,Clicks,Revenue\n${data}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roadfx-members-${Date.now()}.csv`;
    a.click();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Members', icon: Users },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'promos', label: 'Promotions', icon: Gift },
    { id: 'broadcasts', label: 'Broadcasts', icon: Megaphone },
    { id: 'audit', label: 'Audit Log', icon: FileText },
  ];

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="w-7 h-7 text-amber-400" />
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-1">roadfrx@gmail.com · Full Administrator</p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg btn-primary text-white text-sm font-semibold"
          >
            <Download className="w-4 h-4" /> Export Activity (TXT/CSV)
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg bg-[#111827] border border-[#1f2937] overflow-x-auto">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap
                  ${tab === t.id ? 'bg-gradient-to-r from-cyan-500/15 to-purple-500/15 text-cyan-300' : 'text-gray-400 hover:bg-[#1a2234]'}`}
              >
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Stats */}
        {tab === 'overview' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => {
                const Icon = s.icon;
                const colors: any = {
                  cyan: 'from-cyan-500/10 border-cyan-500/20 text-cyan-400',
                  amber: 'from-amber-500/10 border-amber-500/20 text-amber-400',
                  emerald: 'from-emerald-500/10 border-emerald-500/20 text-emerald-400',
                  purple: 'from-purple-500/10 border-purple-500/20 text-purple-400',
                };
                return (
                  <div key={i} className={`card p-4 bg-gradient-to-br ${colors[s.color]} border`}>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="w-5 h-5" />
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="text-xs text-gray-400 mb-1">{s.label}</div>
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-emerald-400 mt-1">{s.change}</div>
                  </div>
                );
              })}
            </div>

            {/* Recent activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><DollarSign className="w-4 h-4 text-emerald-400" /> Recent Payments</h3>
                <div className="space-y-2">
                  {payments.slice(0, 4).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-2 rounded hover:bg-[#1a2234] text-sm">
                      <div>
                        <div className="font-medium">{p.user}</div>
                        <div className="text-xs text-gray-500">{p.id} · {p.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-emerald-400">${p.amount}</div>
                        <div className={`text-xs ${p.status === 'completed' ? 'text-emerald-400' : 'text-red-400'}`}>{p.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-cyan-400" /> Recent Audit</h3>
                <div className="space-y-2">
                  {auditLog.map((l, i) => (
                    <div key={i} className="text-xs p-2 rounded hover:bg-[#1a2234] font-mono">
                      <span className="text-gray-500">[{l.time}]</span>{' '}
                      <span className="text-cyan-400">{l.user}</span>{' '}
                      <span className="text-gray-300">{l.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Users */}
        {tab === 'users' && (
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
              <h3 className="font-semibold">Members Directory</h3>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                <input placeholder="Search..." className="pl-8 pr-3 py-1 input-field rounded text-xs" />
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-[#0a0e1a] text-xs text-gray-400">
                <tr>
                  <th className="text-left p-3">User</th>
                  <th className="text-left p-3">Plan</th>
                  <th className="text-left p-3">Joined</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Clicks</th>
                  <th className="text-left p-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-t border-[#1f2937] hover:bg-[#1a2234]/30">
                    <td className="p-3">
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-gray-500">{u.email}</div>
                    </td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${u.plan === 'pro' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {u.plan.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-gray-400">{u.joined}</td>
                    <td className="p-3">
                      <span className="flex items-center gap-1 text-xs">
                        <span className={`status-dot ${u.status === 'active' ? 'online' : 'pending'}`} />
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs">{u.clicks}</td>
                    <td className="p-3 text-xs text-emerald-400">${u.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Payments */}
        {tab === 'payments' && (
          <div className="card p-5">
            <h3 className="font-semibold mb-3">Payment Audit Log (PayPal)</h3>
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-400">
                <tr>
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">User</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Method</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id} className="border-t border-[#1f2937]">
                    <td className="p-2 font-mono text-xs text-cyan-400">{p.id}</td>
                    <td className="p-2">{p.user}</td>
                    <td className="p-2 font-semibold text-emerald-400">${p.amount}</td>
                    <td className="p-2 text-xs text-gray-400">{p.date}</td>
                    <td className="p-2 text-xs">{p.method}</td>
                    <td className="p-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${p.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Promos */}
        {tab === 'promos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Active Promotions</h3>
              <button className="btn-primary text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
                <Plus className="w-3 h-3" /> New Promo
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {promos.map(p => (
                <div key={p.id} className="card p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Gift className="w-5 h-5 text-amber-400" />
                    <span className={`text-[10px] px-2 py-0.5 rounded ${p.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {p.active ? 'ACTIVE' : 'EXPIRED'}
                    </span>
                  </div>
                  <div className="font-semibold text-sm mb-1">{p.name}</div>
                  <div className="font-mono text-xs text-cyan-400 mb-2 bg-[#0a0e1a] px-2 py-1 rounded inline-block">{p.code}</div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>Discount: <span className="text-white font-semibold">{p.discount}</span></div>
                    <div>Uses: {p.uses} / {p.maxUses}</div>
                    <div>Expires: {p.expires}</div>
                  </div>
                  <div className="mt-3 w-full h-1 bg-[#1a2234] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: `${(p.uses / p.maxUses) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Broadcasts */}
        {tab === 'broadcasts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Broadcast History</h3>
              <button className="btn-primary text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
                <Plus className="w-3 h-3" /> New Broadcast
              </button>
            </div>
            <div className="space-y-2">
              {broadcasts.map(b => (
                <div key={b.id} className="card p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold flex items-center gap-2"><Megaphone className="w-4 h-4 text-cyan-400" />{b.title}</div>
                    <div className="text-sm text-gray-400 mt-1">{b.message}</div>
                    <div className="text-xs text-gray-500 mt-2">{b.date} · {b.sent.toLocaleString()} sent · {b.openRate} open rate</div>
                  </div>
                  <button className="text-xs text-cyan-400 hover:underline">Resend</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit */}
        {tab === 'audit' && (
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2"><FileText className="w-4 h-4" /> Audit Log</h3>
              <button className="text-xs text-cyan-400 hover:underline">Download .txt</button>
            </div>
            <div className="space-y-1 font-mono text-xs max-h-96 overflow-y-auto">
              {auditLog.map((l, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded hover:bg-[#1a2234]">
                  <span className="text-gray-500">{l.time}</span>
                  <span className="text-cyan-400">{l.user}</span>
                  <span className="text-gray-300 flex-1">{l.action}</span>
                  <span className="text-gray-600">{l.ip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
