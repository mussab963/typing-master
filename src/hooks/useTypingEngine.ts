import { useCallback, useMemo, useRef, useState } from 'react';
import type { KeyStat, Mode, TelemetryPoint } from '../types';

export function useTypingEngine(text: string, mode: Mode, duration: number) {
  const [typed, setTyped] = useState('');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [ended, setEnded] = useState(false);
  const [health, setHealth] = useState(3);
  const [telemetry, setTelemetry] = useState<TelemetryPoint[]>([]);
  const [keyStats, setKeyStats] = useState<Record<string, KeyStat>>({});
  const lastKeyAt = useRef<number | null>(null);

  const correct = useMemo(() => [...typed].reduce((sum, char, index) => sum + (char === text[index] ? 1 : 0), 0), [typed, text]);
  const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
  const elapsed = startedAt ? Math.max(1, (Date.now() - startedAt) / 1000) : 0;
  const wpm = startedAt ? Math.max(0, Math.round((correct / 5) / (elapsed / 60))) : 0;
  const progress = text.length ? Math.min(100, Math.round((typed.length / text.length) * 100)) : 0;
  const consistency = Math.max(0, Math.round(100 - Math.min(100, Object.values(keyStats).reduce((s, k) => s + k.mistakes, 0) * 4)));

  const registerChar = useCallback((char: string) => {
    if (ended || typed.length >= text.length) return { correct: false, completed: ended };
    const now = Date.now();
    if (!startedAt) setStartedAt(now);
    const index = typed.length;
    const expected = text[index];
    const isCorrect = char === expected;

    setTyped((prev) => prev + char);
    const delay = lastKeyAt.current ? now - lastKeyAt.current : 0;
    lastKeyAt.current = now;
    const key = expected.toLowerCase();
    setKeyStats((prev) => {
      const old = prev[key] || { key, attempts: 0, mistakes: 0, avgDelay: 0 };
      const attempts = old.attempts + 1;
      return {
        ...prev,
        [key]: {
          key,
          attempts,
          mistakes: old.mistakes + (isCorrect ? 0 : 1),
          avgDelay: Math.round(((old.avgDelay * old.attempts) + delay) / attempts)
        }
      };
    });

    if (!isCorrect && mode === 'survival') {
      setHealth((prev) => {
        const next = prev - 1;
        if (next <= 0) setEnded(true);
        return Math.max(0, next);
      });
    }

    const completed = index + 1 >= text.length;
    if (completed) setEnded(true);
    return { correct: isCorrect, completed };
  }, [ended, mode, startedAt, text, typed.length]);

  const backspace = useCallback(() => {
    if (ended) return;
    setTyped((prev) => prev.slice(0, -1));
  }, [ended]);

  const tick = useCallback(() => {
    if (!startedAt || ended) return;
    const sec = Math.floor((Date.now() - startedAt) / 1000);
    const point: TelemetryPoint = { second: sec, wpm, accuracy };
    setTelemetry((prev) => prev.length && prev[prev.length - 1].second === sec ? prev : [...prev.slice(-59), point]);
    if (mode === 'time' && sec >= duration) setEnded(true);
  }, [accuracy, duration, ended, mode, startedAt, wpm]);

  const reset = useCallback(() => {
    setTyped('');
    setStartedAt(null);
    setEnded(false);
    setHealth(3);
    setTelemetry([]);
    setKeyStats({});
    lastKeyAt.current = null;
  }, []);

  return { typed, startedAt, ended, health, telemetry, keyStats, accuracy, wpm, progress, consistency, registerChar, backspace, tick, reset };
}
