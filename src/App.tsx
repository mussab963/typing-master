import { useEffect, useState } from 'react';
import Header from './components/Header';
import { useAudioEngine } from './hooks/useAudioEngine';
import { loadProfile, loadSettings, saveSettings } from './lib/storage';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import SpeedTestPage from './pages/SpeedTestPage';
import type { Language, Profile, Route, Theme } from './types';

function readRoute(): Route {
  const path = window.location.pathname;
  if (path === '/test' || path === '/lessons') return path;
  return '/';
}

export default function App() {
  const settings = loadSettings();
  const [language, setLanguage] = useState<Language>(settings.language);
  const [theme, setTheme] = useState<Theme>(settings.theme);
  const [route, setRoute] = useState<Route>(readRoute);
  const [profile, setProfile] = useState<Profile>(() => loadProfile());
  const audio = useAudioEngine();
  const level = Math.floor(profile.xp / 500) + 1;

  const navigate = (next: Route) => {
    if (next !== window.location.pathname) window.history.pushState({}, '', next);
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onPop = () => setRoute(readRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    saveSettings(language, theme);
  }, [language, theme]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .1 });
    const timer = window.setTimeout(() => document.querySelectorAll('.reveal').forEach(el => observer.observe(el)), 30);
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, [route, language]);

  return (
    <div className="app-shell">
      <div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="ambient ambient-three"/><div className="noise"/>
      <Header route={route} navigate={navigate} language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} muted={audio.muted} setMuted={audio.setMuted} soundProfile={audio.profile} setSoundProfile={audio.setProfile} xp={profile.xp} level={level} />
      <main className={`page page-${route === '/' ? 'home' : route.slice(1)}`}>
        {route === '/' && <HomePage language={language} profile={{ ...profile, level }} navigate={navigate} />}
        {route === '/test' && <SpeedTestPage language={language} profile={{ ...profile, level }} setProfile={setProfile} audio={audio} />}
        {route === '/lessons' && <LessonsPage language={language} profile={{ ...profile, level }} setProfile={setProfile} audio={audio} />}
      </main>
      <footer><span>TYPEMASTER / PERFORMANCE LAB</span><span>{language === 'ar' ? 'تقدم محلي · تدريب ثنائي اللغة · خصوصية أولا' : 'Local progress · Bilingual training · Privacy first'}</span></footer>
    </div>
  );
}
