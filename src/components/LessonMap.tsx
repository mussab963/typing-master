import type { Language, Lesson, Profile } from '../types';

interface Props { lessons: Lesson[]; activeId: number; profile: Profile; language: Language; onSelect: (id: number) => void; }

export default function LessonMap({ lessons, activeId, profile, language, onSelect }: Props) {
  const completedCount = profile.completedLessons.filter(key => key.startsWith(`${language}-`)).length;
  return (
    <section className="panel glass reveal lesson-map-panel">
      <div className="panel-heading"><div><span className="eyebrow">PROGRESSION</span><h3>{language === 'ar' ? 'مسار المستويات' : 'Level Track'}</h3></div><span className="panel-kicker">{completedCount}/{lessons.length}</span></div>
      <div className="level-path">
        {lessons.map((lesson, index) => {
          const key = `${language}-${lesson.id}`;
          const prevKey = index > 0 ? `${language}-${lessons[index - 1].id}` : '';
          const unlocked = index === 0 || profile.completedLessons.includes(prevKey) || profile.completedLessons.includes(key);
          const stars = profile.lessonStars[key] || 0;
          return (
            <button key={lesson.id} className={`level-node ${activeId === lesson.id ? 'active' : ''} ${unlocked ? '' : 'locked'}`} onClick={() => unlocked && onSelect(lesson.id)}>
              <span className="node-number">{unlocked ? lesson.id : '⌁'}</span>
              <span className="node-copy"><b>{lesson.title}</b><small>{lesson.category}</small><em>{'★'.repeat(stars)}{'☆'.repeat(3-stars)}</em></span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
