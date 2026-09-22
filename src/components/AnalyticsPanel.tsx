import { useEffect, useRef } from 'react';
import type { KeyStat, Language, TelemetryPoint } from '../types';

interface Props { telemetry: TelemetryPoint[]; keyStats: Record<string, KeyStat>; language?: Language; }

export default function AnalyticsPanel({ telemetry, keyStats, language = 'en' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isAr = language === 'ar';
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const dpr = devicePixelRatio || 1; const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height; ctx.clearRect(0,0,w,h);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-grid').trim() || 'rgba(255,255,255,.08)'; ctx.lineWidth = 1;
    for (let i=1;i<5;i++){ const y=(h/5)*i; ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke(); }
    const draw = (values: number[], stroke: string, max: number) => {
      if (values.length < 2) return; ctx.beginPath();
      values.forEach((v,i)=>{ const x=(i/(values.length-1))*w; const y=h-(Math.min(max,v)/max)*(h-10)-5; i?ctx.lineTo(x,y):ctx.moveTo(x,y); });
      ctx.strokeStyle=stroke;ctx.lineWidth=2.4;ctx.shadowBlur=12;ctx.shadowColor=stroke;ctx.stroke();ctx.shadowBlur=0;
    };
    draw(telemetry.map(p=>p.wpm),'#00cfe8',140); draw(telemetry.map(p=>p.accuracy),'#9d4edd',100);
  }, [telemetry]);
  const weak = Object.values(keyStats).sort((a,b)=>(b.mistakes*100+b.avgDelay)-(a.mistakes*100+a.avgDelay)).slice(0,5);
  return (
    <section className="panel glass reveal">
      <div className="panel-heading"><div><span className="eyebrow">{isAr ? 'التحليلات' : 'ANALYTICS'}</span><h3>{isAr ? 'مؤشرات الأداء' : 'Performance telemetry'}</h3></div><div className="chart-legend"><span><i className="cyan-dot"/>WPM</span><span><i className="purple-dot"/>{isAr ? 'الدقة' : 'Accuracy'}</span></div></div>
      <canvas ref={canvasRef} className="chart" />
      <div className="weak-keys">
        <span className="section-label">{isAr ? 'الحروف البطيئة أو كثيرة الخطأ' : 'SLOW / ERROR-PRONE KEYS'}</span>
        <div className="weak-list">{weak.length ? weak.map(k=><div className="weak-item" key={k.key}><b>{k.key === ' ' ? 'SPACE' : k.key}</b><span>{k.mistakes} {isAr ? 'خطأ' : 'errors'} · {k.avgDelay}ms</span></div>) : <p>{isAr ? 'لا توجد بيانات بعد — ابدأ الكتابة لبناء ملف أدائك.' : 'No data yet — start typing to build your profile.'}</p>}</div>
      </div>
    </section>
  );
}
