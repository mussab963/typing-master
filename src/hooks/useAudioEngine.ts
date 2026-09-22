import { useCallback, useRef, useState } from 'react';
import type { SoundProfile } from '../types';

export function useAudioEngine() {
  const contextRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(false);
  const [profile, setProfile] = useState<SoundProfile>('thocky');

  const ctx = () => {
    if (!contextRef.current) contextRef.current = new AudioContext();
    return contextRef.current;
  };

  const tone = useCallback((frequency: number, duration: number, volume: number, type: OscillatorType) => {
    if (muted) return;
    const audio = ctx();
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audio.currentTime);
    gain.gain.setValueAtTime(volume, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
    osc.connect(gain).connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + duration);
  }, [muted]);

  const playKey = useCallback(() => {
    if (profile === 'thocky') tone(95 + Math.random() * 25, 0.055, 0.055, 'sine');
    else tone(420 + Math.random() * 120, 0.025, 0.035, 'square');
  }, [profile, tone]);

  const playError = useCallback(() => tone(135, 0.12, 0.04, 'sawtooth'), [tone]);
  const playSuccess = useCallback(() => {
    tone(520, 0.1, 0.04, 'sine');
    setTimeout(() => tone(760, 0.14, 0.035, 'sine'), 70);
  }, [tone]);

  return { muted, setMuted, profile, setProfile, playKey, playError, playSuccess };
}
