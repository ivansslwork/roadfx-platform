import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, RefreshCw, Copy, ThumbsUp, ThumbsDown, Zap } from 'lucide-react';
import type { Lang } from '../i18n';

interface ArenaChatProps {
  lang: Lang;
}

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: Date;
}

const MODELS = [
  { id: 'opus', name: 'Opus 4.5', provider: 'Anthropic', desc: 'Advanced reasoning', color: 'from-orange-400 to-red-500' },
  { id: 'gpt4o', name: 'GPT-4o', provider: 'OpenAI', desc: 'Multimodal', color: 'from-emerald-400 to-teal-500' },
  { id: 'gemini', name: 'Gemini 2.0', provider: 'Google', desc: 'Latest', color: 'from-blue-400 to-indigo-500' },
  { id: 'deepseek', name: 'DeepSeek V3', provider: 'DeepSeek', desc: 'Code expert', color: 'from-purple-400 to-pink-500' },
  { id: 'qwen', name: 'Qwen 2.5', provider: 'Alibaba', desc: 'Multilingual', color: 'from-cyan-400 to-blue-500' },
];

const SUGGESTIONS = [
  '📈 Analisa EUR/USD untuk 15 menit ke depan',
  '🔍 Compare XAU/USD vs BTC/USD trend',
  '💡 Strategi entry terbaik untuk GBP/JPY',
  '⚡ Prediksi dampak NFP pada forex',
];

