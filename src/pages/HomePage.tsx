import MotivationCard from '../components/MotivationCard';
import { tips } from '../data/content';
import type { Language, Profile, Route } from '../types';

export default function HomePage({ language, profile, navigate }: { language: Language; profile: Profile; navigate: (route: Route) => void }) {
  const isAr = language === 'ar';
  const today = new Date().toISOString().slice(0, 10);
  const todayTests = profile.sessionHistory.filter(s => s.kind === 'test' && s.date.startsWith(today)).length;
  const goalProgress = Math.min(100, Math.round((todayTests / profile.dailyGoal) * 100));
  const latest = profile.sessionHistory[0];
  const copy = isAr ? {
    eyebrow:'منصة تدريب الكتابة بالعربية والإنجليزية',
    titleA:'اكتب أسرع.', titleB:'بدقة أعلى.',
    intro:'منصة تدريب حديثة تجمع اختبار السرعة، مسار دروس متدرج، تحليلات لحظية، نصائح ذكية، وأهداف يومية في تجربة واحدة.',
    start:'ابدأ اختبار السرعة', lessons:'استكشف الدروس',
    dashboard:'لوحة تقدمك', best:'أفضل سرعة', tests:'اختبارات مكتملة', chars:'حرف تم تدريبه', goal:'الهدف اليومي',
    features:'مصمم للتطور، وليس لرقم واحد', featureSub:'كل جزء في TypeMaster يساعدك على بناء عادة كتابة أسرع وأكثر ثباتا.',
    f1:'نصوص تتجدد باستمرار', f1d:'كل اختبار جديد يختار نصا مختلفا حسب اللغة والمستوى والمدة.',
    f2:'تحليل مباشر', f2d:'راقب السرعة والدقة والثبات والحروف التي تسبب لك بطئا أو أخطاء.',
    f3:'مسار دروس محفز', f3d:'XP ونجوم وشارات ومراحل مقفلة تفتحها مع تقدمك.',
    f4:'مدرب صغير داخل التجربة', f4d:'نصائح وتحفيز يتغيران حسب مستواك ونتائج جلساتك.',
    tips:'نصائح ترفع مستواك', latest:'آخر جلسة', noLatest:'ابدأ أول اختبار لتظهر نتائجك هنا.'
  } : {
    eyebrow:'Bilingual typing performance platform', titleA:'Type faster.', titleB:'Stay precise.',
    intro:'A modern training platform combining speed tests, structured lessons, live analytics, smart coaching and daily goals in one focused experience.',
    start:'Start speed test', lessons:'Explore lessons', dashboard:'Your progress', best:'Personal best', tests:'Tests completed', chars:'Characters trained', goal:'Daily goal',
    features:'Built for progress, not one lucky score', featureSub:'Every part of TypeMaster is designed to help you build a faster, more consistent typing habit.',
    f1:'Always-fresh passages', f1d:'Every new test selects a different passage based on language, level and duration.',
    f2:'Live performance insight', f2d:'Track speed, accuracy, consistency and the keys that create friction.',
    f3:'Gamified lesson path', f3d:'Earn XP, stars and badges while unlocking progressively harder lessons.',
    f4:'A coach inside the product', f4d:'Tips and motivation adapt to the way you perform during practice.',
    tips:'Tips that actually help', latest:'Latest session', noLatest:'Complete your first test to see a result here.'
  };

  return <>
    <section className="home-hero reveal">
      <div className="hero-copy">
        <div className="hero-pill"><span className="live-dot" />{copy.eyebrow}</div>
        <h1>{copy.titleA}<br/><span>{copy.titleB}</span></h1>
        <p>{copy.intro}</p>
        <div className="hero-actions"><button className="primary-btn large" onClick={() => navigate('/test')}>{copy.start} <b>↗</b></button><button className="secondary-btn large" onClick={() => navigate('/lessons')}>{copy.lessons}</button></div>
        <div className="hero-proof"><span>⌨ {isAr ? 'عربي + English' : 'English + عربي'}</span><span>⚡ {isAr ? 'بدون حساب' : 'No account needed'}</span><span>◈ {isAr ? 'حفظ محلي' : 'Local progress'}</span></div>
      </div>
      <div className="hero-visual glass">
        <div className="visual-top"><span>LIVE PREVIEW</span><i>● ● ●</i></div>
        <div className="fake-typing" dir={isAr ? 'rtl' : 'ltr'}><span className="typed-preview">{isAr ? 'كل ضغطة دقيقة ' : 'Every accurate keystroke '}</span><span className="cursor-preview">{isAr ? 'تبني' : 'builds'}</span><span>{isAr ? ' سرعة الغد.' : ' tomorrow’s speed.'}</span></div>
        <div className="preview-metrics"><div><small>WPM</small><b>{profile.bestWpm || 54}</b></div><div><small>ACCURACY</small><b>98%</b></div><div><small>STREAK</small><b>{profile.streak || 7}</b></div></div>
        <div className="preview-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
      </div>
    </section>

    <section className="dashboard-section reveal">
      <div className="section-heading"><div><span className="eyebrow">{copy.dashboard}</span><h2>{isAr ? 'أرقامك تتكلم عن تقدمك' : 'Your numbers tell the story'}</h2></div><span className="soft-label">LEVEL {profile.level}</span></div>
      <div className="home-stats">
        <div className="home-stat glass"><span>{copy.best}</span><strong>{profile.bestWpm}</strong><small>WPM</small></div>
        <div className="home-stat glass"><span>{copy.tests}</span><strong>{profile.totalTests}</strong><small>SESSIONS</small></div>
        <div className="home-stat glass"><span>{copy.chars}</span><strong>{profile.totalCharacters.toLocaleString()}</strong><small>KEYS</small></div>
        <div className="home-stat glass goal-stat"><div><span>{copy.goal}</span><strong>{todayTests}/{profile.dailyGoal}</strong></div><div className="goal-ring" style={{'--goal':`${goalProgress * 3.6}deg`} as React.CSSProperties}><b>{goalProgress}%</b></div></div>
      </div>
    </section>

    <MotivationCard language={language} seed={profile.totalTests + profile.streak} accent="purple" />

    <section className="feature-section reveal">
      <div className="section-heading wide"><div><span className="eyebrow">TYPEMASTER SYSTEM</span><h2>{copy.features}</h2><p>{copy.featureSub}</p></div></div>
      <div className="feature-grid">
        {[[copy.f1,copy.f1d,'↻'],[copy.f2,copy.f2d,'⌁'],[copy.f3,copy.f3d,'✦'],[copy.f4,copy.f4d,'◈']].map(([title,desc,icon],i)=><article className="feature-card glass" key={title}><span className={`feature-icon f-${i+1}`}>{icon}</span><h3>{title}</h3><p>{desc}</p><b>0{i+1}</b></article>)}
      </div>
    </section>

    <section className="home-bottom-grid reveal">
      <div className="tips-panel glass"><div className="panel-heading"><div><span className="eyebrow">COACH</span><h3>{copy.tips}</h3></div><span className="panel-kicker">01—03</span></div><div className="tips-stack">{tips[language].slice(0,3).map((tip,i)=><div className="tip-row" key={tip}><span>{String(i+1).padStart(2,'0')}</span><p>{tip}</p></div>)}</div></div>
      <div className="latest-panel glass"><span className="eyebrow">{copy.latest}</span>{latest ? <><div className="latest-score"><strong>{latest.wpm}</strong><span>WPM</span></div><div className="latest-details"><span>{latest.accuracy}% {isAr ? 'دقة' : 'accuracy'}</span><span>{latest.consistency}% {isAr ? 'ثبات' : 'consistency'}</span></div><button className="secondary-btn" onClick={() => navigate('/test')}>{isAr ? 'حاول كسر رقمك' : 'Try to beat it'} →</button></> : <p className="empty-copy">{copy.noLatest}</p>}</div>
    </section>
  </>;
}
