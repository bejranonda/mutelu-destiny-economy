# MUTELU: The Destiny Economy

ลุงมูดูดวงกู้ชาติ - A humorous fortune-telling application that promotes Thai regional products and tourism through AI-powered predictions.

**Live Demo:** https://mutelu-destiny-economy.pages.dev

## Features

- 🎭 **AI-Powered Fortunes** - Uses Cloudflare Workers AI (Llama 3.2) for personalized predictions
- 🌍 **Multi-Language Support** - Thai, English, German (more coming soon)
- 🇹🇭 **Thai Soft Power** - Promotes regional products and tourism destinations
- 📱 **Mobile-First Design** - Beautiful responsive UI with Tailwind CSS
- 📊 **Analytics** - Track popular destinations and user engagement (D1 database)

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 18 + Vite + TypeScript + Tailwind CSS |
| **Backend** | Cloudflare Pages Functions |
| **AI** | Cloudflare Workers AI (Llama 3.2) |
| **Database** | Cloudflare D1 (SQLite) |
| **i18n** | react-i18next |
| **Icons** | Lucide React |

## Quick Start

### Prerequisites

- Node.js 18+
- Cloudflare account (free tier works)
- Wrangler CLI

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
cp .env.example .dev.vars
# Edit .dev.vars with your actual tokens
```

4. Create D1 database:
```bash
npx wrangler d1 create fortune-analytics
# Update wrangler.toml with the database_id
```

5. Run migrations:
```bash
npm run db:migrate:local
```

6. Start development server:
```bash
npm run dev
```

## Deployment

### Cloudflare Pages (Recommended)

1. Push to GitHub
2. Connect repository in Cloudflare Pages dashboard
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables in Cloudflare dashboard

### Manual Deployment

```bash
npm run build
npm run deploy
```

## Project Structure

```
Softpower2569/
├── src/
│   ├── components/     # React components
│   ├── data/           # Static data (archetypes, quests, quotes)
│   ├── i18n/           # Internationalization
│   │   └── locales/    # Translation files (th, en, de)
│   ├── lib/            # Utilities and API
│   ├── App.tsx         # Main app component
│   └── main.tsx        # React entry point
├── functions/
│   └── api/
│       └── fortune.ts  # Cloudflare Workers AI API
├── research/           # Thai fortune-telling knowledge
├── wrangler.toml       # Cloudflare configuration
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to Cloudflare Pages |
| `npm run db:migrate:local` | Run D1 migrations locally |

## Security

- ⚠️ **Never commit `.env`, `.dev.vars`, or any files containing tokens**
- All secrets should be set via Cloudflare dashboard or wrangler secrets
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

*"Power by Thai Soft Power"* 🇹🇭
