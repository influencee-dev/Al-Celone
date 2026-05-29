/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppView } from '../types';
import { Menu, X, Utensils } from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onTableBookingClick: () => void;
}

export default function Header({ currentView, onViewChange, onTableBookingClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: AppView) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookTableCTA = () => {
    setIsMobileMenuOpen(false);
    onTableBookingClick();
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full h-[80px] z-[1000] flex items-center justify-between px-6 md:px-16 transition-all duration-300 ${
          isScrolled || currentView !== 'home'
            ? 'bg-primary-dark/95 shadow-lg h-[70px] backdrop-blur-md border-b border-primary-dark/10'
            : 'bg-transparent'
        }`}
      >
        <div className="logo-container flex items-center">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer"
          >
            <img 
              src="/logo.png" 
              alt="Al Celone Logo" 
              className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-103"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-10" aria-label="Navigazione principale">
          <button
            onClick={() => handleNavClick('home')}
            className={`font-sans text-[13px] font-medium tracking-widest uppercase transition-all duration-200 cursor-pointer relative py-2 ${
              currentView === 'home' 
                ? 'text-sage-accent font-bold after:w-full' 
                : 'text-cream-bg/90 hover:text-white after:w-0'
            } after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-sage-accent after:transition-all after:duration-300 hover:after:w-full`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('cucina')}
            className={`font-sans text-[13px] font-medium tracking-widest uppercase transition-all duration-200 cursor-pointer relative py-2 ${
              currentView === 'cucina' 
                ? 'text-sage-accent font-bold after:w-full' 
                : 'text-cream-bg/90 hover:text-white after:w-0'
            } after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-sage-accent after:transition-all after:duration-300 hover:after:w-full`}
          >
            La nostra cucina
          </button>
          <button
            onClick={() => handleNavClick('camere')}
            className={`font-sans text-[13px] font-medium tracking-widest uppercase transition-all duration-200 cursor-pointer relative py-2 ${
              currentView === 'camere' 
                ? 'text-sage-accent font-bold after:w-full' 
                : 'text-cream-bg/90 hover:text-white after:w-0'
            } after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-sage-accent after:transition-all after:duration-300 hover:after:w-full`}
          >
            Camere
          </button>
          <button
            onClick={() => handleNavClick('contatti')}
            className={`font-sans text-[13px] font-medium tracking-widest uppercase transition-all duration-200 cursor-pointer relative py-2 ${
              currentView === 'contatti' 
                ? 'text-sage-accent font-bold after:w-full' 
                : 'text-cream-bg/90 hover:text-white after:w-0'
            } after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-sage-accent after:transition-all after:duration-300 hover:after:w-full`}
          >
            Contatti
          </button>

          <button
            onClick={handleBookTableCTA}
            className="btn py-2 px-3 lg:px-4 text-xs font-semibold tracking-wider font-sans uppercase border border-cream-bg/35 bg-white/5 rounded text-cream-bg cursor-pointer hover:bg-cream-bg hover:text-primary-dark transition-all duration-300"
          >
            Prenota un tavolo
          </button>
        </nav>

        {/* Mobile Hamburger Menu button */}
        <button
          className="md:hidden bg-transparent border-none text-cream-bg text-2.5xl cursor-pointer p-2 rounded hover:text-sage-accent focus:outline-none transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed top-0 right-0 h-screen w-full select-none bg-primary-dark/98 z-[999] flex flex-col items-center justify-center gap-7 transition-all duration-500 ease-in-out px-6 ${
          isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <button
          onClick={() => handleNavClick('home')}
          className={`font-serif text-2xl tracking-widest uppercase transition-colors cursor-pointer ${
            currentView === 'home' ? 'text-sage-accent font-bold' : 'text-cream-bg/90 hover:text-white'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => handleNavClick('cucina')}
          className={`font-serif text-2xl tracking-widest uppercase transition-colors cursor-pointer ${
            currentView === 'cucina' ? 'text-sage-accent font-bold' : 'text-cream-bg/90 hover:text-white'
          }`}
        >
          La nostra cucina
        </button>
        <button
          onClick={() => handleNavClick('camere')}
          className={`font-serif text-2xl tracking-widest uppercase transition-colors cursor-pointer ${
            currentView === 'camere' ? 'text-sage-accent font-bold' : 'text-cream-bg/90 hover:text-white'
          }`}
        >
          Camere
        </button>
        <button
          onClick={() => handleNavClick('contatti')}
          className={`font-serif text-2xl tracking-widest uppercase transition-colors cursor-pointer ${
            currentView === 'contatti' ? 'text-sage-accent font-bold' : 'text-cream-bg/90 hover:text-white'
          }`}
        >
          Contatti
        </button>

        <button
          onClick={handleBookTableCTA}
          className="w-[85%] max-w-xs mt-6 py-3 px-6 text-sm font-semibold tracking-wider text-primary-dark bg-sage-accent border border-sage-accent hover:bg-cream-bg hover:border-cream-bg rounded uppercase transition-all duration-300 text-center cursor-pointer shadow-md"
        >
          Prenota un tavolo
        </button>
        <button
          onClick={() => {
            handleNavClick('camere');
            setTimeout(() => {
              const el = document.getElementById('camera-booking-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 500);
          }}
          className="w-[85%] max-w-xs mt-1 py-3 px-6 text-sm font-semibold tracking-wider text-cream-bg border border-cream-bg hover:bg-cream-bg hover:text-primary-dark rounded uppercase transition-all duration-300 text-center cursor-pointer"
        >
          Prenota un soggiorno
        </button>
      </div>
    </>
  );
}
