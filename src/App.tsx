import { useState, useEffect } from 'react';
import Sidebar, { type View } from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import ArenaChat from './components/ArenaChat';
import AIAgents from './components/AIAgents';
import EAStudio from './components/EAStudio';
import AdminPanel from './components/AdminPanel';
import Pricing from './components/Pricing';
import Settings from './components/Settings';
import AuthModal from './components/AuthModal';
import PaymentModal from './components/PaymentModal';
import CookieConsent from './components/CookieConsent';
import { SignalsView, PortfolioView } from './components/Views';
import type { Lang } from './i18n';

interface User {
  name: string;
  email: string;
  role: 'user' | 'admin';
  plan: 'free' | 'pro';
}

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [lang, setLang] = useState<Lang>('id');
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showCookie, setShowCookie] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('roadfx_user');
    if (saved) setUser(JSON.parse(saved));
    const cookie = localStorage.getItem('roadfx_cookie');
    if (!cookie) setShowCookie(true);
    const savedLang = localStorage.getItem('roadfx_lang') as Lang;
    if (savedLang) setLang(savedLang);
  }, []);

  // Save state
  useEffect(() => {
    if (user) localStorage.setItem('roadfx_user', JSON.stringify(user));
    else localStorage.removeItem('roadfx_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('roadfx_lang', lang);
  }, [lang]);

  const handleLogin = (u: User) => {
    setUser(u);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setView('dashboard');
  };

  const handleUpgrade = () => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    if (user) {
      setUser({ ...user, plan: 'pro' });
    }
    setShowPayment(false);
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard lang={lang} user={user} />;
      case 'arena':
        return <ArenaChat lang={lang} />;
      case 'agents':
        return <AIAgents lang={lang} />;
      case 'ea-studio':
        return <EAStudio lang={lang} user={user} />;
      case 'signals':
        return <SignalsView lang={lang} user={user} />;
      case 'portfolio':
        return <PortfolioView lang={lang} user={user} />;
      case 'pricing':
        return <Pricing lang={lang} user={user} onUpgrade={handleUpgrade} />;
      case 'settings':
        return <Settings lang={lang} setLang={setLang} user={user} />;
      case 'admin':
        return user?.role === 'admin' ? <AdminPanel lang={lang} /> : <Dashboard lang={lang} user={user} />;
      default:
        return <Dashboard lang={lang} user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0e1a] text-gray-100 overflow-hidden">
      <Sidebar
        view={view}
        setView={setView}
        lang={lang}
        user={user}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          lang={lang}
          setLang={setLang}
          user={user}
          onOpenAuth={() => setShowAuth(true)}
          onOpenProfile={() => {}}
          onToggleSidebar={() => {}}
        />
        <main className="flex-1 overflow-hidden">
          {renderView()}
        </main>
      </div>

      {/* Modals */}
      {showAuth && (
        <AuthModal
          lang={lang}
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
        />
      )}
      {showPayment && (
        <PaymentModal
          lang={lang}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
      {showCookie && (
        <CookieConsent
          lang={lang}
          onAccept={() => {
            localStorage.setItem('roadfx_cookie', 'accepted');
            setShowCookie(false);
          }}
          onReject={() => {
            localStorage.setItem('roadfx_cookie', 'rejected');
            setShowCookie(false);
          }}
        />
      )}
    </div>
  );
}
