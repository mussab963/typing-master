import { useEffect, useMemo, useRef } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import type { Language } from '../types';

interface Props {
  text: string;
  typed: string;
  language: Language;
  ended: boolean;
  onChar: (char: string) => void;
  onBackspace: () => void;
  onRestart: () => void;
  currentKey: string;
}

export default function TypingArena({ text, typed, language, ended, onChar, onBackspace, onRestart, currentKey }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const chars = useMemo(() => Array.from(text), [text]);
  const inputChars = useMemo(() => Array.from(typed), [typed]);
  const isAr = language === 'ar';

  useEffect(() => { ref.current?.focus(); }, [text, ended]);

  return (
    <section className="typing-card glass reveal" onClick={() => ref.current?.focus()}>
      <div className="typing-head">
        <div><span className="eyebrow">{isAr ? 'جلسة مباشرة' : 'LIVE SESSION'}</span><h2>{ended ? (isAr ? 'اكتملت الجلسة' : 'Session complete') : (isAr ? 'حافظ على الإيقاع. الدقة أولا.' : 'Stay smooth. Accuracy first.')}</h2></div>
        <div className="next-key"><span>{isAr ? 'الحرف التالي' : 'NEXT KEY'}</span><b>{currentKey === ' ' ? 'SPACE' : currentKey || '—'}</b></div>
      </div>
      <div
        ref={ref}
        className={`typing-text ${isAr ? 'rtl' : ''}`}
        tabIndex={0}
        role="textbox"
        aria-label="Typing area"
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Backspace') { e.preventDefault(); onBackspace(); return; }
          if (e.key.length === 1) { e.preventDefault(); onChar(e.key); }
        }}
      >
        {chars.map((char, i) => {
          const state = i < inputChars.length ? (inputChars[i] === char ? 'correct' : 'wrong') : i === inputChars.length ? 'current' : 'pending';
          return <span className={`char ${state}`} key={`${char}-${i}`}>{char === ' ' ? '\u00A0' : char}</span>;
        })}
      </div>
      <div className="arena-footer">
        <span>{isAr ? 'اضغط داخل المنطقة وابدأ الكتابة · زر الحذف متاح' : 'Click here and start typing · Backspace is enabled'}</span>
        <button className="ghost-btn" onClick={(e: MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); onRestart(); }}>↻ {isAr ? 'إعادة' : 'Restart'}</button>
      </div>
    </section>
  );
}
