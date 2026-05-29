/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield } from 'lucide-react';
import { AppView } from '../types';

interface CookieBannerProps {
  onViewChange?: (view: AppView) => void;
}

export default function CookieBanner({ onViewChange }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('alcelone_cookie_consent');
    if (!consent) {
      // Small delaying timeout for premium appearance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('alcelone_cookie_consent', accepted ? 'accepted' : 'declined');
    setIsVisible(false);
  };

  const handleLinkClick = (view: AppView) => {
    if (onViewChange) {
      onViewChange(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-primary-dark/95 text-cream-bg p-6 rounded-lg shadow-2xl z-[5000] border border-white/10 backdrop-blur-md"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-sage-accent/15 flex items-center justify-center text-sage-accent shrink-0 mt-1">
              <Shield size={20} />
            </div>
            
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-semibold text-cream-bg tracking-wide">
                Informativa sui Cookie & Privacy
              </h4>
              <p className="text-xs text-cream-bg/80 leading-relaxed font-light">
                Questo agriturismo utilizza cookie essenziali e analitici per fini tecnici e per garantirvi la migliore esperienza d’uso rurale possibile del nostro sito internet. Maggiori informazioni sono consultabili nella nostra{' '}
                <button
                  onClick={() => handleLinkClick('privacy')}
                  className="underline hover:text-sage-accent cursor-pointer bg-transparent text-xs text-cream-bg font-light"
                >
                  Privacy Policy
                </button>{' '}
                e{' '}
                <button
                  onClick={() => handleLinkClick('cookie')}
                  className="underline hover:text-sage-accent cursor-pointer bg-transparent text-xs text-cream-bg font-light"
                >
                  Cookie Policy
                </button>
                .
              </p>
              
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleConsent(true)}
                  className="px-4 py-1.5 bg-sage-accent text-primary-dark font-sans font-semibold text-[11px] uppercase tracking-wider rounded cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Accetta tutto
                </button>
                <button
                  onClick={() => handleConsent(false)}
                  className="px-4 py-1.5 bg-transparent border border-white/15 hover:border-white/40 text-cream-bg/80 font-sans font-semibold text-[11px] uppercase tracking-wider rounded cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Rifiuta
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
