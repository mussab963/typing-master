export type Language = 'en' | 'ar';
export type Mode = 'lesson' | 'survival' | 'time';
export type SoundProfile = 'thocky' | 'clicky';
export type Theme = 'dark' | 'light';
export type Route = '/' | '/test' | '/lessons';
export type TestDifficulty = 'flow' | 'focus' | 'pro';
export type LessonCategory = 'Beginner' | 'Intermediate' | 'Advanced' | 'Code Snippets' | 'Famous Quotes';

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  category: LessonCategory;
  text: string;
  minWpm: number;
  minAccuracy: number;
}

export interface PracticeText {
  id: string;
  difficulty: TestDifficulty;
  title: string;
  text: string;
}

export interface KeyStat {
  key: string;
  attempts: number;
  mistakes: number;
  avgDelay: number;
}

export interface TelemetryPoint {
  second: number;
  wpm: number;
  accuracy: number;
}

export interface SessionRecord {
  id: string;
  date: string;
  language: Language;
  kind: 'test' | 'lesson';
  wpm: number;
  accuracy: number;
  consistency: number;
  duration: number;
}

export interface Profile {
  xp: number;
  level: number;
  streak: number;
  completedLessons: string[];
  lessonStars: Record<string, number>;
  bestWpm: number;
  badges: string[];
  totalTests: number;
  totalCharacters: number;
  sessionHistory: SessionRecord[];
  dailyGoal: number;
}
