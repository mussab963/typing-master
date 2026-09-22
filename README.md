# TypeMaster Pro

A bilingual (Arabic / English) typing performance platform built with React, TypeScript and Vite. The project is structured as a real multi-page SPA instead of a single demo screen.

## Pages

- `/` — Product home / introduction, progress overview, daily goal, features, tips and latest result.
- `/test` — Speed Lab with fresh randomized passages, timed tests, survival mode, difficulty presets, live analytics, coach feedback and local history.
- `/lessons` — Gamified lesson progression with locks, XP, stars, virtual keyboard guidance and lesson analytics.

## Included features

- Arabic + English with automatic RTL/LTR layout.
- Dark and light themes with persisted preference.
- Fresh test-passage generator: passages are re-composed on every restart and vary by language, difficulty and test duration.
- 15 / 30 / 60 / 120 second sprints plus Survival mode.
- Flow / Focus / Pro difficulty presets.
- WPM, accuracy, consistency, progress and health telemetry.
- Canvas performance chart and slow/error-prone key analysis.
- Interactive virtual keyboard and next-key guidance.
- Web Audio keyboard profiles (Thocky / Clicky), error and success feedback.
- XP, levels, lesson stars, badges, streaks and persistent progression.
- Recent test history, personal best, character count and daily goal.
- Contextual coach messages, practice tips and motivational microcopy.
- Responsive glassmorphism/neon UI and reduced-motion accessibility support.
- Local-first persistence through `localStorage` — no account required.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

> The app uses History API routes. When deploying to a static host, configure an SPA fallback so `/test` and `/lessons` are served by `index.html`.
