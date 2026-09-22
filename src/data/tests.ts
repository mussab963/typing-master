import type { Language, PracticeText, TestDifficulty } from '../types';

const english: PracticeText[] = [
  { id:'en-flow-1', difficulty:'flow', title:'Quiet Momentum', text:'Small improvements become powerful when they are repeated with patience. Keep your shoulders relaxed, look ahead, and let each word arrive at a steady pace.' },
  { id:'en-flow-2', difficulty:'flow', title:'Creative Focus', text:'A clear desk, a calm mind, and a simple goal can turn ten focused minutes into meaningful progress. Speed grows naturally when rhythm feels effortless.' },
  { id:'en-flow-3', difficulty:'flow', title:'Morning Practice', text:'The first few lines are not about records. They are about finding your rhythm, waking up your fingers, and building confidence one accurate word at a time.' },
  { id:'en-flow-4', difficulty:'flow', title:'Smooth Cadence', text:'Great typing feels less like chasing keys and more like following music. Breathe, trust the pattern, and keep your hands moving with a light touch.' },
  { id:'en-focus-1', difficulty:'focus', title:'Digital Craft', text:'Design systems become stronger when spacing, hierarchy, accessibility, and motion work together. Consistency turns individual components into a coherent product experience.' },
  { id:'en-focus-2', difficulty:'focus', title:'Product Thinking', text:'A useful product solves a real problem, removes unnecessary friction, and gives people clear feedback. Every interaction should feel intentional rather than accidental.' },
  { id:'en-focus-3', difficulty:'focus', title:'Deep Work', text:'Protecting attention is a practical skill. Close distractions, define the next action, and spend a short block of time doing one difficult thing exceptionally well.' },
  { id:'en-focus-4', difficulty:'focus', title:'Learning Loop', text:'Practice is most effective when feedback is immediate. Notice the keys that slow you down, correct the pattern, then repeat it until accuracy becomes automatic.' },
  { id:'en-pro-1', difficulty:'pro', title:'Engineering Sprint', text:'At 09:42, the monitoring dashboard reported 99.98% availability; however, the team still reviewed retries, cache misses, and latency spikes before the next release.' },
  { id:'en-pro-2', difficulty:'pro', title:'Precision Protocol', text:'Version 2.7 shipped with 14 fixes, 3 accessibility improvements, and a new keyboard-first workflow. The goal: fewer clicks, clearer states, and predictable shortcuts.' },
  { id:'en-pro-3', difficulty:'pro', title:'Code Mindset', text:'const progress = Math.min(100, Math.round((completed / total) * 100)); // accuracy first, speed second, consistency always.' },
  { id:'en-pro-4', difficulty:'pro', title:'Complex Rhythm', text:'When requirements change mid-sprint, strong teams ask: what changed, why now, who is affected, and which assumption should be tested before implementation begins?' }
];

const arabic: PracticeText[] = [
  { id:'ar-flow-1', difficulty:'flow', title:'إيقاع هادئ', text:'التحسن الحقيقي يبدأ بخطوات صغيرة ومتكررة. حافظ على هدوء يديك، وانظر إلى الكلمات القادمة، ودع السرعة تنمو من الدقة والإيقاع المنتظم.' },
  { id:'ar-flow-2', difficulty:'flow', title:'تركيز بسيط', text:'عندما يكون الهدف واضحا والمكان هادئا تصبح دقائق التدريب القصيرة أكثر فائدة. اكتب براحة، ولا تجعل السرعة تسبق الدقة.' },
  { id:'ar-flow-3', difficulty:'flow', title:'بداية قوية', text:'الأسطر الأولى ليست لتحطيم الأرقام، بل لاكتشاف الإيقاع المناسب وتحريك الأصابع بثقة وبناء عادة كتابة دقيقة كلمة بعد كلمة.' },
  { id:'ar-flow-4', difficulty:'flow', title:'تقدم مستمر', text:'كل جلسة تدريب تمنحك فرصة لفهم أخطائك بشكل أفضل. لاحظ الحروف التي تبطئك، وكررها بهدوء حتى تصبح الحركة طبيعية.' },
  { id:'ar-focus-1', difficulty:'focus', title:'صناعة رقمية', text:'تصبح تجربة المستخدم أقوى عندما تعمل المسافات والتسلسل البصري وسهولة الوصول والحركة معا ضمن نظام واضح ومتناسق.' },
  { id:'ar-focus-2', difficulty:'focus', title:'تفكير المنتج', text:'المنتج الجيد يحل مشكلة حقيقية، ويقلل الخطوات غير الضرورية، ويمنح المستخدم إشارات واضحة بعد كل تفاعل مهم.' },
  { id:'ar-focus-3', difficulty:'focus', title:'عمل عميق', text:'حماية الانتباه مهارة عملية. أغلق مصادر التشتيت، وحدد الخطوة التالية، وامنح مهمة واحدة وقتا قصيرا من التركيز الكامل.' },
  { id:'ar-focus-4', difficulty:'focus', title:'حلقة التعلم', text:'يصبح التدريب أكثر فاعلية عندما تحصل على ملاحظة مباشرة. راقب الحروف البطيئة، صحح الحركة، ثم كررها حتى تصبح الدقة تلقائية.' },
  { id:'ar-pro-1', difficulty:'pro', title:'تحدي الأرقام', text:'في الساعة 09:42 أظهر النظام جاهزية بنسبة 99.98%، لكن الفريق راجع 14 تنبيها و3 حالات تأخير قبل إطلاق النسخة الجديدة.' },
  { id:'ar-pro-2', difficulty:'pro', title:'دقة متقدمة', text:'الإصدار 2.7 تضمن 14 إصلاحا، و3 تحسينات لسهولة الوصول، ومسارا جديدا يعتمد على لوحة المفاتيح لتقليل الخطوات المتكررة.' },
  { id:'ar-pro-3', difficulty:'pro', title:'إيقاع تقني', text:'عندما تتغير المتطلبات أثناء التنفيذ، اسأل: ما الذي تغير؟ ولماذا الآن؟ ومن سيتأثر؟ وما الفرضية التي يجب اختبارها أولا؟' },
  { id:'ar-pro-4', difficulty:'pro', title:'تركيز احترافي', text:'السرعة العالية وحدها لا تكفي؛ الأداء القوي يجمع بين دقة تتجاوز 97%، وإيقاع ثابت، وقدرة على تصحيح الأخطاء بدون فقدان التركيز.' }
];

export const testBank: Record<Language, PracticeText[]> = { en: english, ar: arabic };

export function createFreshTest(language: Language, difficulty: TestDifficulty, duration: number, previousId?: string) {
  const pool = testBank[language].filter(item => item.difficulty === difficulty);
  const shuffled = [...pool].sort(() => Math.random() - .5);
  if (previousId && shuffled[0]?.id === previousId && shuffled.length > 1) [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  const blocks = duration <= 15 ? 2 : duration <= 30 ? 3 : duration <= 60 ? 5 : 8;
  const selected = Array.from({ length: blocks }, (_, index) => shuffled[index % shuffled.length]);
  return {
    id: selected.map(item => item.id).join('|'),
    title: selected[0].title,
    text: selected.map(item => item.text).join(' ')
  };
}
