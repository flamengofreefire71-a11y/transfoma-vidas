import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell } from 'lucide-react';
import { notifications } from '../data/content';

export default function NotificationToast({ isDark }: { isDark: boolean }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => {
      setMsg(notifications[Math.floor(Math.random() * notifications.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 6000);
    };
    const t1 = setTimeout(show, 4000);
    const t2 = setInterval(show, 28000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  return (
    <AnimatePresence>
      {visible && msg && (
        <motion.div initial={{ opacity: 0, x: 120 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 120 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`fixed top-20 right-4 z-50 max-w-xs p-4 rounded-2xl shadow-2xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold mb-0.5 text-emerald-500">Mensagem de incentivo</p>
              <p className="text-sm leading-snug">{msg}</p>
            </div>
            <button onClick={() => setVisible(false)} className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
