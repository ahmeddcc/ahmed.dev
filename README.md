# Ahmed Portfolio — Professional Full-Stack Portfolio Platform

A production-grade portfolio platform built with React 18, Vite, Tailwind CSS, and Framer Motion. Features a fully responsive public site and a hidden secure admin CMS.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔑 Admin Panel

Navigate to `/admin` to access the CMS.

**Default credentials:**
- Username: `ahmed`
- Password: ``

> Change these in `src/constants/index.js` before deploying.

---

## 📁 Project Structure

```
src/
├── animations/        # Framer Motion variants
├── components/
│   ├── admin/         # Admin layout & sidebar
│   ├── layout/        # Navbar, Footer, PageLayout
│   ├── shared/        # ErrorBoundary, MotionSection, SocialIcons
│   └── ui/            # Button, Input, Modal, Toast, Badge, etc.
├── constants/         # App-wide constants
├── context/           # PortfolioContext, AuthContext, ToastContext
├── data/              # Default portfolio data
├── hooks/             # useTheme, useToast, useDebounce, etc.
├── pages/
│   ├── admin/         # Dashboard, Projects, Experience, etc.
│   └── *.jsx          # Public pages
├── routes/            # AppRoutes, ProtectedRoute
├── services/          # auth, backup, contact, storage, validation
└── utils/             # escapeHtml, fileValidation, exportUtils, etc.
```

---

## 🛡️ Security Features

- XSS protection via `escapeHtml` + `sanitizeInput` utilities
- Excel formula injection prevention
- Session-based auth with token expiry (8 hours)
- File type + size validation
- Rate limiting on contact form (30s cooldown)
- Safe JSON parsing with fallbacks
- Protected routes with redirect on unauthenticated access

---

## ✨ Features

### Public Site
- **Home** — Typing animation, hero, stats, CTA
- **About** — Bio, animated skill bars, stats
- **Experience** — Timeline layout with highlights
- **Projects** — Search, category filter, live/GitHub links
- **Certifications** — Credential cards with verify links
- **Contact** — Validated form with toast notifications

### Admin CMS
- Add/Edit/Delete: Projects, Experience, Certifications
- Edit personal info, social links, stats, skills
- Export backup to JSON / Restore from JSON
- Reset to defaults
- Theme accent color picker
- Session auto-expiry + logout

---

## 🎨 Design System

- **Glassmorphism** cards with backdrop blur
- **Gradient** text and buttons (cyan → violet)
- **Dark-first** color palette
- **Fonts:** Syne (display), DM Sans (body), JetBrains Mono (code)
- **Responsive** mobile-first layout

---

## 🌐 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

Add a `vercel.json` for SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## ⚙️ Environment

No `.env` required for base setup. All data is stored in `localStorage`.

To integrate a real contact API, update `src/services/contactService.js`.

---

## 📦 Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Routing | React Router DOM v6 |
| Validation | Zod |
| Icons | Lucide React |
| State | Context API + useReducer |
| Storage | localStorage |

---

## 📄 License

MIT — free to use and customize.
