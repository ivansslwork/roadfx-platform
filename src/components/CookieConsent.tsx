import { Cookie, X, Shield, Check } from 'lucide-react';
import type { Lang } from '../i18n';
import { translations } from '../i18n';

interface CookieConsentProps {
  lang: Lang;
  onAccept: () => void;
  onReject: () => void;
}

export default function CookieConsent({ lang, onAccept, onReject }: CookieConsentProps) {
  const t = translations[lang];

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-40 card p-4 animate-slide-up shadow-2xl border-cyan-500/20">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
          <Cookie className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1 flex items-center gap-1">
            {t.cookieTitle}
            <Shield className="w-3 h-3 text-emerald-400" />
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed mb-3">{t.cookieDesc}</p>
          <div className="flex gap-2">
            <button
              onClick={onAccept}
              className="flex-1 py-1.5 rounded-lg btn-primary text-white text-xs font-semibold flex items-center justify-center gap-1"
            >
              <Check className="w-3 h-3" /> {t.acceptAll}
            </button>
            <button
              onClick={onReject}
              className="flex-1 py-1.5 rounded-lg bg-[#1a2234] text-gray-300 text-xs font-semibold hover:bg-[#1f2937]"
            >
              {t.reject}
            </button>
          </div>
          <div className="mt-2 text-[10px] text-gray-500 flex items-center gap-1">
            <Shield className="w-2.5 h-2.5" /> GDPR/CPRA compliant · Secure cookies · HttpOnly
          </div>
        </div>
        <button onClick={onReject} className="p-1 text-gray-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
