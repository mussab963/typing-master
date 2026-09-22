import type { Language } from '../types';

const english = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m']
];
const arabic = [
  ['ض','ص','ث','ق','ف','غ','ع','ه','خ','ح','ج','د'],
  ['ش','س','ي','ب','ل','ا','ت','ن','م','ك','ط'],
  ['ئ','ء','ؤ','ر','لا','ى','ة','و','ز','ظ']
];

export default function VirtualKeyboard({ language, activeKey }: { language: Language; activeKey: string }) {
  const rows = language === 'ar' ? arabic : english;
  return (
    <section className="keyboard glass reveal">
      <div className="keyboard-head"><span className="section-label">FINGER GUIDE</span><span className="hint-dot"><i /> recommended key</span></div>
      <div className="keys">
        {rows.map((row, r) => <div className="key-row" key={r}>{row.map((key) => <div className={`key ${key === activeKey.toLowerCase() ? 'active' : ''}`} key={key}>{key.toUpperCase()}</div>)}</div>)}
        <div className="key-row"><div className={`key space ${activeKey === ' ' ? 'active' : ''}`}>SPACE</div></div>
      </div>
      <div className="finger-legend">
        <span><i className="f1" />Left pinky</span><span><i className="f2" />Left hand</span><span><i className="f3" />Right hand</span><span><i className="f4" />Right pinky</span>
      </div>
    </section>
  );
}
