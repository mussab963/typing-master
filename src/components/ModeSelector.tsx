import type { Mode } from '../types';

interface Props { mode: Mode; onChange: (mode: Mode) => void; duration: number; setDuration: (n: number) => void; }

export default function ModeSelector({ mode, onChange, duration, setDuration }: Props) {
  return (
    <section className="mode-strip glass reveal">
      <div className="section-label">PLAY MODE</div>
      <div className="segmented mode-tabs">
        <button className={mode === 'lesson' ? 'active' : ''} onClick={() => onChange('lesson')}>Lesson</button>
        <button className={mode === 'survival' ? 'active danger' : ''} onClick={() => onChange('survival')}>Deathmatch</button>
        <button className={mode === 'time' ? 'active gold' : ''} onClick={() => onChange('time')}>Time Challenge</button>
      </div>
      <div className={`duration-picker ${mode === 'time' ? 'visible' : ''}`}>
        {[15, 30, 60].map((d) => <button key={d} className={duration === d ? 'selected' : ''} onClick={() => setDuration(d)}>{d}s</button>)}
      </div>
    </section>
  );
}
