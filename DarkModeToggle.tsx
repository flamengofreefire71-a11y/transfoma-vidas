import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import PaymentModal from './components/PaymentModal';
import AccessCodeModal from './components/AccessCodeModal';
import NotificationToast from './components/NotificationToast';

type Level = 'none' | 'vip' | 'premium';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [access, setAccess] = useState<Level>('none');
  const [showPayment, setShowPayment] = useState(false);
  const [codeModal, setCodeModal] = useState<{ open: boolean; area: 'vip' | 'premium' }>({ open: false, area: 'premium' });

  useEffect(() => {
    const d = localStorage.getItem('tv-dark');
    if (d) setIsDark(d === 'true');
    const a = localStorage.getItem('tv-access') as Level | null;
    if (a && a !== 'none') { setAccess(a); setLoggedIn(true); }
  }, []);

  useEffect(() => {
    localStorage.setItem('tv-dark', String(isDark));
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('tv-access', access);
  }, [access]);

  const handlePaySuccess = () => { setAccess('premium'); setLoggedIn(true); setShowPayment(false); };
  const handleCodeSuccess = (level: 'vip' | 'premium') => { setAccess(level); setLoggedIn(true); setCodeModal({ open: false, area: 'premium' }); };
  const handleLogout = () => { setLoggedIn(false); setAccess('none'); localStorage.removeItem('tv-access'); };
  const handleUnlock = (area: 'vip' | 'premium') => setCodeModal({ open: true, area });

  return (
    <div>
      <AnimatePresence mode="wait">
        {!loggedIn ? (
          <motion.div key="land" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <LandingPage
              isDark={isDark}
              onToggleDark={() => setIsDark(p => !p)}
              onOpenPayment={() => setShowPayment(true)}
              onOpenCode={(area) => setCodeModal({ open: true, area })}
            />
          </motion.div>
        ) : (
          <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Dashboard
              isDark={isDark}
              onToggleDark={() => setIsDark(p => !p)}
              onLogout={handleLogout}
              accessLevel={access}
              onUnlock={handleUnlock}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} onSuccess={handlePaySuccess} isDark={isDark} />
      <AccessCodeModal isOpen={codeModal.open} onClose={() => setCodeModal({ open: false, area: 'premium' })} onSuccess={handleCodeSuccess} isDark={isDark} area={codeModal.area} />
      {loggedIn && <NotificationToast isDark={isDark} />}
    </div>
  );
}
