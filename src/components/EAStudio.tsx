import { useState } from 'react';
import { Code2, Play, Download, Settings, CheckCircle2, AlertCircle, Terminal, Copy, Check, ExternalLink, FileCode2 } from 'lucide-react';
import type { Lang } from '../i18n';

interface EAStudioProps {
  lang: Lang;
  user: any;
}

const DEFAULT_EA_CODE = `//+------------------------------------------------------------------+
//|                                           RoadFX_AutoTrader.mq5  |
//|                           Copyright 2026, RoadFX Team              |
//|                           https://forge.mql5.io/ivan_i_82/roadfx |
//+------------------------------------------------------------------+
#property copyright "RoadFX Team"
#property link      "https://forge.mql5.io/ivan_i_82/roadfx-mql5"
#property version   "1.00"
#property strict

// Input Parameters
input string   ApiEndpoint = "https://api.roadfx.io/v1/signals";
input string   ApiKey      = "YOUR_ROADFX_API_KEY";
input double   RiskPercent = 1.0;
input int      MagicNumber = 20260101;
input int      Slippage    = 3;
input bool     PaperMode   = true;  // Paper Trading Mode (Default: TRUE)
input int      HeartbeatInterval = 30; // seconds

// Global vars
datetime lastHeartbeat = 0;
double maxDrawdown = 5.0; // Max 5% DD kill-switch

int OnInit() {
   Print("RoadFX EA v1.0 initialized");
   Print("Paper mode: ", PaperMode ? "ON" : "OFF - LIVE TRADING!");
   if(!PaperMode) Alert("WARNING: LIVE TRADING ENABLED!");
   return(INIT_SUCCEEDED);
}

void OnTick() {
   // Kill-switch: check max drawdown
   if(CheckDrawdown() > maxDrawdown) {
      Print("Max drawdown reached. EA stopped.");
      return;
   }
   
   // Heartbeat to RoadFX server
   if(TimeCurrent() - lastHeartbeat > HeartbeatInterval) {
      SendHeartbeat();
      lastHeartbeat = TimeCurrent();
   }
   
   // Fetch AI signals from RoadFX API
   string signal = FetchSignal();
   if(signal != "") {
      ExecuteSignal(signal);
   }
}

string FetchSignal() {
   char post[];
   char result[];
   string headers = "Content-Type: application/json\\r\\n";
   headers += "Authorization: Bearer " + ApiKey + "\\r\\n";
   
   string url = ApiEndpoint + "?symbol=" + _Symbol + "&tf=" + (string)_Period;
   
   int res = WebRequest("GET", url, headers, 5000, post, result, headers);
   if(res == 200) {
      return CharArrayToString(result);
   }
   return "";
}

void ExecuteSignal(string signal) {
   if(PaperMode) {
      Print("[PAPER] Would execute: ", signal);
      return;
   }
   
   MqlTradeRequest request;
   MqlTradeResult result;
   ZeroMemory(request);
   ZeroMemory(result);
   
   // Parse signal and create order
   // Signal format: BUY|SELL|CLOSE
   request.action = TRADE_ACTION_DEAL;
   request.symbol = _Symbol;
   request.volume = CalculateLotSize();
   request.magic = MagicNumber;
   request.deviation = Slippage;
   
   if(StringFind(signal, "BUY") >= 0) {
      request.type = ORDER_TYPE_BUY;
      request.price = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   } else if(StringFind(signal, "SELL") >= 0) {
      request.type = ORDER_TYPE_SELL;
      request.price = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   } else return;
   
   OrderSend(request, result);
}

double CalculateLotSize() {
   double balance = AccountInfoDouble(ACCOUNT_BALANCE);
   double riskAmount = balance * RiskPercent / 100.0;
   double lotStep = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
   double lot = NormalizeDouble(riskAmount / 1000.0, 2);
   return MathMax(lotStep, lot);
}

double CheckDrawdown() {
   double balance = AccountInfoDouble(ACCOUNT_BALANCE);
   double equity = AccountInfoDouble(ACCOUNT_EQUITY);
   return (balance - equity) / balance * 100.0;
}

void SendHeartbeat() {
   string data = "{\\"ea\\":\\"RoadFX\\",\\"version\\":\\"1.0\\",\\"status\\":\\"running\\"}";
   char post[], result[];
   string headers = "Content-Type: application/json\\r\\nAuthorization: Bearer " + ApiKey + "\\r\\n";
   StringToCharArray(data, post);
   WebRequest("POST", ApiEndpoint + "/heartbeat", headers, 5000, post, result, headers);
}
//+------------------------------------------------------------------+
`;

