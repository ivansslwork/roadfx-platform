import { useState } from 'react';
import { Bot, Sparkles, Send, Brain, Zap, Image, Video, Code, Search, BarChart3 } from 'lucide-react';
import type { Lang } from '../i18n';

interface AIAgentsProps {
  lang: Lang;
}

const AGENTS = [
  {
    id: 'opus',
    name: 'Opus',
    tag: 'Anthropic Claude',
    desc: 'Advanced reasoning & market analysis',
    capabilities: ['Text', 'Code', 'Reasoning', 'Web Search'],
    color: 'from-orange-400 to-red-500',
    specialty: 'Deep market analysis & risk assessment',
    rating: 4.9,
    active: true,
  },
  {
    id: 'chatgpt',
    name: 'GPT-4o',
    tag: 'OpenAI',
    desc: 'Multimodal AI with vision',
    capabilities: ['Text', 'Image', 'Video', 'Code', 'Web Search'],
    color: 'from-emerald-400 to-teal-500',
    specialty: 'Chart pattern recognition',
    rating: 4.8,
    active: true,
  },
  {
    id: 'seedance',
    name: 'Seedance',
    tag: 'ByteDance',
    desc: 'Latest video & image generation',
    capabilities: ['Text', 'Image', 'Video Generation'],
    color: 'from-pink-400 to-rose-500',
    specialty: 'Visual market reports',
    rating: 4.7,
    active: true,
  },
  {
    id: 'gemini',
    name: 'Gemini 2.0',
    tag: 'Google DeepMind',
    desc: 'Multimodal reasoning powerhouse',
    capabilities: ['Text', 'Image', 'Code', 'Web Search'],
    color: 'from-blue-400 to-indigo-500',
    specialty: 'Real-time news correlation',
    rating: 4.8,
    active: true,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek V3',
    tag: 'DeepSeek',
    desc: 'Code & quant specialist',
    capabilities: ['Text', 'Code', 'Reasoning', 'Math'],
    color: 'from-purple-400 to-violet-600',
    specialty: 'Quantitative strategy building',
    rating: 4.6,
    active: true,
  },
];

