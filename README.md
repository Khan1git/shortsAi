# ClipForge AI

**AI-powered short-form video generation, automation, and multi-platform publishing** for TikTok, Instagram Reels, YouTube Shorts, and Facebook.

---

## Features

- **Dashboard** — Overview of your video automation pipeline, stats, recent videos, and render queue
- **AI Studio** — Create and edit short-form videos with AI assistance
- **Videos** — Manage and browse your video library
- **Automation** — Set up automated workflows for video creation and publishing
- **Templates** — Reusable layouts and styles for quick production
- **Media Library** — Centralized assets (images, clips, audio)
- **Scheduler** — Plan and schedule posts across platforms
- **Analytics** — Performance metrics, best posting times, and top videos
- **Platforms** — Connect and manage TikTok, Instagram, YouTube Shorts, Facebook
- **Settings** — Account and app configuration

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **UI:** [React](https://react.dev/) 19, [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Package manager:** [pnpm](https://pnpm.io/)

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/install) (or npm / yarn)

---

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

---

## Project Structure

```
shorts/
├── app/
│   ├── (dashboard)/     # Dashboard routes (studio, videos, analytics, etc.)
│   ├── globals.css
│   └── layout.tsx
├── components/          # React components
│   ├── ui/              # Reusable UI primitives
│   ├── dashboard/       # Dashboard-specific components
│   ├── studio/          # AI Studio components
│   └── ...
├── lib/                 # Utilities
├── hooks/               # Custom React hooks
└── public/              # Static assets
```

---

## License

Private — All rights reserved.
