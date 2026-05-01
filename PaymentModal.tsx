import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DarkModeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} aria-label="Alternar modo escuro"
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 cursor-pointer ${isDark ? 'bg-blue-600' : 'bg-slate-200'}`}>
      <motion.div className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        animate={{ left: isDark ? 'calc(100% - 28px)' : '4px' }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
        {isDark ? <Moon className="w-3.5 h-3.5 text-blue-600" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
      </motion.div>
    </button>
  );
}