export default function AIAgents(_props: AIAgentsProps) {
  const [activeAgent, setActiveAgent] = useState(AGENTS[0].id);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ agent: string; content: string; time: string }>>([
    { agent: 'opus', content: '📊 EUR/USD menunjukkan setup bullish pada TF 15m. Resistance 1.0890, support 1.0850. Rekomendasi BUY di area 1.0865 dengan TP 1.0895.', time: '10:24' },
    { agent: 'chatgpt', content: '🎯 Divergence bullish terdeteksi pada RSI. Probability naik 72%. Saya rekomendasikan entry bertahap 50% di current price, 50% di retest 1.0850.', time: '10:25' },
    { agent: 'gemini', content: '📰 Sentimen pasar positif pasca rilis data inflasi Jerman. News impact mendukung posisi BUY. Risk event selanjutnya: NFP Jumat.', time: '10:25' },
    { agent: 'deepseek', content: '💻 Strategi quant: mean reversion pada Bollinger Band bawah + MACD bullish cross. Expected hold time: 45-90 menit. RR 1:2.3.', time: '10:26' },
  ]);
  const [generating, setGenerating] = useState(false);

  const currentAgent = AGENTS.find(a => a.id === activeAgent)!;

  const sendQuery = () => {
    if (!query.trim()) return;
    setMessages(prev => [...prev, { agent: 'user', content: query, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }]);
    setQuery('');
    setGenerating(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        agent: activeAgent,
        content: `🤖 Analisa dari ${currentAgent.name}:\n\nBerdasarkan data realtime, saya merekomendasikan:\n• Entry: Current price\n• Target: +25 pips\n• Stop loss: -15 pips\n• Confidence: 78%\n\nReasoning: Price action + fundamental alignment.`,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }]);
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="flex h-full">
      {/* Agents List */}
      <div className="w-80 border-r border-[#1f2937] bg-[#0a0e1a]/50 overflow-y-auto">
        <div className="p-4 border-b border-[#1f2937]">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            AI Agents
          </h2>
          <p className="text-xs text-gray-500 mt-1">5 high-performance agents</p>
        </div>

        <div className="p-3 space-y-2">
          {AGENTS.map(agent => (
            <button
              key={agent.id}
              onClick={() => setActiveAgent(agent.id)}
              className={`w-full text-left p-3 rounded-lg transition border ${
                activeAgent === agent.id
                  ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/30'
                  : 'bg-transparent border-[#1f2937] hover:bg-[#1a2234]/50'
              }`}
            >
              <div className="flex items-start gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {agent.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm">{agent.name}</span>
                    {agent.active && <span className="status-dot online" />}
                  </div>
                  <div className="text-[10px] text-gray-500">{agent.tag}</div>
                </div>
                <div className="flex items-center gap-0.5 text-xs">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-400 font-semibold">{agent.rating}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-2 line-clamp-2">{agent.desc}</p>
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.slice(0, 3).map(c => (
                  <span key={c} className="text-[9px] px-1.5 py-0.5 rounded bg-[#1a2234] text-gray-400">
                    {c === 'Image' ? '🖼️' : c === 'Video' ? '🎬' : c === 'Code' ? '💻' : c === 'Web Search' ? '🔍' : '📝'} {c}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Agent Header */}
        <div className="p-4 border-b border-[#1f2937] bg-gradient-to-r from-[#0a0e1a] to-[#111827]">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${currentAgent.color} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
              {currentAgent.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{currentAgent.name}</h2>
                <span className="text-xs text-gray-400">· {currentAgent.tag}</span>
                <span className="status-dot online" />
              </div>
              <p className="text-sm text-gray-400 mt-0.5">{currentAgent.specialty}</p>
              <div className="flex items-center gap-3 mt-2">
                {currentAgent.capabilities.map(c => {
                  const IconMap: any = {
                    'Image': Image, 'Video': Video, 'Code': Code, 'Web Search': Search,
                    'Text': Brain, 'Reasoning': Zap, 'Math': BarChart3, 'Video Generation': Video,
                  };
                  const Icon = IconMap[c] || Brain;
                  return (
                    <div key={c} className="flex items-center gap-1 text-xs text-gray-400">
                      <Icon className="w-3 h-3" />
                      <span>{c}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => {
            const agent = AGENTS.find(a => a.id === m.agent);
            if (m.agent === 'user') {
              return (
                <div key={i} className="flex items-start gap-3 justify-end animate-slide-up">
                  <div className="max-w-md p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                    <div className="text-sm">{m.content}</div>
                    <div className="text-[10px] text-gray-500 mt-1 text-right">{m.time}</div>
                  </div>
                </div>
              );
            }
            return (
              <div key={i} className="flex items-start gap-3 animate-slide-up">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent?.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {agent?.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold">{agent?.name}</span>
                    <span className="text-[10px] text-gray-500">{m.time}</span>
                  </div>
                  <div className="p-3 rounded-2xl rounded-tl-none bg-[#111827] border border-[#1f2937]">
                    <div className="text-sm whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              </div>
            );
          })}
          {generating && (
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentAgent.color} flex items-center justify-center text-white text-xs font-bold animate-pulse`}>
                {currentAgent.name[0]}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#1f2937]">
          <div className="flex items-end gap-2 p-2 rounded-xl bg-[#111827] border border-[#1f2937] focus-within:border-cyan-500/40 transition">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendQuery(); } }}
              placeholder={`Ask ${currentAgent.name} anything...`}
              rows={1}
              className="flex-1 bg-transparent resize-none px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={sendQuery}
              disabled={!query.trim() || generating}
              className="btn-primary text-white p-2.5 rounded-lg disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
