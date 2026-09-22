import { useEffect, useMemo, useRef, useState } from 'react';
import AnalyticsPanel from '../components/AnalyticsPanel';
import CompletionModal from '../components/CompletionModal';
import MetricsBar from '../components/MetricsBar';
import MotivationCard from '../components/MotivationCard';
import TypingArena from '../components/TypingArena';
import VirtualKeyboard from '../components/VirtualKeyboard';
import { coachMessage, tips } from '../data/content';
import { createFreshTest } from '../data/tests';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { addSession, saveProfile } from '../lib/storage';
import type { Language, Mode, Profile, SessionRecord, TestDifficulty } from '../types';

interface Props {
  language: Language;
  profile: Profile;
  setProfile: (p: Profile) => void;
  audio: ReturnType<typeof useAudioEngine>;
}

export default function SpeedTestPage({ language, profile, setProfile, audio }: Props) {
  const [mode, setMode] = useState<Extract<Mode, 'time' | 'survival'>>('time');
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState<TestDifficulty>('flow');
  const [test, setTest] = useState(() => createFreshTest(language, 'flow', 30));
  const [showResult, setShowResult] = useState(false);
  const savedRef = useRef(false);
  const engine = useTypingEngine(test.text, mode, duration);
  const currentKey = Array.from(test.text)[Array.from(engine.typed).length] || '';
  const isAr = language === 'ar';

  const newTest = (nextDifficulty = difficulty, nextDuration = duration, nextMode = mode) => {
    const generated = createFreshTest(language, nextDifficulty, nextMode === 'survival' ? 120 : nextDuration, test.id.split('|')[0]);
    setTest(generated);
    engine.reset();
    savedRef.current = false;
    setShowResult(false);
  };

  useEffect(() => { newTest(difficulty, duration, mode); }, [language]);
  useEffect(() => { const id = window.setInterval(engine.tick, 500); return () => window.clearInterval(id); }, [engine.tick]);

  useEffect(() => {
    if (!engine.ended || savedRef.current) return;
    savedRef.current = true;
    const seconds = engine.telemetry.length ? engine.telemetry[engine.telemetry.length - 1].second : (mode === 'time' ? duration : 0);
    const session: SessionRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date: new Date().toISOString(), language, kind: 'test', wpm: engine.wpm,
      accuracy: engine.accuracy, consistency: engine.consistency, duration: seconds
    };
    const earned = Math.max(20, Math.round(engine.wpm * (engine.accuracy / 100)));
    let next = addSession(profile, session);
    const badges = [...next.badges];
    if (engine.wpm >= 50 && !badges.includes('Speed 50')) badges.push('Speed 50');
    if (engine.wpm >= 80 && !badges.includes('Speed 80')) badges.push('Speed 80');
    if (engine.accuracy >= 98 && !badges.includes('Precision 98')) badges.push('Precision 98');
    next = { ...next, xp: next.xp + earned, level: Math.floor((next.xp + earned) / 500) + 1, streak: next.streak + 1, totalCharacters: next.totalCharacters + engine.typed.length, badges };
    saveProfile(next); setProfile(next); setShowResult(true); audio.playSuccess(); confettiBurst();
  }, [engine.ended]);

  const handleChar = (char: string) => { const result = engine.registerChar(char); result.correct ? audio.playKey() : audio.playError(); };
  const recent = profile.sessionHistory.filter(s => s.kind === 'test').slice(0, 5);
  const tipIndex = useMemo(() => (profile.totalTests + duration + difficulty.length) % tips[language].length, [profile.totalTests, duration, difficulty, language]);
  const copy = isAr ? {
    eyebrow:'مختبر السرعة', title:'اختبار كتابة يتغير معك.', sub:'اختر نوع التحدي ومستواه. كل إعادة تولد لك نصا مختلفا حتى لا تحفظ الجمل وتفقد قيمة التدريب.',
    timed:'تحدي الوقت', survival:'البقاء', flow:'سلس', focus:'تركيز', pro:'احترافي', duration:'المدة', level:'المستوى', fresh:'نص جديد', coach:'ملاحظة المدرب', recent:'آخر الاختبارات', freshHint:'كل ضغطة Restart = نص جديد',
    result:'نتيجة الاختبار', again:'اختبار جديد', close:'إغلاق'
  } : {
    eyebrow:'SPEED LAB', title:'A typing test that changes with you.', sub:'Choose a challenge and difficulty. Every restart generates a fresh passage so you train skill, not memorization.',
    timed:'Timed sprint', survival:'Survival', flow:'Flow', focus:'Focus', pro:'Pro', duration:'Duration', level:'Difficulty', fresh:'Fresh text', coach:'Coach note', recent:'Recent tests', freshHint:'Every Restart = a new passage',
    result:'Test complete', again:'New test', close:'Close'
  };

  return <>
    <section className="page-intro reveal">
      <div><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.sub}</p></div>
      <MotivationCard language={language} seed={profile.totalTests + engine.wpm} accent="cyan" />
    </section>

    <section className="test-control-panel glass reveal">
      <div className="control-group"><span className="section-label">MODE</span><div className="segmented"><button className={mode === 'time' ? 'active' : ''} onClick={() => { setMode('time'); newTest(difficulty, duration, 'time'); }}>⏱ {copy.timed}</button><button className={mode === 'survival' ? 'active danger' : ''} onClick={() => { setMode('survival'); newTest(difficulty, duration, 'survival'); }}>♥ {copy.survival}</button></div></div>
      <div className="control-group"><span className="section-label">{copy.level}</span><div className="chip-row">{(['flow','focus','pro'] as TestDifficulty[]).map(d => <button key={d} className={difficulty === d ? 'selected' : ''} onClick={() => { setDifficulty(d); newTest(d, duration, mode); }}>{d === 'flow' ? copy.flow : d === 'focus' ? copy.focus : copy.pro}</button>)}</div></div>
      <div className={`control-group ${mode === 'survival' ? 'is-disabled' : ''}`}><span className="section-label">{copy.duration}</span><div className="chip-row">{[15,30,60,120].map(d => <button key={d} className={duration === d ? 'selected' : ''} onClick={() => { setDuration(d); newTest(difficulty, d, mode); }}>{d}s</button>)}</div></div>
      <button className="fresh-btn" onClick={() => newTest()}>↻ <span>{copy.fresh}</span></button>
    </section>

    <MetricsBar wpm={engine.wpm} accuracy={engine.accuracy} consistency={engine.consistency} progress={engine.progress} health={engine.health} showHealth={mode === 'survival'} />

    <div className="test-title-row reveal"><div><span className="eyebrow">{difficulty.toUpperCase()} PASSAGE</span><h2>{test.title}</h2></div><span className="fresh-hint">↻ {copy.freshHint}</span></div>
    <TypingArena text={test.text} typed={engine.typed} language={language} ended={engine.ended} onChar={handleChar} onBackspace={engine.backspace} onRestart={() => newTest()} currentKey={currentKey} />
    <VirtualKeyboard language={language} activeKey={currentKey} />

    <section className="coach-strip glass reveal"><div className="coach-orb">◈</div><div><span className="eyebrow">{copy.coach}</span><p>{coachMessage(language, engine.wpm, engine.accuracy)}</p></div><div className="micro-tip"><span>TIP {tipIndex + 1}</span><p>{tips[language][tipIndex]}</p></div></section>

    <div className="lower-grid test-lower-grid">
      <AnalyticsPanel telemetry={engine.telemetry} keyStats={engine.keyStats} language={language} />
      <section className="panel glass reveal recent-panel"><div className="panel-heading"><div><span className="eyebrow">HISTORY</span><h3>{copy.recent}</h3></div><span className="panel-kicker">PB {profile.bestWpm} WPM</span></div>{recent.length ? <div className="recent-list">{recent.map((s, i) => <div className="recent-row" key={s.id}><span className="recent-rank">{String(i+1).padStart(2,'0')}</span><div><b>{s.wpm} WPM</b><small>{s.accuracy}% ACC · {s.consistency}% CONS</small></div><time>{new Date(s.date).toLocaleDateString(language === 'ar' ? 'ar' : 'en', { month:'short', day:'numeric' })}</time></div>)}</div> : <p className="empty-copy">{isAr ? 'لا يوجد سجل بعد. أول اختبار سيبدأ قصتك.' : 'No history yet. Your first test starts the story.'}</p>}</section>
    </div>

    <CompletionModal open={showResult} wpm={engine.wpm} accuracy={engine.accuracy} title={copy.result} message={coachMessage(language, engine.wpm, engine.accuracy)} primaryLabel={copy.again} secondaryLabel={copy.close} onClose={() => newTest()} onSecondary={() => setShowResult(false)} />
  </>;
}

function confettiBurst() {
  const colors = ['#00f3ff','#9d4edd','#ffd166','#ff0055','#ffffff'];
  for (let i=0;i<38;i++) { const el=document.createElement('i'); el.className='confetti'; el.style.left=`${48+Math.random()*4}%`; el.style.top='40%'; el.style.background=colors[i%colors.length]; el.style.setProperty('--x',`${(Math.random()-.5)*700}px`); el.style.setProperty('--y',`${-160-Math.random()*400}px`); el.style.setProperty('--r',`${Math.random()*720-360}deg`); document.body.appendChild(el); setTimeout(()=>el.remove(),1300); }
}
