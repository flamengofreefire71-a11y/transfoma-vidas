import { motion } from 'framer-motion';
import { weightLossTips, mealPlan } from '../data/content';

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-500',
  orange: 'bg-orange-500/10 text-orange-500',
  purple: 'bg-purple-500/10 text-purple-500',
  red: 'bg-red-500/10 text-red-500',
  teal: 'bg-teal-500/10 text-teal-500',
  pink: 'bg-pink-500/10 text-pink-500',
  green: 'bg-green-500/10 text-green-500',
  emerald: 'bg-emerald-500/10 text-emerald-500',
};

export default function WeightLossContent({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Como Emagrecer de Verdade</h2>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>8 princípios que funcionam de verdade — sem enganação</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {weightLossTips.map((tip, i) => (
          <motion.div key={tip.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className={`rounded-2xl p-5 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl ${colorMap[tip.color]}`}>
                {tip.emoji}
              </div>
              <div>
                <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{tip.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{tip.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cardápio */}
      <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
        <div className={`px-6 py-4 border-b flex items-center gap-3 ${isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-slate-50'}`}>
          <span className="text-xl">🍽️</span>
          <div>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Cardápio do Dia</p>
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>≈ 1.720 kcal — equilibrado e saudável</p>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {mealPlan.map((m) => (
            <div key={m.meal} className={`flex items-start justify-between px-6 py-4 gap-4 ${isDark ? 'divide-slate-800 hover:bg-slate-800/40' : 'divide-slate-100 hover:bg-slate-50'} transition-colors`}>
              <div className="flex items-start gap-3">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg mt-0.5 shrink-0 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{m.time}</span>
                <div>
                  <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{m.meal}</p>
                  <ul className="space-y-0.5">
                    {m.items.map(it => (
                      <li key={it} className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>• {it}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <span className={`text-sm font-bold shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{m.kcal} kcal</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Calorias/dia', value: '1.720 kcal', emoji: '🔥', c: 'orange' },
          { label: 'Proteínas', value: '30% do total', emoji: '💪', c: 'blue' },
          { label: 'Água por dia', value: '2,5 litros', emoji: '💧', c: 'sky' },
          { label: 'Refeições', value: '5 a 6 por dia', emoji: '🕐', c: 'purple' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl p-4 text-center border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="text-2xl mb-1">{s.emoji}</div>
            <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.value}</p>
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
