import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Gem, Lock, Key, Camera } from 'lucide-react';
import { PRICE_PREMIUM, WHATSAPP, CODE_VIP, CODE_PREMIUM } from '../data/content';

const WA_SVG = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

interface Props { isOpen: boolean; onClose: () => void; onSuccess: () => void; isDark: boolean; }

export default function PaymentModal({ isOpen, onClose, onSuccess, isDark }: Props) {
  const [step, setStep] = useState<'info' | 'waitKey'>('info');
  const [inputKey, setInputKey] = useState('');
  const [keyError, setKeyError] = useState('');
  const handleClose = () => {
    setStep('info');
    setInputKey('');
    setKeyError('');
    onClose();
  };

  const handleGoToWhatsApp = () => {
    // Open WhatsApp in a new tab after a short delay so the user sees the warning
    setTimeout(() => {
      window.open(
        `https://wa.me/${WHATSAPP}?text=Olá!%20Quero%20adquirir%20o%20acesso%20Premium%20do%20TransformaVida%20por%20${PRICE_PREMIUM}`,
        '_blank'
      );
    }, 2000);
    setStep('waitKey');
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyError('');
    if (inputKey.length !== 4) {
      setKeyError('O código deve ter 4 dígitos');
      return;
    }
    if (inputKey === CODE_VIP || inputKey === CODE_PREMIUM) {
      onSuccess();
      setInputKey('');
      setStep('info');
    } else {
      setKeyError('Código inválido. Verifique e tente novamente.');
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
            <div className="bg-gradient-to-r from-blue-800 to-indigo-950 p-6 text-white">
              <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"><Gem className="w-5 h-5" /></div>
                <span className="text-sm font-semibold opacity-80">Acesso Premium</span>
              </div>
              <h3 className="text-2xl font-bold">
                {step === 'info' ? 'Complete seu Acesso' : 'Já pagou? Insira a chave'}
              </h3>
              <p className="text-sm opacity-80 mt-1">Plano de corrida 0 aos 5km + todo o conteúdo</p>
            </div>

            <div className="p-6">
              {step === 'info' ? (
                <div className="space-y-5">
                  {/* Benefits */}
                  <div className={`rounded-xl p-4 space-y-2.5 ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                    <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>✅ Você vai receber:</p>
                    {['Plano de corrida completo 0 aos 5km (8 semanas)','Cardápio diário com calorias detalhadas','8 dicas científicas de emagrecimento','Versículos bíblicos motivacionais','Notificações de incentivo diárias','Controle de água e lembretes','Acesso vitalício'].map(it => (
                      <div key={it} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{it}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Investimento total:</span>
                    <span className="text-2xl font-extrabold text-blue-700">{PRICE_PREMIUM}</span>
                  </div>

                  {/* Screenshot Warning */}
                  <div className="rounded-xl p-4 bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-amber-700 mb-1">📸 ANTES DE PAGAR, LEIA:</p>
                        <p className="text-xs text-amber-700 leading-relaxed">
                          Tire um <strong>print do comprovante</strong> de pagamento antes de continuar.
                          Você vai precisar enviar o comprovante no WhatsApp para receber sua chave de acesso.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp payment */}
                  <button onClick={handleGoToWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer shadow-lg shadow-emerald-500/25">
                    {WA_SVG} Pagar via WhatsApp — (21) 97463-3380
                  </button>

                  <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
                    <Lock className="w-3 h-3" /> Pagamento seguro — código enviado via WhatsApp
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Screenshot reminder */}
                  <div className="rounded-xl p-4 bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-amber-700 mb-1">⚠️ Não esqueça!</p>
                        <p className="text-xs text-amber-700 leading-relaxed">
                          Envie o <strong>print do comprovante</strong> no WhatsApp para receber sua chave de acesso.
                          Após receber a chave, digite abaixo para liberar o acesso.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Input */}
                  <form onSubmit={handleKeySubmit} className="space-y-4">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Key className="w-4 h-4 inline mr-1" /> Digite a chave de acesso (4 dígitos)
                      </label>
                      <input
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        value={inputKey}
                        onChange={e => setInputKey(e.target.value.replace(/\D/g, ''))}
                        placeholder="• • • •"
                        autoFocus
                        className={`w-full px-4 py-4 text-center text-3xl font-mono tracking-[0.8em] rounded-xl border-2 outline-none transition-all ${
                          isDark ? 'bg-slate-700 border-slate-600 text-white focus:border-emerald-400' : 'bg-white border-slate-200 text-slate-900 focus:border-emerald-400'
                        }`}
                      />
                      <div className="flex justify-center gap-2 mt-2">
                        {[0, 1, 2, 3].map(i => (
                          <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < inputKey.length ? 'bg-emerald-500' : isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
                        ))}
                      </div>
                    </div>

                    {keyError && (
                      <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-rose-500">
                        <X className="w-4 h-4" /> {keyError}
                      </motion.p>
                    )}

                    <button type="submit" disabled={inputKey.length !== 4}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 font-bold rounded-xl transition-all cursor-pointer ${
                        inputKey.length === 4
                          ? 'bg-gradient-to-r from-blue-800 to-indigo-950 text-white shadow-lg hover:opacity-90'
                          : isDark ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}>
                      <Key className="w-4 h-4" /> Acessar Premium
                    </button>

                    {/* Back to WhatsApp */}
                    <button
                      type="button"
                      onClick={handleGoToWhatsApp}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer shadow-lg shadow-emerald-500/25">
                      {WA_SVG} Falar no WhatsApp — (21) 97463-3380
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
