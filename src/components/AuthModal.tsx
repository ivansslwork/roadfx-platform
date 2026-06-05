import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Check } from 'lucide-react';
import type { Lang } from '../i18n';
import { translations } from '../i18n';

interface AuthModalProps {
  lang: Lang;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export default function AuthModal({ lang, onClose, onLogin }: AuthModalProps) {
  const t = translations[lang];
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const isAdmin = email.toLowerCase() === 'roadfrx@gmail.com';
      onLogin({
        name: isAdmin ? 'Admin RoadFX' : username || email.split('@')[0],
        email,
        role: isAdmin ? 'admin' : 'user',
        plan: isAdmin ? 'pro' : 'free',
        avatar: null,
      });
      setLoading(false);
    }, 800);
  };

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin({
        name: 'Google User',
        email: 'user@gmail.com',
        role: 'user',
        plan: 'free',
        avatar: null,
      });
      setLoading(false);
    }, 800);
  };

  const handleAdminQuick = () => {
    onLogin({
      name: 'Admin RoadFX',
      email: 'roadfrx@gmail.com',
      role: 'admin',
      plan: 'pro',
      avatar: null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-md card p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded hover:bg-[#1a2234] text-gray-400">
          <X className="w-4 h-4" />
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 items-center justify-center mb-3 shadow-lg shadow-cyan-500/30">
            <span className="text-2xl font-bold text-white">R</span>
          </div>
          <h2 className="text-2xl font-bold">{mode === 'login' ? t.login : t.register}</h2>
          <p className="text-sm text-gray-400 mt-1">RoadFX Auto Trading Platform</p>
        </div>

        {/* Google OAuth */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          {t.continueWithGoogle}
        </button>

        <div className="relative flex items-center my-4">
          <div className="flex-1 border-t border-[#1f2937]" />
          <span className="px-3 text-xs text-gray-500">{t.or}</span>
          <div className="flex-1 border-t border-[#1f2937]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.username}
                required
                className="w-full pl-10 pr-3 py-2.5 input-field rounded-lg text-sm"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.email}
              required
              className="w-full pl-10 pr-3 py-2.5 input-field rounded-lg text-sm"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.password}
              required
              className="w-full pl-10 pr-10 py-2.5 input-field rounded-lg text-sm"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {mode === 'register' && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">🎁 Welcome Bonus Aktif</div>
                <div className="text-amber-400/80 mt-0.5">7 hari Pro gratis setelah registrasi!</div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg btn-primary text-white font-semibold text-sm disabled:opacity-60"
          >
            {loading ? 'Processing...' : mode === 'login' ? t.login : t.register}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 mt-4">
          {mode === 'login' ? t.noAccount : t.haveAccount}{' '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-cyan-400 hover:text-cyan-300 font-semibold">
            {mode === 'login' ? t.register : t.login}
          </button>
        </div>

        {/* Admin Quick Access */}
        <div className="mt-4 pt-4 border-t border-[#1f2937]">
          <div className="text-[10px] text-gray-500 text-center mb-2">Quick Access (Demo)</div>
          <div className="flex gap-2">
            <button onClick={handleAdminQuick} className="flex-1 py-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs hover:bg-amber-500/20">
              👑 Login as Admin
            </button>
            <button onClick={() => { setEmail('demo@roadfx.io'); setPassword('demo123'); }} className="flex-1 py-1.5 rounded bg-[#1a2234] text-gray-400 text-xs hover:bg-[#1f2937]">
              👤 Demo User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
