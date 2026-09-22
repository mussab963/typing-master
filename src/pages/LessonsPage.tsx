import { useEffect, useState } from 'react';
import AnalyticsPanel from '../components/AnalyticsPanel';
import CompletionModal from '../components/CompletionModal';
import LessonMap from '../components/LessonMap';
import MetricsBar from '../components/MetricsBar';
import MotivationCard from '../components/MotivationCard';
import TypingArena from '../components/TypingArena';
import VirtualKeyboard from '../components/VirtualKeyboard';
import { tips } from '../data/content';
import { lessonsByLanguage } from '../data/lessons';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { saveProfile } from '../lib/storage';
import type { Language, Profile } from '../types';

export default function LessonsPage({ language, profile, setProfile, audio }: { language: Language; profile: Profile; setProfile: (p: Profile) => void; audio: ReturnType<typeof useAudioEngine> }) {
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [showCompletion, setShowCompletion] = useState(false);
  const [reward, setReward] = useState({ stars: 0, xp: 0 });
  const lessons = lessonsByLanguage[language];
  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];
  const engine = useTypingEngine(activeLesson.text, 'lesson', 60);
  const currentKey = Array.from(activeLesson.text)[Array.from(engine.typed).length] || '';
  const isAr = language === 'ar';
  const lessonKey = `${language}-${activeLesson.id}`;

  useEffect(() => { setActiveLessonId(1); engine.reset(); }, [language]);
  useEffect(() => { engine.reset(); setShowCompletion(false); }, [activeLessonId]);
  useEffect(() => { const id = window.setInterval(engine.tick, 500); return () => clearInterval(id); }, [engine.tick]);
  useEffect(() => {
    if (!engine.ended || showCompletion) return;
    const stars = engine.accuracy >= 98 && engine.wpm >= activeLesson.minWpm ? 3 : engine.accuracy >= 94 ? 2 : 1;
    const earned = Math.max(40, Math.round(engine.wpm * (engine.accuracy / 100) + stars * 25));
    const completedLessons = profile.completedLessons.includes(lessonKey) ? profile.completedLessons : [...profile.completedLessons, lessonKey];
    const badges = [...profile.badges];
    if (stars === 3 && !badges.includes('Three Star Lesson')) badges.push('Three Star Lesson');
    const next = { ...profile, xp: profile.xp + earned, level: Math.floor((profile.xp + earned) / 500) + 1, streak: profile.streak + 1, completedLessons, lessonStars: { ...profile.lessonStars, [lessonKey]: Math.max(profile.lessonStars[lessonKey] || 0, stars) }, bestWpm: Math.max(profile.bestWpm, engine.wpm), totalCharacters: profile.totalCharacters + engine.typed.length, badges };
    setProfile(next); saveProfile(next); setReward({ stars, xp: earned }); setShowCompletion(true); audio.playSuccess();
  }, [engine.ended]);

  const handleChar = (char: string) => { const result = engine.registerChar(char); result.correct ? audio.playKey() : audio.playError(); };
  const activeIndex = lessons.findIndex(l => l.id === activeLesson.id);
  const goNext = () => { setShowCompletion(false); if (activeIndex < lessons.length - 1) setActiveLessonId(lessons[activeIndex + 1].id); else engine.reset(); };
  const completed = profile.completedLessons.filter(key => key.startsWith(`${language}-`)).length;
  const copy = isAr ? {
    eyebrow:'مسار التعلم', title:'من الأساسيات إلى الإتقان.', sub:'دروس مرتبة تبني الدقة والإيقاع والسرعة بالتدريج. اجمع النجوم وافتح المراحل التالية.', complete:'مكتمل', target:'الهدف', accuracy:'الدقة', coach:'نصيحة لهذه المرحلة', session:'جلسة الدرس', next:'الدرس التالي', repeat:'إعادة الدرس'
  } : {
    eyebrow:'LEARNING PATH', title:'From fundamentals to mastery.', sub:'Structured lessons that build accuracy, rhythm and speed progressively. Earn stars and unlock the next challenge.', complete:'complete', target:'Target', accuracy:'Accuracy', coach:'Lesson coach', session:'Lesson session', next:'Next lesson', repeat:'Repeat lesson'
  };

  return <>
    <section className="page-intro lessons-intro reveal"><div><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.sub}</p><div className="lesson-progress-line"><span>{completed}/{lessons.length} {copy.complete}</span><i><b style={{ width:`${(completed / lessons.length) * 100}%` }}/></i></div></div><MotivationCard language={language} seed={profile.xp + activeLesson.id} accent="gold" /></section>

    <div className="lesson-page-grid">
      <LessonMap lessons={lessons} activeId={activeLesson.id} profile={profile} language={language} onSelect={setActiveLessonId} />
      <div className="lesson-workspace">
        <MetricsBar wpm={engine.wpm} accuracy={engine.accuracy} consistency={engine.consistency} progress={engine.progress} health={3} showHealth={false} />
        <div className="lesson-context reveal"><div><span className="eyebrow">LESSON {activeLesson.id} · {activeLesson.category}</span><h2>{activeLesson.title}</h2><p>{activeLesson.subtitle}</p></div><div className="targets"><span>{copy.target} <b>{activeLesson.minWpm} WPM</b></span><span>{copy.accuracy} <b>{activeLesson.minAccuracy}%</b></span></div></div>
        <TypingArena text={activeLesson.text} typed={engine.typed} language={language} ended={engine.ended} onChar={handleChar} onBackspace={engine.backspace} onRestart={engine.reset} currentKey={currentKey} />
        <VirtualKeyboard language={language} activeKey={currentKey} />
      </div>
    </div>

    <section className="lesson-insights reveal"><div className="lesson-tip glass"><span className="tip-badge">TIP</span><div><span className="eyebrow">{copy.coach}</span><p>{tips[language][(activeLesson.id - 1) % tips[language].length]}</p></div></div><AnalyticsPanel telemetry={engine.telemetry} keyStats={engine.keyStats} language={language} /></section>

    <CompletionModal open={showCompletion} wpm={engine.wpm} accuracy={engine.accuracy} stars={reward.stars} xp={reward.xp} title={isAr ? 'أحسنت! أنهيت الدرس.' : 'Lesson mastered.'} message={isAr ? 'النجوم ليست النهاية؛ حاول جعل الإيقاع أكثر سلاسة في المرحلة القادمة.' : 'Stars are a checkpoint. Carry the rhythm into the next challenge.'} primaryLabel={activeIndex < lessons.length - 1 ? copy.next : copy.repeat} onClose={goNext} />
  </>;
}
