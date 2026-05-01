import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, LogOut, Home, BookOpen, Footprints, User,
  TrendingDown, Droplets, Moon, ChevronRight, Sparkles,
  MessageCircle, Crown, Gem,
} from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import BibleVerse from './BibleVerse';
import WeightLossContent from './WeightLossContent';
import RunningPlan from './RunningPlan';
import WhatsAppButton from './WhatsAppButton';
import { WHATSAPP } from '../data/content';

interface Props {
  isDark: boolean;
  onToggleDark: () => void;
  onLogout: () => void;
  accessLevel: 'none' | 'vip' | 'premium';
  onUnlock: (area: 'vip' | 'premium') => void;
}

type Tab = 'home' | 'learn' | 'running' | 'profile';

export default function Dashboard({ isDark, onToggleDark, onLogout, accessLevel, onUnlock }: Props) {
  const [tab, setTab] = useState<Tab>('home');
  const [water, setWater] = useState(0);

  const bg = isDark ? 'bg-slate-950' : 'bg-slate-50';
  const text = isDark ? 'text-white' : 'text-slate-900';
  const sub = isDark ? 'text-slate-400' : 'text-slate-500';
  const card = `rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`;

  const tabs: { id: Tab; label: string; Icon: React.ElementType }[] = [
    { id: 'home',    label: 'Início',            Icon: Home },
    { id: 'learn',   label: 'Como Emagrecer',     Icon: BookOpen },
    { id: 'running', label: 'Plano de Corrida',   Icon: Footprints },
    { id: 'profile', label: 'Perfil',             Icon: User },
  ];

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>

      {/* Header */}
      <header className={`sticky top-0 z-30 h-16 flex items-center border-b backdrop-blur-lg ${isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className={`font-extrabold text-lg ${text}`}>TransformaVida</span>
            {accessLevel === 'vip' && (
              <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-sky-400/10 text-sky-500 border border-sky-400/20 rounded-lg">VIP</span>
            )}
            {accessLevel === 'premium' && (
              <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-blue-700/10 text-blue-600 border border-blue-700/20 rounded-lg">PREMIUM</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />
            <button onClick={onLogout} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <aside className="lg:w-60 shrink-0 space-y-4">
            <nav className={`${card} p-2 lg:sticky lg:top-24`}>
              {tabs.map(({ id, label, Icon }) => {
                const active = tab === id;
                return (
                  <button key={id} onClick={() => setTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer mb-1 last:mb-0 ${active ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lg' : isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                    <Icon className="w-5 h-5" />
                    {label}
                    {id === 'running' && accessLevel !== 'premium' && (
                      <span className="ml-auto text-xs bg-amber-500 text-white px-1.5 py-0.5 rounded-md">PRO</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Water tracker */}
            <div className={card + ' p-5'}>
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="w-5 h-5 text-sky-500" />
                <span className={`font-bold text-sm ${text}`}>Água Hoje</span>
                <span className={`ml-auto text-xs font-semibold ${water >= 8 ? 'text-emerald-500' : sub}`}>{water}/8</span>
              </div>
              <div className="flex gap-1.5 flex-wrap mb-3">
                {[...Array(8)].map((_, i) => (
                  <motion.div key={i} animate={{ scale: i < water ? 1 : 0.88 }}
                    className={`w-7 h-10 rounded-lg border-2 transition-colors ${i < water ? 'bg-sky-400 border-sky-400' : isDark ? 'border-slate-700' : 'border-slate-200'}`} />
                ))}
              </div>
              <button onClick={() => setWater(p => Math.min(p + 1, 8))} disabled={water >= 8}
                className="w-full py-2 text-sm font-bold bg-sky-400 text-white rounded-xl hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors">
                + 1 Copo
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {tab === 'home' && (
                <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
                  {/* Welcome */}
                  <div className={`${card} p-6 sm:p-8 bg-gradient-to-br ${isDark ? 'from-slate-900 to-slate-800' : 'from-sky-50 to-blue-50'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className={`text-2xl font-extrabold mb-2 ${text}`}>Bem-vindo! 💪</h2>
                        <p className={sub}>Cada dia é uma nova chance de se tornar a melhor versão de você.</p>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center shrink-0">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {accessLevel === 'vip' && <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-sky-400 text-white rounded-lg"><Crown className="w-3 h-3" />Membro VIP</span>}
                      {accessLevel === 'premium' && <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-lg"><Gem className="w-3 h-3" />Membro Premium</span>}
                    </div>
                  </div>

                  <BibleVerse isDark={isDark} />

                  {/* Quick actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'learn' as Tab, Icon: TrendingDown, color: 'text-emerald-500 bg-emerald-500/10', title: 'Como Emagrecer', desc: '8 princípios científicos' },
                      { id: 'running' as Tab, Icon: Footprints, color: 'text-orange-500 bg-orange-500/10', title: 'Plano de Corrida', desc: accessLevel === 'premium' ? 'Do zero aos 5km' : 'Acesso Premium' },
                    ].map(a => (
                      <button key={a.id} onClick={() => setTab(a.id)}
                        className={`group text-left ${card} p-5 transition-all cursor-pointer hover:shadow-md`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center`}><a.Icon className="w-5 h-5" /></div>
                          <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${sub}`} />
                        </div>
                        <p className={`font-bold mb-1 ${text}`}>{a.title}</p>
                        <p className={`text-sm ${sub}`}>{a.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Reminders */}
                  <div className={card + ' p-5'}>
                    <h3 className={`font-bold mb-4 ${text}`}>☀️ Lembretes do Dia</h3>
                    <div className="space-y-3">
                      {[
                        { Icon: Droplets, text: 'Beba pelo menos 2,5 litros de água hoje', done: water >= 5 },
                        { Icon: Moon, text: 'Durma 7 a 9 horas esta noite', done: false },
                        { Icon: TrendingDown, text: 'Evite açúcar refinado nas refeições', done: false },
                      ].map((r, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.done ? 'bg-emerald-500/10' : isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            <r.Icon className={`w-4 h-4 ${r.done ? 'text-emerald-500' : sub}`} />
                          </div>
                          <span className={`text-sm ${r.done ? 'line-through opacity-40' : ''} ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{r.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {tab === 'learn' && (
                <motion.div key="learn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <WeightLossContent isDark={isDark} />
                </motion.div>
              )}

              {tab === 'running' && (
                <motion.div key="running" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <RunningPlan isDark={isDark} accessLevel={accessLevel} onUnlock={onUnlock} />
                </motion.div>
              )}

              {tab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
                  <div className={`${card} p-6 text-center`}>
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold ${text}`}>{accessLevel === 'premium' ? 'Membro Premium' : 'Membro VIP'}</h3>
                    <p className={`text-sm mt-1 ${sub}`}>Acesso vitalício ao programa completo</p>
                    <div className="flex justify-center gap-4 mt-4">
                      <div className={`px-4 py-2 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                        <p className={`text-base font-bold ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>{accessLevel === 'premium' ? 'R$ 40,90' : 'R$ 30,90'}</p>
                        <p className={`text-xs ${sub}`}>Investimento</p>
                      </div>
                      <div className={`px-4 py-2 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                        <p className={`text-base font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Vitalício</p>
                        <p className={`text-xs ${sub}`}>Validade</p>
                      </div>
                    </div>
                  </div>

                  <div className={card + ' p-5'}>
                    <h3 className={`font-bold mb-4 ${text}`}>Configurações</h3>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Modo Escuro</span>
                      <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />
                    </div>
                  </div>

                  <div className={`${card} p-5 ${isDark ? 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border-emerald-700/30' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'}`}>
                    <h3 className={`font-bold mb-2 ${text}`}>📞 Suporte & Contato</h3>
                    <p className={`text-sm mb-4 ${sub}`}>Dúvidas, suporte ou upgrade de plano? Fale conosco.</p>
                    <a href={`https://wa.me/${WHATSAPP}?text=Olá!%20Preciso%20de%20ajuda%20com%20o%20TransformaVida`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer">
                      <MessageCircle className="w-5 h-5" /> (21) 97463-3380
                    </a>
                  </div>

                  <button onClick={onLogout} className="w-full py-3.5 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition-colors cursor-pointer flex items-center justify-center gap-2">
                    <LogOut className="w-5 h-5" /> Sair da Conta
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}
