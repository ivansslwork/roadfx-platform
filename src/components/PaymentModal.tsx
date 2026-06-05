import { useState } from 'react';
import { X, Check, Shield, Lock, CreditCard, Crown } from 'lucide-react';
import type { Lang } from '../i18n';

interface PaymentModalProps {
  lang: Lang;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({ lang, onClose, onSuccess }: PaymentModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const isId = lang === 'id';

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => onSuccess(), 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-md card p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {step !== 'processing' && (
          <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded hover:bg-[#1a2234] text-gray-400">
            <X className="w-4 h-4" />
          </button>
        )}

        {step === 'form' && (
          <>
            {/* Header */}
            <div className="text-center mb-5">
              <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 items-center justify-center mb-3 shadow-lg">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-bold">Upgrade to Pro</h2>
              <p className="text-sm text-gray-400 mt-1">Unlock all premium features</p>
            </div>

            {/* Price */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">RoadFX Pro</div>
                  <div className="text-2xl font-bold">$29.99<span className="text-sm text-gray-400">/mo</span></div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-amber-400">Welcome Bonus</div>
                  <div className="text-sm font-semibold text-amber-300">First 7 days FREE</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-4 text-sm">
              {['5 AI Agents (Opus, GPT-4o, Seedance, Gemini, DeepSeek)', 'Auto-trading execution', 'EA compilation & deployment', 'Real-time signals (5-30m)', 'Priority 24/7 support'].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-300">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* PayPal */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-400 mb-2">Payment Method</div>
              <button className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-[#0070ba] hover:bg-[#005a8a] text-white font-semibold transition">
                <svg className="w-20 h-5" viewBox="0 0 100 26" fill="currentColor"><path d="M 12 0 L 5 22 L 9 22 L 16 0 Z" fill="#253B80"/><path d="M 32 0 C 28 0 25 3 25 8 C 25 13 28 16 33 16 L 36 16 L 37 12 L 33 12 C 31 12 30 11 30 8 C 30 5 31 4 33 4 L 37 4 L 38 0 Z" fill="#179BD7"/><path d="M 48 8 L 44 22 L 48 22 L 52 8 Z M 47 0 C 43 0 40 3 40 8 C 40 13 43 16 48 16 L 52 16 L 56 0 Z" fill="#253B80"/><path d="M 68 4 L 63 22 L 67 22 L 72 4 Z M 68 0 C 64 0 60 3 60 8 C 60 13 64 16 68 16 L 72 16 L 76 0 Z" fill="#179BD7"/><path d="M 85 4 L 80 22 L 84 22 L 89 4 Z" fill="#253B80"/></svg>
              </button>
              <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-gray-500">
                <Lock className="w-3 h-3" />
                Secure payment · Seller: roadfrx@gmail.com
              </div>
            </div>

            <button
              onClick={handlePay}
              className="w-full py-3 rounded-lg btn-primary text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Pay $29.99 with PayPal
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-gray-500">
              <Shield className="w-3 h-3" />
              Buyer protection · Cancel anytime
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin mx-auto mb-4" />
            <div className="font-semibold">Processing payment...</div>
            <div className="text-sm text-gray-400 mt-1">Connecting to PayPal</div>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-1">{isId ? 'Pembayaran Berhasil!' : 'Payment Successful!'}</h3>
            <p className="text-sm text-gray-400 mb-4">{isId ? 'Selamat datang di RoadFX Pro 🎉' : 'Welcome to RoadFX Pro 🎉'}</p>
            <div className="text-xs text-amber-400 flex items-center justify-center gap-1">
              <Crown className="w-3 h-3" /> Welcome bonus activated: 7 days FREE
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
