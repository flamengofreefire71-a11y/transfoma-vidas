import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Eye, Crown, Gem, HelpCircle, AlertTriangle,
  CheckCircle, Star, Zap, Lightbulb, ChevronDown,
} from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import BibleVerse from './BibleVerse';
import WhatsAppButton from './WhatsAppButton';
import { testimonials, secretTruths, PRICE_VIP, PRICE_PREMIUM, WHATSAPP } from '../data/content';

interface Props {
  isDark: boolean;
  onToggleDark: () => void;
  onOpenPayment: () => void;
  onOpenCode: (area: 'vip' | 'premium') => void;
}

const WA_SVG = <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;

export default function LandingPage({ isDark, onToggleDark, onOpenPayment, onOpenCode }: Props) {
  const [warn, setWarn] = useState(true);

  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const bg = isDark ? 'bg-slate-950' : 'bg-white';
  const text = isDark ? 'text-white' : 'text-slate-900';
  const sub = isDark ? 'text-slate-400' : 'text-slate-500';
  const card = isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm';

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>

      {/* Navbar */}
      <nav className={`fixed top-0 inset-x-0 z-40 h-16 flex items-center border-b backdrop-blur-lg transition-colors ${isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-100'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className={`font-extrabold text-lg ${text}`}>TransformaVida</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => scroll('planos')} className={`hidden sm:block text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}>Ver planos</button>
            <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className={`relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 text-center overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
        <div className="absolute top-24 left-10 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 ${isDark ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
            <Eye className="w-4 h-4" /> Coisas que a internet não quer que você saiba...
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 ${text}`}>
            O Segredo do{' '}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">Emagrecimento</span>
            {' '}que Ninguém Te Conta
          </h1>

          <p className={`text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto ${sub}`}>
            A indústria do fitness lucra bilhões com sua frustração. Descubra como transformar seu corpo de forma definitiva — sem dietas malucas, sem remédios perigosos.
          </p>

          {/* 3 main buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-6">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => onOpenCode('vip')}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-sky-400 text-white font-bold text-base rounded-2xl shadow-xl shadow-sky-400/25 hover:bg-sky-500 transition-colors cursor-pointer">
              <Crown className="w-5 h-5" /> VIP — {PRICE_VIP}
            </motion.button>

            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={onOpenPayment}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-blue-800 to-indigo-950 text-white font-bold text-base rounded-2xl shadow-xl shadow-blue-900/25 hover:opacity-90 transition-opacity cursor-pointer">
              <Gem className="w-5 h-5" /> Premium — {PRICE_PREMIUM}
            </motion.button>

            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => scroll('como-funciona')}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-cyan-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-cyan-500/20 hover:bg-cyan-600 transition-colors cursor-pointer">
              <HelpCircle className="w-5 h-5" /> Como Funciona
            </motion.button>
          </div>

          <p className={`text-sm ${sub}`}>Pagamento único • Acesso vitalício • Fale pelo WhatsApp: <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-500 hover:underline">(21) 97463-3380</a></p>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-12 cursor-pointer" onClick={() => scroll('aviso')}>
          <ChevronDown className={`w-8 h-8 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
        </motion.div>
      </section>

      {/* WARNING */}
      <AnimatePresence>
        {warn && (
          <motion.section id="aviso" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <div className={`relative rounded-2xl border-2 p-6 sm:p-8 ${isDark ? 'bg-amber-950/20 border-amber-700/40' : 'bg-amber-50 border-amber-300'}`}>
              <button onClick={() => setWarn(false)} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 cursor-pointer text-amber-500 text-xl font-bold">×</button>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-amber-500/20' : 'bg-amber-200'}`}>
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className={`text-lg font-extrabold mb-2 ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>⚠️ AVISO IMPORTANTE — Leia antes de continuar</h3>
                  <p className={`leading-relaxed text-sm sm:text-base ${isDark ? 'text-amber-100/80' : 'text-amber-700'}`}>
                    Este programa <strong>NÃO é mágica</strong>. Se você não se esforçar, não seguir as orientações e não tiver disciplina, <strong>não vai funcionar</strong>. Resultados dependem 100% da sua dedicação. Se você busca solução rápida sem esforço, <strong>este programa não é para você</strong>.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* BIBLE VERSE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <BibleVerse isDark={isDark} />
      </section>

      {/* SECRETS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4 ${isDark ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
            <Eye className="w-4 h-4" /> Segredos que escondem de você
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-3 ${text}`}>O Que Você Vai Descobrir</h2>
          <p className={`max-w-xl mx-auto ${sub}`}>Informações que a indústria do emagrecimento prefere que você não saiba</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {secretTruths.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-6 border ${card}`}>
              <div className="text-3xl mb-3">{s.emoji}</div>
              <h3 className={`text-lg font-bold mb-2 ${text}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed ${sub}`}>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className={`py-14 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4 bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
              <HelpCircle className="w-4 h-4" /> Passo a passo
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold mb-3 ${text}`}>Como Funciona</h2>
            <p className={`max-w-lg mx-auto ${sub}`}>Em 3 passos simples você já está dentro do programa</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { n: '1', title: 'Escolha o plano', text: 'Clique em VIP ou Premium conforme o que deseja acessar. VIP para emagrecimento, Premium para emagrecimento + plano de corrida 0 aos 5km.', icon: <HelpCircle className="w-6 h-6" /> },
              { n: '2', title: 'Pague pelo WhatsApp', text: 'Entre em contato pelo (21) 97463-3380, confirme o pagamento e receba seu código de acesso imediatamente.', icon: <Zap className="w-6 h-6" /> },
              { n: '3', title: 'Acesse e transforme', text: 'Use o código para entrar na sua área e comece o programa completo com treinos, cardápio, dicas e incentivos.', icon: <Lightbulb className="w-6 h-6" /> },
            ].map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 border ${card}`}>
                <div className="w-12 h-12 rounded-xl bg-cyan-500 text-white font-extrabold text-lg flex items-center justify-center mb-4">{s.n}</div>
                <h3 className={`font-bold mb-2 ${text}`}>{s.title}</h3>
                <p className={`text-sm leading-relaxed ${sub}`}>{s.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Plans comparison */}
          <div id="planos">
            <h3 className={`text-2xl font-bold text-center mb-6 ${text}`}>VIP vs Premium — Qual é para você?</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* VIP */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className={`rounded-2xl p-6 border-2 ${isDark ? 'bg-slate-950 border-sky-400/30' : 'bg-white border-sky-300'}`}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-400/10 flex items-center justify-center">
                      <Crown className="w-6 h-6 text-sky-500" />
                    </div>
                    <div>
                      <h4 className={`text-xl font-extrabold ${text}`}>VIP</h4>
                      <p className={`text-xs ${sub}`}>Para começar o emagrecimento</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-sky-500">{PRICE_VIP}</p>
                    <p className={`text-xs ${sub}`}>pagamento único</p>
                  </div>
                </div>
                {['Como emagrecer com 8 dicas científicas','Cardápio do dia com calorias','Versículos bíblicos motivacionais','Notificações de incentivo diárias','Rastreador de água','Lembretes saudáveis diários','Acesso vitalício'].map(it => (
                  <div key={it} className="flex items-start gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{it}</span>
                  </div>
                ))}
                <button onClick={() => onOpenCode('vip')} className="w-full mt-5 flex items-center justify-center gap-2 py-3.5 bg-sky-400 text-white font-bold rounded-xl hover:bg-sky-500 transition-colors cursor-pointer">
                  <Crown className="w-4 h-4" /> Entrar no VIP — {PRICE_VIP}
                </button>
              </motion.div>

              {/* Premium */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className={`relative rounded-2xl p-6 border-2 ${isDark ? 'bg-slate-950 border-blue-700/50' : 'bg-white border-blue-400'}`}>
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-blue-800 text-white text-xs font-bold">⭐ Mais completo</div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-800/10 flex items-center justify-center">
                      <Gem className="w-6 h-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className={`text-xl font-extrabold ${text}`}>Premium</h4>
                      <p className={`text-xs ${sub}`}>Emagrecimento + Corrida 5km</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-blue-700">{PRICE_PREMIUM}</p>
                    <p className={`text-xs ${sub}`}>pagamento único</p>
                  </div>
                </div>
                {['Tudo que está no VIP','Plano de corrida DO ZERO AOS 5KM','8 semanas com cronograma diário','Progresso visual dos treinos','Técnica de corrida e prevenção de lesões','Checklist interativo por semana','Acesso vitalício'].map(it => (
                  <div key={it} className="flex items-start gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{it}</span>
                  </div>
                ))}
                <button onClick={onOpenPayment} className="w-full mt-5 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-800 to-indigo-950 text-white font-bold rounded-xl cursor-pointer hover:opacity-90 transition-opacity shadow-lg shadow-blue-900/20">
                  <Gem className="w-4 h-4" /> Entrar no Premium — {PRICE_PREMIUM}
                </button>
              </motion.div>
            </div>

            {/* WhatsApp row */}
            <div className={`mt-5 p-5 rounded-2xl border text-center ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'}`}>

              <a href={`https://wa.me/${WHATSAPP}?text=Olá!%20Quero%20adquirir%20um%20plano%20do%20TransformaVida`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 cursor-pointer">
                {WA_SVG} Falar no WhatsApp — (21) 97463-3380
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-3 ${text}`}>Histórias Reais de Transformação</h2>
          <p className={sub}>Pessoas que decidiram mudar e mudaram de verdade</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-6 border ${card}`}>
              <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-bold text-sm ${text}`}>{t.name}</p>
                  <p className={`text-xs ${sub}`}>{t.age} anos</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-extrabold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>-{t.lost}</p>
                  <p className={`text-xs ${sub}`}>em {t.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`py-16 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${text}`}>Sua Transformação Começa Agora</h2>
            <p className={`text-lg mb-8 max-w-xl mx-auto ${sub}`}>Não deixe para amanhã o corpo que você pode começar a construir hoje. Invista em você.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button onClick={() => onOpenCode('vip')} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-400 text-white font-bold rounded-2xl shadow-lg shadow-sky-400/25 hover:bg-sky-500 transition-colors cursor-pointer">
                <Crown className="w-5 h-5" /> VIP — {PRICE_VIP}
              </button>
              <button onClick={onOpenPayment} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-800 to-indigo-950 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/25 hover:opacity-90 cursor-pointer">
                <Gem className="w-5 h-5" /> Premium — {PRICE_PREMIUM}
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {['Acesso Vitalício','Garantia 7 Dias','Pagamento Seguro','Código via WhatsApp'].map(t2 => (
                <div key={t2} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> {t2}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ALREADY HAVE CODE */}
      <section className={`py-10 border-t ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h3 className={`text-xl font-bold mb-4 ${text}`}>Já tem seu código de acesso?</h3>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => onOpenCode('vip')} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-400 text-white font-bold rounded-xl hover:bg-sky-500 cursor-pointer">
              <Crown className="w-4 h-4" /> Acessar VIP
            </button>
            <button onClick={() => onOpenCode('premium')} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 cursor-pointer">
              <Gem className="w-4 h-4" /> Acessar Premium
            </button>
            <button onClick={() => scroll('como-funciona')} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 cursor-pointer">
              <HelpCircle className="w-4 h-4" /> Como Funciona
            </button>
          </div>
          <p className={`text-xs mt-4 ${sub}`}>Contato para pagamento e suporte: <strong className="text-emerald-500">(21) 97463-3380</strong></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-100 bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <p className={`font-bold mb-2 ${text}`}>📞 Contato & Pagamento</p>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="text-emerald-500 font-bold hover:underline">(21) 97463-3380</a>
              <p className={`text-xs mt-1 ${sub}`}>WhatsApp — atendimento rápido</p>
            </div>
            <div>
              <p className={`font-bold mb-2 ${text}`}>⏰ Atendimento</p>
              <p className={`text-sm ${sub}`}>Seg — Sex: 8h às 18h</p>
              <p className={`text-sm ${sub}`}>Sábado: 9h às 13h</p>
            </div>
            <div>
              <p className={`font-bold mb-2 ${text}`}>💬 Dúvidas?</p>
              <p className={`text-sm ${sub}`}>Entre em contato pelo WhatsApp para adquirir seu acesso ou tirar dúvidas.</p>
            </div>
          </div>
          <div className={`border-t pt-6 text-center ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <p className={`text-sm ${sub}`}>TransformaVida &copy; {new Date().getFullYear()} — Todos os direitos reservados.</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>Este programa não substitui acompanhamento médico. Consulte um profissional antes de iniciar atividades físicas.</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
