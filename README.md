# 🚀 RoadFX Platform — AI Auto Trading

> **AI-powered auto trading platform** with 5 advanced AI agents (Opus, GPT-4o, Seedance, Gemini, DeepSeek), MQL5 Expert Advisor integration, real-time TradingView charts, and full admin panel.

---

## 📦 What's Included

- ✅ **Next-generation UI** — Dark trading theme, responsive, animated
- ✅ **5 AI Agents** — Arena-style multi-response chat
- ✅ **TradingView Integration** — Real charts with RSI, MACD, Bollinger Bands
- ✅ **EA Studio** — MQL5 code editor with auto-compile simulation
- ✅ **Admin Panel** — Payments, promotions, broadcasts, audit log
- ✅ **Multi-language** — English & Bahasa Indonesia
- ✅ **Authentication** — Email/password + Google OAuth (ready for Firebase)
- ✅ **PayPal Payments** — Pro subscription flow ($29.99/mo)
- ✅ **Cookie Consent** — GDPR/CPRA compliant
- ✅ **Free vs Pro tiers** — Feature gating
- ✅ **SEO ready** — Meta tags, Open Graph, Twitter cards

---

## 🎯 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will run at `http://localhost:5173`

---

## 🌐 Deploy to Cloudflare Pages (Recommended)

### Option 1: Git Integration (Easiest)

1. **Push your code to GitHub/GitLab**
   ```bash
   git init
   git add .
   git commit -m "Initial RoadFX platform"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Log in to Cloudflare Dashboard** → Pages → Create a project

3. **Connect to your Git repository**

4. **Configure build settings:**
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave blank)

5. **Environment variables** (add in Pages settings → Environment):
   ```
   VITE_PAYPAL_CLIENT_ID=your_paypal_sandbox_id
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_AUTH_DOMAIN=roadfx.firebaseapp.com
   VITE_ROADFX_API_URL=https://api.roadfx.io
   ```

6. **Deploy!** Cloudflare will auto-build and serve from `*.pages.dev`

### Option 2: Direct Upload

```bash
npm run build
# Upload the dist/ folder via Cloudflare Pages → Direct Upload
```

---

## 🚀 Deploy to Vercel (Alternative)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Or connect GitHub repo to Vercel dashboard** — auto-deploys on push

---

## 📁 Project Structure

```
roadfx-platform/
├── src/
│   ├── App.tsx                    # Main app (routing, state)
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Tailwind + custom styles
│   ├── i18n.ts                    # EN/ID translations
│   └── components/
│       ├── Sidebar.tsx            # Left nav (arena.ai style)
│       ├── TopBar.tsx             # Top bar with user menu
│       ├── Dashboard.tsx          # Main trading dashboard
│       ├── ArenaChat.tsx          # Multi-model arena chat
│       ├── AIAgents.tsx           # 5 AI agents panel
│       ├── EAStudio.tsx           # MQL5 EA editor
│       ├── AdminPanel.tsx         # Admin dashboard
│       ├── Pricing.tsx            # Free vs Pro
│       ├── Settings.tsx           # User settings
│       ├── AuthModal.tsx          # Login/Register
│       ├── PaymentModal.tsx       # PayPal flow
│       ├── CookieConsent.tsx      # GDPR banner
│       └── Views.tsx              # Signals + Portfolio
├── public/
├── dist/                          # Production build
├── index.html                     # HTML entry (SEO meta)
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔑 Admin Access (Demo)

| Credential | Value |
|------------|-------|
| **Email** | `roadfrx@gmail.com` |
| **Password** | `PassAdmin` |
| **Quick Login** | Click "👑 Login as Admin" button on auth modal |

⚠️ **For production:** Change these immediately and enable Firebase MFA.

---

## 💳 PayPal Integration

**Seller Email:** `roadfrx@gmail.com`

### Sandbox Setup (Test first!)

1. Create PayPal Developer account at https://developer.paypal.com
2. Create REST API app (Sandbox)
3. Get Client ID → set as `VITE_PAYPAL_CLIENT_ID`
4. Test with sandbox accounts

### Production

1. Create Live REST API app
2. Replace sandbox credentials
3. Set up webhook at `https://your-domain.com/api/webhooks/paypal`

---

## 🤖 MQL5 / MetaTrader 5 Integration

### Setup API Key

1. Go to **Settings → API Keys** in the app
2. Copy your `rfrx_sk_live_*` key
3. Paste in your EA input parameter `ApiKey`

### MT5 Expert Advisor Configuration

Open **MT5 → Tools → Options → Expert Advisors**:

- ☑️ **Allow algorithmic trading**
- ☑️ **Allow WebRequest for listed URL**
- Add these URLs to allowed list:
  - `https://api.roadfx.io`
  - `https://forge.mql5.io`

### Compile EA

1. Open **MetaEditor** (F4 in MT5)
2. Open `RoadFX_AutoTrader.mq5`
3. Press **F7** to compile
4. Drag EA onto chart
5. Enable **AutoTrading** button

### Repository

Full EA source at: https://forge.mql5.io/ivan_i_82/roadfx-mql5

---

## 🔥 Firebase Setup (for production)

1. Create Firebase project at https://console.firebase.google.com
2. Enable **Authentication** → Email/Password + Google
3. Enable **Firestore Database**
4. Get config → set env vars:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

---

## 🌍 Multi-language Support

Toggle language via:
- Top bar globe icon (EN/ID)
- Settings → Appearance → Language

To add more languages, edit `src/i18n.ts`.

---

## 📊 AI Agents

| Agent | Provider | Specialty |
|-------|----------|-----------|
| Opus | Anthropic | Deep market analysis |
| GPT-4o | OpenAI | Multimodal + chart patterns |
| Seedance | ByteDance | Image/video generation |
| Gemini 2.0 | Google | News correlation |
| DeepSeek V3 | DeepSeek | Quant strategies |

---

## 🔒 Security Checklist

- [ ] Change default admin credentials
- [ ] Enable Firebase MFA for admin
- [ ] Never commit `.env` files
- [ ] Use HTTPS only
- [ ] Start with Paper Trading mode
- [ ] Set max drawdown kill-switch
- [ ] Verify PayPal webhook signatures
- [ ] Add rate limiting to API endpoints
- [ ] Enable CORS only for your domain

---

## 📱 PlayStore Ready

App is designed for future mobile release:
- Responsive UI (mobile/tablet/desktop)
- PWA-ready structure
- Social media integration hooks (Facebook, Discord, Telegram, WhatsApp)

---

## 💬 Support

- **WhatsApp:** +62 838-5203-2606
- **Founder:** [@ivansslo](https://twitter.com/ivansslo)
- **EA Repo:** https://forge.mql5.io/ivan_i_82/roadfx-mql5

---

## ⚠️ Risk Disclaimer

**Trading involves significant risk of loss and is not suitable for all investors.**

- Past performance does not guarantee future results.
- Always start with **Paper Trading (Demo)** mode.
- Never risk more than you can afford to lose.
- AI predictions are statistical estimates, not guarantees.
- Consult a licensed financial advisor before trading.

---

## 📄 License

MIT © 2026 RoadFX Team

---

---

Built with ❤️ using React + Vite + Tailwind CSS + TypeScript
