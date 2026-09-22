import type { Language, Lesson } from '../types';

const english: Lesson[] = [
  { id: 1, title: 'Home Row Foundations', subtitle: 'Build a relaxed, accurate rhythm.', category: 'Beginner', text: 'asdf jkl; ask fall lad flask salad all dads fall', minWpm: 18, minAccuracy: 90 },
  { id: 2, title: 'Common Words', subtitle: 'Train high-frequency English patterns.', category: 'Beginner', text: 'the quick brown fox jumps over the lazy dog while every bright star moves across the silent sky', minWpm: 24, minAccuracy: 92 },
  { id: 3, title: 'Flow Builder', subtitle: 'Longer sentences with punctuation.', category: 'Intermediate', text: 'Precision grows when calm hands move with purpose, steady timing, and consistent attention to every character.', minWpm: 34, minAccuracy: 94 },
  { id: 4, title: 'Technical Vocabulary', subtitle: 'Practice product and engineering language.', category: 'Intermediate', text: 'interface component render state performance latency analytics keyboard accessibility interaction responsive', minWpm: 42, minAccuracy: 95 },
  { id: 5, title: 'JavaScript Sprint', subtitle: 'Type a realistic code fragment.', category: 'Code Snippets', text: 'const updateScore = (wpm, accuracy) => Math.round(wpm * (accuracy / 100));', minWpm: 46, minAccuracy: 96 },
  { id: 6, title: 'Advanced Cadence', subtitle: 'Maintain speed through varied syntax.', category: 'Advanced', text: 'A great typist does not chase every keystroke; they build a predictable cadence that survives complexity.', minWpm: 58, minAccuracy: 97 },
  { id: 7, title: 'Async Code', subtitle: 'Developer-focused accuracy challenge.', category: 'Code Snippets', text: 'async function loadProfile() { const data = await fetch("/api/profile"); return data.json(); }', minWpm: 62, minAccuracy: 97 },
  { id: 8, title: 'Quote Finale', subtitle: 'A precision-focused final test.', category: 'Famous Quotes', text: 'Success is the sum of small efforts, repeated day in and day out.', minWpm: 70, minAccuracy: 98 }
];

const arabic: Lesson[] = [
  { id: 1, title: 'أساسيات الكتابة', subtitle: 'ابدأ بإيقاع هادئ ودقة عالية.', category: 'Beginner', text: 'هذا تدريب بسيط يساعدك على تحسين سرعة الكتابة ودقتها خطوة بعد خطوة', minWpm: 15, minAccuracy: 90 },
  { id: 2, title: 'كلمات يومية', subtitle: 'تدرب على جمل عربية شائعة.', category: 'Beginner', text: 'اللغة العربية جميلة والكتابة السريعة تحتاج إلى هدوء وتركيز وتكرار مستمر', minWpm: 22, minAccuracy: 92 },
  { id: 3, title: 'إيقاع متوازن', subtitle: 'جمل أطول مع علامات ترقيم.', category: 'Intermediate', text: 'تتحسن الدقة عندما تتحرك الأصابع بثبات، ويصبح الإيقاع أسرع مع الممارسة الذكية.', minWpm: 30, minAccuracy: 94 },
  { id: 4, title: 'مصطلحات تقنية', subtitle: 'مفردات مناسبة للمبرمجين والمصممين.', category: 'Intermediate', text: 'واجهة مستخدم مكون حالة أداء استجابة تحليل لوحة مفاتيح وصول تفاعل تجربة مستخدم', minWpm: 38, minAccuracy: 95 },
  { id: 5, title: 'تحدي الدقة', subtitle: 'ركز على الانتقال بين الكلمات الطويلة.', category: 'Advanced', text: 'المهارة الحقيقية في الكتابة السريعة تأتي من الجمع بين السرعة والدقة والاستمرارية.', minWpm: 46, minAccuracy: 96 },
  { id: 6, title: 'إيقاع متقدم', subtitle: 'اختبر قدرتك على الحفاظ على الاستقرار.', category: 'Advanced', text: 'لا تحاول مطاردة كل حرف؛ ابن إيقاعا ثابتا يجعل أصابعك تتحرك بثقة ووعي.', minWpm: 54, minAccuracy: 97 },
  { id: 7, title: 'تحدي المطور', subtitle: 'مصطلحات تقنية بإيقاع أسرع.', category: 'Code Snippets', text: 'المكون يعرض البيانات بسرعة ويحافظ على حالة التطبيق ويحدث الواجهة بدون تأخير ملحوظ', minWpm: 60, minAccuracy: 97 },
  { id: 8, title: 'المرحلة النهائية', subtitle: 'اختبار شامل للسرعة والدقة.', category: 'Famous Quotes', text: 'النجاح هو حصيلة جهود صغيرة تتكرر كل يوم بإصرار وهدوء.', minWpm: 66, minAccuracy: 98 }
];

export const lessonsByLanguage: Record<Language, Lesson[]> = { en: english, ar: arabic };
