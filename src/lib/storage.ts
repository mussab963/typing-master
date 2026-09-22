import type { Language, Profile, SessionRecord, Theme } from '../types';

const PROFILE_KEY = 'typing-master-pro-profile-v2';
const SETTINGS_KEY = 'typing-master-pro-settings-v1';

export const defaultProfile: Profile = {
  xp: 0,
  level: 1,
  streak: 0,
  completedLessons: [],
  lessonStars: {},
  bestWpm: 0,
  badges: [],
  totalTests: 0,
  totalCharacters: 0,
  sessionHistory: [],
  dailyGoal: 3
};

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return { ...defaultProfile, ...JSON.parse(raw) };
    const legacy = localStorage.getItem('typing-master-pro-profile-v1');
    if (!legacy) return defaultProfile;
    const parsed = JSON.parse(legacy);
    return {
      ...defaultProfile,
      ...parsed,
      completedLessons: (parsed.completedLessons || []).map((id: number | string) => String(id).includes('-') ? String(id) : `en-${id}`),
      lessonStars: Object.fromEntries(Object.entries(parsed.lessonStars || {}).map(([key, value]) => [key.includes('-') ? key : `en-${key}`, value]))
    };
  } catch { return defaultProfile; }
}

export function saveProfile(profile: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function addSession(profile: Profile, session: SessionRecord): Profile {
  const next = {
    ...profile,
    bestWpm: Math.max(profile.bestWpm, session.wpm),
    totalTests: profile.totalTests + (session.kind === 'test' ? 1 : 0),
    sessionHistory: [session, ...profile.sessionHistory].slice(0, 12)
  };
  saveProfile(next);
  return next;
}

export function loadSettings(): { language: Language; theme: Theme } {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    const browserLanguage: Language = typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    return { language: parsed.language || browserLanguage, theme: parsed.theme || 'dark' };
  } catch { return { language: 'en', theme: 'dark' }; }
}

export function saveSettings(language: Language, theme: Theme) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ language, theme }));
}
