# MUTELU: The Destiny Economy

MUTELU: The Destiny Economy - Unlock Your Fate. Boost The Nation. A premium fortune-telling application that promotes Thai regional products and tourism through AI-powered predictions.

**Live Demo:** https://mutelu-destiny-economy.pages.dev

## Features

- 🎭 **AI-Powered Fortunes** - Uses Cloudflare Workers AI (Llama 3.2) for personalized predictions
- 🕸️ **Thai Astrology (Takhsa)** - Dynamic 8-Directions destiny calculation with Radar Chart visualization
- 📈 **Life Graph & Numerology** - Authentic Thai astrology calculation methods with visual charts
- 🌍 **Multi-Language Support** - Thai, English, German with elegant dropdown selector
- 🇹🇭 **Thai Soft Power** - Promotes regional products and tourism destinations
- 📱 **Mobile-First Design** - Beautiful responsive UI with Tailwind CSS
- 🎨 **Premium UI** - Amber/gold theme with dynamic color backgrounds based on birth day
- 🚀 **Auto-Deploy** - Connected to GitHub for automatic deployments

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 18 + Vite + TypeScript + Tailwind CSS |
| **Backend** | Cloudflare Pages Functions |
| **AI** | Cloudflare Workers AI (Llama 3.2) |
| **Database** | Cloudflare D1 (SQLite) - optional |
| **i18n** | react-i18next |
| **Icons** | Lucide React |
| **Hosting** | Cloudflare Pages (Free Tier) |

## Quick Start

### Prerequisites

- Node.js 18+
- Cloudflare account (free tier works)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bejranonda/mutelu-destiny-economy.git
cd mutelu-destiny-economy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your tokens (optional for local development)
```

4. Start development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## Deployment

### Auto-Deploy (Recommended)

The project is connected to GitHub and auto-deploys to Cloudflare Pages:

- **Trigger**: Every push to `master` branch
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist`
- **Live URL**: https://mutelu-destiny-economy.pages.dev

### Manual Deployment

```bash
npm run build
npx wrangler pages deploy dist
```

## Project Structure

```
mutelu-destiny-economy/
├── src/
│   ├── components/      # Reusable UI components (RadarChart)
│   ├── data/
│   │   ├── archetypes.ts    # 7 day-based personality types (Enhanced with Planets/Deities)
│   │   ├── takhsa.ts        # Takhsa 8-Directions calculation logic
│   │   ├── zodiac.ts        # Zodiac and Animal Year calculation
│   │   ├── lifeGraph.ts     # Life Graph 12-base calculation logic
│   │   ├── quests.ts        # Fortune quests by topic
│   │   └── quotes.ts        # Loading screen quotes
│   ├── i18n/
│   │   ├── index.ts         # i18n configuration
│   │   └── locales/
│   │       ├── th.json      # Thai translations (with Astrology keys)
│   │       ├── en.json      # English translations (with Astrology keys)
│   │       └── de.json      # German translations (with Astrology keys)
│   ├── App.tsx              # Main React component
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind CSS
├── functions/
│   └── api/
│       └── fortune.ts       # Workers AI API endpoint
├── research/
│   ├── thai-fortune-telling.md       # Traditional methods overview
│   ├── thai-astrology-systems.md     # Core systems & calculations
│   ├── fortune-telling-ux-patterns.md # UX & Gamification analysis
│   ├── astrology-integration-plan.md # 3-Phase integration strategy
│   ├── soft-power-products.md        # Product mapping
│   └── regional-tourism.md           # Destination mapping
├── wrangler.toml            # Cloudflare configuration
├── .env.example             # Environment template
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Languages Supported

| Language | Code | Status |
|----------|------|--------|
| ไทย (Thai) | `th` | ✅ Complete |
| English | `en` | ✅ Complete |
| Deutsch | `de` | ✅ Complete |

## Security

- ⚠️ **Never commit `.env` or any files containing tokens**
- The `.gitignore` is configured to exclude all sensitive files
- API tokens should have minimum required permissions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Thai cultural heritage and soft power initiatives
- Cloudflare for the amazing free tier
- All the regional products and destinations mentioned

---

*"Powered by Thai Soft Power"* 🇹🇭
