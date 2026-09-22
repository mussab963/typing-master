import { motivation } from '../data/content';
import type { Language } from '../types';

export default function MotivationCard({ language, seed = 0, accent = 'cyan' }: { language: Language; seed?: number; accent?: 'cyan' | 'gold' | 'purple' }) {
  return (
    <aside className={`motivation-card glass ${accent}`}>
      <span className="motivation-icon">✦</span>
      <div>
        <span className="eyebrow">{language === 'ar' ? 'دفعة تحفيز' : 'MOMENTUM NOTE'}</span>
        <p>{motivation(language, seed)}</p>
      </div>
    </aside>
  );
}