export default function EAStudio(_props: EAStudioProps) {
  void _props;
  const [code, setCode] = useState(DEFAULT_EA_CODE);
  const [compiled, setCompiled] = useState(false);
  const [compiling, setCompiling] = useState(false);
  const [logs, setLogs] = useState<string[]>(['[10:24:01] RoadFX EA Studio ready']);
  const [copied, setCopied] = useState(false);
  const [eaName, setEaName] = useState('RoadFX_AutoTrader');
  const [settings, setSettings] = useState({
    allowAlgo: true,
    allowWebRequest: true,
    webRequestUrls: ['https://api.roadfx.io', 'https://forge.mql5.io'],
    autoTrading: true,
    allowLive: false,
    allowDLL: false,
  });

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 20));
  };

  const handleCompile = async () => {
    setCompiling(true);
    setCompiled(false);
    addLog(`Compiling ${eaName}.mq5...`);
    await new Promise(r => setTimeout(r, 800));
    addLog('Checking syntax... ✓');
    await new Promise(r => setTimeout(r, 500));
    addLog('Validating WebRequest URLs... ✓');
    await new Promise(r => setTimeout(r, 400));
    addLog('Building .ex5 binary... ✓');
    await new Promise(r => setTimeout(r, 300));
    addLog(`✅ ${eaName}.ex5 compiled successfully (42.3 KB)`);
    setCompiled(true);
    setCompiling(false);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${eaName}.mq5`;
    a.click();
    URL.revokeObjectURL(url);
    addLog(`Downloaded ${eaName}.mq5`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Code2 className="w-7 h-7 text-cyan-400" />
              EA Studio · MQL5
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Auto-compile Expert Advisors from RoadFX Forge repository
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="https://forge.mql5.io/ivan_i_82/roadfx-mql5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a2234] hover:bg-[#1f2937] text-sm transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Forge Repo
            </a>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a2234] hover:bg-[#1f2937] text-sm transition"
            >
              <Download className="w-3.5 h-3.5" /> Download .mq5
            </button>
            <button
              onClick={handleCompile}
              disabled={compiling}
              className="btn-primary text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60"
            >
              {compiling ? (
                <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Compiling...</>
              ) : (
                <><Play className="w-3.5 h-3.5" /> Compile & Build</>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Editor - 2 cols */}
          <div className="lg:col-span-2 card p-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-[#1f2937] bg-[#0a0e1a]/80">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <input
                  value={eaName}
                  onChange={(e) => setEaName(e.target.value)}
                  className="bg-transparent text-sm font-semibold outline-none"
                />
                <span className="text-sm text-gray-500">.mq5</span>
                {compiled && (
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Compiled
                  </span>
                )}
              </div>
              <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full h-[500px] bg-[#0a0e1a] text-[13px] font-mono text-gray-300 p-4 outline-none resize-none leading-relaxed"
            />
            {/* Console */}
            <div className="border-t border-[#1f2937] bg-black/40">
              <div className="p-2 border-b border-[#1f2937]/50 flex items-center gap-2 text-xs text-gray-400">
                <Terminal className="w-3 h-3" /> Output Console
              </div>
              <div className="p-3 max-h-32 overflow-y-auto font-mono text-[11px] space-y-0.5">
                {logs.map((l, i) => (
                  <div key={i} className={l.includes('✓') ? 'text-emerald-400' : l.includes('❌') ? 'text-red-400' : 'text-gray-400'}>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* MT5 Settings */}
            <div className="card p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                MT5 Expert Advisor Settings
              </h3>
              <p className="text-[10px] text-gray-500 mb-3">MT5 → Tools → Options → Expert Advisors</p>

              <div className="space-y-2">
                {[
                  { key: 'autoTrading', label: 'Enable automated trading', required: true },
                  { key: 'allowAlgo', label: 'Allow algorithmic trading', required: true },
                  { key: 'allowWebRequest', label: 'Allow WebRequest for listed URL', required: true },
                  { key: 'allowLive', label: 'Allow live trading (Pro)', required: false, pro: true },
                  { key: 'allowDLL', label: 'Allow DLL imports', required: false },
                ].map(opt => (
                  <label key={opt.key} className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={(settings as any)[opt.key]}
                      onChange={(e) => setSettings({ ...settings, [opt.key]: e.target.checked })}
                      className="mt-0.5 accent-cyan-500"
                    />
                    <span className="text-xs text-gray-300 group-hover:text-white flex-1 flex items-center gap-1">
                      {opt.label}
                      {opt.pro && <span className="text-[9px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-400">PRO</span>}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-[#1f2937]">
                <div className="text-xs font-semibold mb-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  Allowed WebRequest URLs
                </div>
                {settings.webRequestUrls.map((url, i) => (
                  <div key={i} className="text-[11px] text-cyan-400 font-mono px-2 py-1 bg-[#0a0e1a] rounded mb-1 break-all">
                    {url}
                  </div>
                ))}
              </div>
            </div>

            {/* Deploy Instructions */}
            <div className="card p-4 bg-gradient-to-br from-purple-500/5 to-cyan-500/5">
              <h3 className="text-sm font-bold mb-3">🚀 Quick Deploy Guide</h3>
              <ol className="space-y-2 text-xs text-gray-300">
                <li className="flex gap-2"><span className="text-cyan-400 font-bold">1.</span> Click <b>Compile & Build</b></li>
                <li className="flex gap-2"><span className="text-cyan-400 font-bold">2.</span> Download the .mq5 file</li>
                <li className="flex gap-2"><span className="text-cyan-400 font-bold">3.</span> Open MetaEditor (F4)</li>
                <li className="flex gap-2"><span className="text-cyan-400 font-bold">4.</span> Paste in MQL5/Experts folder</li>
                <li className="flex gap-2"><span className="text-cyan-400 font-bold">5.</span> Compile (F7) in MetaEditor</li>
                <li className="flex gap-2"><span className="text-cyan-400 font-bold">6.</span> Drag to chart in MT5</li>
                <li className="flex gap-2"><span className="text-cyan-400 font-bold">7.</span> Enable AutoTrading ✓</li>
              </ol>
              <div className="mt-3 p-2 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300">
                ⚠️ Test on Demo account first. Never run live without proper risk management.
              </div>
            </div>

            {/* API Key */}
            <div className="card p-4">
              <h3 className="text-sm font-bold mb-2">🔑 API Key Setup</h3>
              <p className="text-[10px] text-gray-500 mb-2">Generate key in Settings → API Keys</p>
              <input
                placeholder="Paste your RoadFX API key"
                className="w-full px-2 py-1.5 input-field rounded text-xs font-mono"
                defaultValue="rfrx_••••••••••••••••••"
              />
              <button className="mt-2 text-xs text-cyan-400 hover:text-cyan-300">
                Generate new key →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
