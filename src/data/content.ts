import type { Language } from '../types';

export const tips: Record<Language, string[]> = {
  en: [
    'Prioritize 97%+ accuracy before pushing your speed ceiling.',
    'Keep your wrists neutral and let your fingers do the movement.',
    'Read one or two words ahead instead of staring at the current character.',
    'Short daily sessions usually beat one exhausting weekly session.',
    'When one key keeps causing errors, slow down and retrain that exact motion.',
    'Use Backspace deliberately. Fast correction is part of real-world typing skill.'
  ],
  ar: [
    'اجعل هدفك الأول دقة 97% أو أكثر قبل مطاردة رقم سرعة أعلى.',
    'حافظ على المعصمين بوضع مريح واترك الحركة الأساسية للأصابع.',
    'حاول قراءة كلمة أو كلمتين إلى الأمام بدلا من مراقبة الحرف الحالي فقط.',
    'جلسات قصيرة يومية غالبا أفضل من جلسة طويلة ومتعبة مرة واحدة في الأسبوع.',
    'إذا تكرر الخطأ في حرف واحد، خفف السرعة ودرب الحركة نفسها بشكل مقصود.',
    'استخدم زر الحذف بوعي؛ التصحيح السريع جزء مهم من مهارة الكتابة الحقيقية.'
  ]
};

export function coachMessage(language: Language, wpm: number, accuracy: number) {
  if (language === 'ar') {
    if (accuracy < 90) return 'خفف السرعة قليلا. عندما تستقر الدقة ستلاحظ أن السرعة ترتفع وحدها.';
    if (accuracy >= 98 && wpm >= 60) return 'أداء قوي جدا. حافظ على هذا الإيقاع وابدأ برفع سقف السرعة تدريجيا.';
    if (accuracy >= 96) return 'دقتك ممتازة. حاول الآن زيادة السرعة بنسبة بسيطة بدون كسر الإيقاع.';
    return 'أنت تبني أساسا جيدا. ركز على الانتقالات بين الكلمات وحافظ على تنفس هادئ.';
  }
  if (accuracy < 90) return 'Ease off the throttle. Stabilize accuracy first and your speed will follow.';
  if (accuracy >= 98 && wpm >= 60) return 'Excellent control. Keep this rhythm and raise your speed ceiling gradually.';
  if (accuracy >= 96) return 'Your accuracy is strong. Add a little speed without sacrificing cadence.';
  return 'You are building a solid base. Focus on word transitions and keep your hands relaxed.';
}

export function motivation(language: Language, seed = 0) {
  const lines = language === 'ar'
    ? ['كل ضغطة دقيقة تبني سرعة الغد.', 'الثبات يصنع السرعة، وليس الاستعجال.', 'رقمك القادم يبدأ من هذه الجلسة.', 'لا تحتاج للكمال؛ تحتاج للتكرار الذكي.', 'اكتب بهدوء، وتقدم بثقة.']
    : ['Every accurate keystroke builds tomorrow’s speed.', 'Consistency creates speed. Rushing does not.', 'Your next personal best starts with this session.', 'You do not need perfection. You need smart repetition.', 'Type calmly. Improve boldly.'];
  return lines[Math.abs(seed) % lines.length];
}
