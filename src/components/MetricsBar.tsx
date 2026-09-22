interface Props { wpm: number; accuracy: number; consistency: number; progress: number; health: number; showHealth: boolean; }

export default function MetricsBar({ wpm, accuracy, consistency, progress, health, showHealth }: Props) {
  const cards = [
    ['WPM', wpm, 'cyan'],
    ['ACCURACY', `${accuracy}%`, 'purple'],
    ['CONSISTENCY', `${consistency}%`, 'gold'],
    ['PROGRESS', `${progress}%`, 'cyan']
  ];
  return (
    <div className="metrics-grid">
      {cards.map(([label, value, tone]) => (
        <div className={`metric glass ${tone}`} key={label as string}>
          <span>{label}</span><strong>{value}</strong><i />
        </div>
      ))}
      {showHealth && <div className="metric glass crimson"><span>HEALTH</span><strong>{'❤'.repeat(health)}{'♡'.repeat(3 - health)}</strong><i /></div>}
    </div>
  );
}
