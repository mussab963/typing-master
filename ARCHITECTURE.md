# Architecture

## Application shell

`src/App.tsx` owns cross-page state: language, theme, audio preferences, profile data and lightweight History API routing. The global header remains mounted while pages switch independently.

## Pages

- `pages/HomePage.tsx`: marketing / onboarding surface plus progress snapshot.
- `pages/SpeedTestPage.tsx`: independent speed-testing experience and session history.
- `pages/LessonsPage.tsx`: structured progression and lesson completion rewards.

## Domain modules

- `hooks/useTypingEngine.ts`: keystroke state, WPM, accuracy, consistency, survival health and telemetry.
- `hooks/useAudioEngine.ts`: synthesized keyboard/error/success sound engine using Web Audio API.
- `data/lessons.ts`: structured Arabic and English curriculum.
- `data/tests.ts`: randomized test-passage bank and fresh-test composer.
- `data/content.ts`: bilingual tips, motivation and adaptive coach messages.
- `lib/storage.ts`: profile/settings persistence and legacy profile migration.
- `types/index.ts`: shared domain types.

## UI system

Reusable components live under `src/components`. `styles/global.css` contains the token-based dark/light theme, responsive layouts, glass surfaces, animations, typing states and page-specific composition.

## Persistence

All user progress remains local in the browser. The profile schema stores XP, lessons, stars, badges, recent speed-test sessions, best WPM, total trained characters and daily-goal configuration. It is intentionally isolated behind `lib/storage.ts`, so a future API/auth backend can replace local persistence without rewriting the typing UI.
