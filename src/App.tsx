/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CucinaView from './components/CucinaView';
import CamereView from './components/CamereView';
import ContattiView from './components/ContattiView';
import PrivacyView from './components/PrivacyView';
import CookieView from './components/CookieView';
import CookieBanner from './components/CookieBanner';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');

  // Monitor browser address hash changes to support direct deep linking (e.g. #cucina)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppView;
      const validViews: AppView[] = ['home', 'cucina', 'camere', 'contatti', 'privacy', 'cookie'];
      if (validViews.includes(hash)) {
        setCurrentView(hash);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check on load
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    // Sync browser hash silently without reload
    window.location.hash = view;
  };

  const handleTableBookingClick = () => {
    const scrollToSection = () => {
      let attempts = 0;
      const interval = setInterval(() => {
        const bookingSection = document.getElementById('booking-section');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          clearInterval(interval);
        }
        attempts++;
        if (attempts >= 15) {
          clearInterval(interval);
        }
      }, 80);
    };

    if (currentView !== 'home') {
      handleViewChange('home');
      // Start attempting to scroll after a tiny delay to allow React state update
      setTimeout(scrollToSection, 100);
    } else {
      scrollToSection();
    }
  };

  // Render subpage content dynamically based on selected view
  const renderViewContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onViewChange={handleViewChange} />;
      case 'cucina':
        return <CucinaView />;
      case 'camere':
        return <CamereView />;
      case 'contatti':
        return <ContattiView />;
      case 'privacy':
        return <PrivacyView />;
      case 'cookie':
        return <CookieView />;
      default:
        return <HomeView onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="bg-cream-bg text-charcoal-text min-h-screen flex flex-col justify-between font-sans selection:bg-primary-dark selection:text-cream-bg">
      
      {/* Scrollable grid-paper background details */}
      <div className="fixed inset-0 grid-paper pointer-events-none opacity-20 z-0 h-full w-full" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Unified Application Header Bar */}
        <Header
          currentView={currentView}
          onViewChange={handleViewChange}
          onTableBookingClick={handleTableBookingClick}
        />

        {/* Multi-view Transition Canvas */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {renderViewContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Footer Elements */}
        <Footer onViewChange={handleViewChange} />
      </div>

      {/* Floating GDPR Cookie Banner consent hub */}
      <CookieBanner onViewChange={handleViewChange} />
    </div>
  );
}
