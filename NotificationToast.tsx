import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, RefreshCw } from 'lucide-react';
import { bibleVerses } from '../data/content';

export default function BibleVerse({ isDark }: { isDark: boolean }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % bibleVerses.length), 12000);
    return () => clearInterval(t);
  }, []);

  const v = bibleVerses[idx];

  return (
    <div className={`rounded-2xl p-6 border ${isDark ? 'bg-gradient-to-br from-amber-950/30 to-yellow-950/20 border-amber-700/30' : 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200'}`}>
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
          <BookOpen className="w-5 h-5 text-amber-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">✝️ Palavra do Dia</p>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <p className={`text-base font-medium italic leading-relaxed mb-2 ${isDark ? 'text-amber-100' : 'text-slate-700'}`}>
                &ldquo;{v.verse}&rdquo;
              </p>
              <p className="text-sm font-bold text-amber-500">{v.ref}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={() => setIdx(p => (p + 1) % bibleVerses.length)} className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-amber-100 text-slate-400'}`}>
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
