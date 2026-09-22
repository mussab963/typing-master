interface Props {
  open: boolean;
  wpm: number;
  accuracy: number;
  stars?: number;
  xp?: number;
  title?: string;
  message?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onClose: () => void;
  onSecondary?: () => void;
}
export default function CompletionModal({ open, wpm, accuracy, stars = 0, xp = 0, title = 'Session complete', message = 'Excellent rhythm.', primaryLabel = 'Continue training', secondaryLabel, onClose, onSecondary }: Props) {
  if (!open) return null;
  return <div className="modal-backdrop"><div className="completion glass"><div className="trophy">✦</div><span className="eyebrow">SESSION COMPLETE</span><h2>{title}</h2><p className="completion-message">{message}</p>{stars > 0 && <div className="stars">{'★'.repeat(stars)}{'☆'.repeat(3-stars)}</div>}<div className="completion-stats"><div><span>WPM</span><b>{wpm}</b></div><div><span>Accuracy</span><b>{accuracy}%</b></div><div><span>{xp ? 'XP earned' : 'Status'}</span><b>{xp ? `+${xp}` : '✓'}</b></div></div><div className="modal-actions"><button className="primary-btn" onClick={onClose}>{primaryLabel}</button>{secondaryLabel && onSecondary && <button className="secondary-btn" onClick={onSecondary}>{secondaryLabel}</button>}</div></div></div>;
}
