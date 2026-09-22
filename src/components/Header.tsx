import type { ChangeEvent } from 'react';
import type { Language, Route, SoundProfile, Theme } from '../types';

interface Props {
  route: Route;
  navigate: (route: Route) => void;
  language: Language;
  setLanguage: (v: Language) => void;
  theme: Theme;
  setTheme: (v: Theme) => void;
  muted: boolean;
  setMuted: (v: boolean) => void;
  soundProfile: SoundProfile;
  setSoundProfile: (v: SoundProfile) => void;
  xp: number;
  level: number;
}

export default function Header({ route, navigate, language, setLanguage, theme, setTheme, muted, setMuted, soundProfile, setSoundProfile, xp, level }: Props) {
  const t = language === 'ar'
    ? { home:'الرئيسية', test:'اختبار السرعة', lessons:'الدروس', theme:'تغيير المظهر' }
    : { home:'Home', test:'Speed Test', lessons:'Lessons', theme:'Toggle theme' };

  const links: { path: Route; label: string }[] = [
    { path: '/', label: t.home },
    { path: '/test', label: t.test },
    { path: '/lessons', label: t.lessons }
  ];

  return (
    <header className="topbar glass">
      <button className="brand-wrap brand-button" onClick={() => navigate('/')} aria-label="TypeMaster home">
        <div className="brand-mark">T</div>
        <div>
          <div className="brand">TYPE<span>MASTER</span></div>
          <div className="brand-sub">NEON PERFORMANCE LAB</div>
        </div>
      </button>

      <nav className="main-nav" aria-label="Primary navigation">
        {links.map(link => <button key={link.path} className={route === link.path ? 'active' : ''} onClick={() => navigate(link.path)}>{link.label}</button>)}
      </nav>

      <div className="topbar-actions">
        <div className="mini-stat"><span>LVL</span><b>{level}</b></div>
        <div className="mini-stat"><span>XP</span><b>{xp}</b></div>
        <div className="segmented compact language-switch">
          <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
          <button className={language === 'ar' ? 'active' : ''} onClick={() => setLanguage('ar')}>ع</button>
        </div>
        <select className="select sound-select" value={soundProfile} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSoundProfile(e.target.value as SoundProfile)} aria-label="Keyboard sound">
          <option value="thocky">Thocky</option><option value="clicky">Clicky</option>
        </select>
        <button className="icon-btn" onClick={() => setMuted(!muted)} aria-label="Toggle sound">{muted ? '🔇' : '🔊'}</button>
        <button className="icon-btn theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={t.theme}>{theme === 'dark' ? '☀' : '☾'}</button>
      </div>
    </header>
  );
}