export default function ArenaChat({ lang }: ArenaChatProps) {
  const [selectedModels, setSelectedModels] = useState(['opus', 'gpt4o']);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleModel = (id: string) => {
    setSelectedModels(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { id: Date.now(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate multi-model responses
    await new Promise(r => setTimeout(r, 600));
    const responses = selectedModels.map((m, i) => ({
      id: Date.now() + i,
      role: 'assistant' as const,
      content: generateResponse(input, m),
      model: m,
      timestamp: new Date(),
    }));
    setMessages(prev => [...prev, ...responses]);
    setLoading(false);
  };

  const generateResponse = (_q: string, model: string) => {
    const responses: Record<string, string> = {
      opus: `📊 **Analisa Mendalam**\n\nBerdasarkan price action dan struktur market, saya melihat:\n• Resistance kuat di 1.0890 dengan order block bearish\n• Support di 1.0850 (prev. swing low)\n• RSI di 62 menunjukkan momentum bullish masih kuat\n\n**Rekomendasi**: BUY di 1.0865, TP 1.0895, SL 1.0845. Risk/Reward 1:2.5.`,
      gpt4o: `🎯 **Quick Analysis**\n\nEUR/USD menunjukkan pola bullish flag pada TF 15m. Volume meningkat 23% dari sesi Asia.\n\n✅ Entry: 1.0868\n✅ Target: 1.0892 (+24 pips)\n✅ Stop: 1.0848 (-20 pips)\n\nConfidence: 78%`,
      gemini: `🌟 **Market Sentiment**\n\nSentimen EUR positif pasca data PMI. Pair likely bergerak ke 1.0890 dalam 2-3 jam ke depan.\n\nIndikator pendukung: MACD bullish cross, BB squeeze breakout.`,
      deepseek: `💻 **Technical Deep Dive**\n\n\`\`\`\nSupport Levels:  1.0850 | 1.0830 | 1.0800\nResistance:     1.0890 | 1.0915 | 1.0945\nPivot:          1.0865\n\`\`\`\n\nATR(14) = 23 pips. Volatility normal. Rekomendasi: BUY dengan lot 0.01 per $1000 equity.`,
      qwen: `🌐 **Multi-Source Analysis**\n\nMenganalisis dari 5 sumber data: ForexFactory, MyFXBook, TradingView, Bloomberg, Reuters.\n\nConsensus: **BULLISH** (4/5 sumber)\nTimeframe 15m menunjukkan continuation pattern. Entry ideal saat retest 1.0860.`,
    };
    return responses[model] || 'Analisa dalam proses...';
  };

  return (
    <div className="flex h-full">
      {/* Model Selector Sidebar */}
      <div className="w-64 border-r border-[#1f2937] bg-[#0a0e1a]/50 p-4 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Arena Models
          </h3>
          <p className="text-xs text-gray-500">Pilih model untuk compare</p>
        </div>

        <div className="space-y-2">
          {MODELS.map(m => (
            <button
              key={m.id}
              onClick={() => toggleModel(m.id)}
              className={`w-full p-3 rounded-lg text-left transition border ${
                selectedModels.includes(m.id)
                  ? 'bg-[#1a2234] border-cyan-500/30'
                  : 'bg-transparent border-[#1f2937] hover:bg-[#1a2234]/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded bg-gradient-to-br ${m.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                  {m.name[0]}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{m.name}</div>
                  <div className="text-[10px] text-gray-500">{m.provider}</div>
                </div>
              </div>
              <div className="text-[10px] text-gray-400">{m.desc}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
          <div className="text-xs font-semibold mb-1 flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> Pro Feature</div>
          <p className="text-[10px] text-gray-400">Akses semua model + image generation + web search</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">RoadFX Arena</h2>
              <p className="text-gray-400 mb-6 max-w-md">
                Bandingkan jawaban dari model AI terbaik secara bersamaan. Khusus untuk pertanyaan trading, analisa pasar, dan strategi.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-xl">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(s)}
                    className="text-left p-3 rounded-lg bg-[#111827] border border-[#1f2937] hover:border-cyan-500/30 text-sm text-gray-300 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {messages.map((m, idx) => {
                if (m.role === 'user') {
                  return (
                    <div key={m.id} className="flex items-start gap-3 animate-slide-up">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-sm font-semibold mb-1">You</div>
                        <div className="text-sm text-gray-300 whitespace-pre-wrap">{m.content}</div>
                      </div>
                    </div>
                  );
                }

                // Group assistant messages by index for parallel display
                const prev = messages[idx - 1];
                const isGroupStart = prev?.role === 'user' || prev?.role === 'assistant' && prev.model === undefined;
                const groupMessages = [m];
                let j = idx + 1;
                while (j < messages.length && messages[j].role === 'assistant') {
                  groupMessages.push(messages[j]);
                  j++;
                }

                if (!isGroupStart && prev?.role === 'assistant') return null;

                return (
                  <div key={m.id} className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-slide-up">
                    {groupMessages.map((gm) => {
                      const model = MODELS.find(md => md.id === gm.model);
                      return (
                        <div key={gm.id} className="p-4 rounded-lg bg-[#111827] border border-[#1f2937]">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-6 h-6 rounded bg-gradient-to-br ${model?.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                              {model?.name[0]}
                            </div>
                            <span className="text-xs font-semibold">{model?.name}</span>
                            <span className="text-[10px] text-gray-500">· {model?.provider}</span>
                          </div>
                          <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{gm.content}</div>
                          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#1f2937]">
                            <button className="p-1 hover:bg-[#1a2234] rounded text-gray-500 hover:text-white"><Copy className="w-3 h-3" /></button>
                            <button className="p-1 hover:bg-[#1a2234] rounded text-gray-500 hover:text-emerald-400"><ThumbsUp className="w-3 h-3" /></button>
                            <button className="p-1 hover:bg-[#1a2234] rounded text-gray-500 hover:text-red-400"><ThumbsDown className="w-3 h-3" /></button>
                            <button className="p-1 hover:bg-[#1a2234] rounded text-gray-500 hover:text-white"><RefreshCw className="w-3 h-3" /></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedModels.map(m => {
                    const model = MODELS.find(md => md.id === m);
                    return (
                      <div key={m} className="p-4 rounded-lg bg-[#111827] border border-[#1f2937]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-6 h-6 rounded bg-gradient-to-br ${model?.color} flex items-center justify-center text-[10px] font-bold text-white animate-pulse`}>
                            {model?.name[0]}
                          </div>
                          <span className="text-xs font-semibold">{model?.name}</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-[#1f2937] p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-2 p-2 rounded-xl bg-[#111827] border border-[#1f2937] focus-within:border-cyan-500/40 transition">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder={lang === 'id' ? 'Tanyakan analisa market, strategi trading...' : 'Ask about market analysis, trading strategies...'}
                rows={1}
                className="flex-1 bg-transparent resize-none px-3 py-2 text-sm outline-none placeholder:text-gray-500"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="btn-primary text-white p-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] text-gray-500 mt-2 text-center">
              {selectedModels.length} model aktif · Shift+Enter untuk baris baru · Arena-style multi-response
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
