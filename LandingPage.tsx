import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Key, AlertCircle, Crown, Gem } from 'lucide-react';
import { CODE_VIP, CODE_PREMIUM, WHATSAPP } from '../data/content';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (level: 'vip' | 'premium') => void;
  isDark: boolean;
  area: 'vip' | 'premium';
}

const WA_SVG = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function AccessCodeModal({ isOpen, onClose, onSuccess, isDark, area }: Props) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const correct = area === 'vip' ? CODE_VIP : CODE_PREMIUM;
  const isVip = area === 'vip';

  const handleClose = () => { setCode(''); setError(''); setAttempts(0); onClose(); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (code === correct) {
      onSuccess(area);
      setCode('');
      setAttempts(0);
    } else {
      const n = attempts + 1;
      setAttempts(n);
      setError('Código incorreto. Verifique e tente novamente.');
      if (n >= 3) {
        setLocked(true);
        setTimeout(() => { setLocked(false); setAttempts(0); }, 30000);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white'}`}
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className={`p-6 text-white ${isVip ? 'bg-gradient-to-r from-sky-500 to-cyan-600' : 'bg-gradient-to-r from-blue-800 to-indigo-950'}`}>
              <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  {isVip ? <Crown className="w-5 h-5" /> : <Gem className="w-5 h-5" />}
                </div>
                <span className="text-sm font-semibold opacity-80">{isVip ? 'Área VIP' : 'Área Premium'}</span>
              </div>
              <h3 className="text-2xl font-bold">Código de Acesso</h3>
              <p className="text-sm opacity-80 mt-1">{isVip ? 'Conteúdo VIP — R$ 30,90' : 'Plano corrida 0 aos 5km — R$ 40,90'}</p>
            </div>

            <div className="p-6 space-y-5">
              {locked ? (
                <div className="py-8 text-center">
                  <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
                  <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Acesso bloqueado temporariamente</p>
                  <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Aguarde 30 segundos e tente novamente.</p>
                </div>
              ) : (
                <>
                  {/* WhatsApp box */}
                  <div className={`rounded-xl p-4 border-2 border-dashed ${isDark ? 'bg-emerald-900/20 border-emerald-600/30' : 'bg-emerald-50 border-emerald-300'}`}>
                    <p className={`text-xs font-bold mb-1 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>📱 Ainda não tem o código?</p>
                    <p className={`text-xs mb-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Realize o pagamento pelo WhatsApp e receba o código na hora!</p>
                    <a href={`https://wa.me/${WHATSAPP}?text=Olá!%20Quero%20adquirir%20o%20acesso%20${isVip ? 'VIP' : 'Premium'}%20do%20TransformaVida`}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 cursor-pointer">
                      {WA_SVG} (21) 97463-3380
                    </a>
                  </div>

                  {/* Code input */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Key className="w-4 h-4 inline mr-1" /> Digite o código de 4 dígitos
                      </label>
                      <input type="password" inputMode="numeric" maxLength={4} value={code}
                        onChange={e => setCode(e.target.value.replace(/\D/g, ''))} placeholder="• • • •" autoFocus
                        className={`w-full px-4 py-4 text-center text-3xl font-mono tracking-[0.8em] rounded-xl border-2 outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white focus:border-sky-400' : 'bg-white border-slate-200 text-slate-900 focus:border-sky-400'}`} />
                      <div className="flex justify-center gap-2 mt-2">
                        {[0,1,2,3].map(i => (
                          <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < code.length ? (isVip ? 'bg-sky-400' : 'bg-blue-700') : isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                    {error && (
                      <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-rose-500">
                        <AlertCircle className="w-4 h-4" /> {error}
                      </motion.p>
                    )}
                    {attempts > 0 && !locked && (
                      <p className={`text-xs text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        {3 - attempts} tentativa(s) restante(s)
                      </p>
                    )}
                    <button type="submit" disabled={code.length !== 4}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 font-bold rounded-xl transition-all cursor-pointer ${code.length === 4 ? (isVip ? 'bg-sky-400 hover:bg-sky-500 text-white shadow-lg' : 'bg-gradient-to-r from-blue-800 to-indigo-950 text-white shadow-lg') : isDark ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                      <Lock className="w-4 h-4" /> Acessar {isVip ? 'VIP' : 'Premium'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
