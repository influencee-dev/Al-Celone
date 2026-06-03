/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppView } from '../types';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onViewChange: (view: AppView) => void;
}

export default function Footer({ onViewChange }: FooterProps) {
  const handleNavClick = (view: AppView) => {
    onViewChange(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark text-cream-bg pt-16 pb-8 px-6 md:px-16 font-light border-t border-primary-dark/40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-start">
        
        {/* Brand Information */}
        <div className="flex flex-col gap-5">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer justify-start self-start"
          >
            <img 
              src="/logo.png" 
              alt="Al Celone Logo" 
              className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-103"
            />
          </button>
          <p className="text-sm text-cream-bg/75 leading-relaxed max-w-sm">
            Oasi rurale, autentica gastronomia tipica e accoglienza contadina alle porte del Tavoliere in Puglia. Coltiviamo passione rurale ed ospitalità da generazioni.
          </p>
          <div className="flex gap-4 mt-2" aria-label="Seguici sui social">
            <a
              href="https://www.instagram.com/alcelone/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-cream-bg/8 text-cream-bg flex items-center justify-center hover:bg-sage-accent hover:text-primary-dark hover:scale-105 transition-all duration-300"
              aria-label="Profilo Instagram"
            >
              <Instagram size={18} strokeWidth={1.2} />
            </a>
            <a
              href="https://www.facebook.com/Al.Celone"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-cream-bg/8 text-cream-bg flex items-center justify-center hover:bg-sage-accent hover:text-primary-dark hover:scale-105 transition-all duration-300"
              aria-label="Pagina Facebook"
            >
              <Facebook size={18} strokeWidth={1.2} />
            </a>
          </div>
        </div>

        {/* Quick navigation links */}
        <div>
          <h4 className="text-sm font-semibold text-sage-accent tracking-widest uppercase mb-6">
            Navigazione
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <button
                onClick={() => handleNavClick('home')}
                className="text-cream-bg/80 hover:text-white text-sm transition-all duration-200 hover:pl-1 cursor-pointer bg-transparent border-none outline-none text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('cucina')}
                className="text-cream-bg/80 hover:text-white text-sm transition-all duration-200 hover:pl-1 cursor-pointer bg-transparent border-none outline-none text-left"
              >
                La nostra cucina
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('camere')}
                className="text-cream-bg/80 hover:text-white text-sm transition-all duration-200 hover:pl-1 cursor-pointer bg-transparent border-none outline-none text-left"
              >
                Camere & Soggiorni
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('contatti')}
                className="text-cream-bg/80 hover:text-white text-sm transition-all duration-200 hover:pl-1 cursor-pointer bg-transparent border-none outline-none text-left"
              >
                Contatti
              </button>
            </li>
          </ul>
        </div>

        {/* Contacts & Opening Hours */}
        <div className="flex flex-col gap-5">
          <h4 className="text-sm font-semibold text-sage-accent tracking-widest uppercase mb-1">
            Contatti & Info
          </h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 text-sm text-cream-bg/80">
              <MapPin size={18} className="text-sage-accent shrink-0 mt-0.5" />
              <span>Via San Severo km.4, Foggia (FG)</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-cream-bg/80">
              <Phone size={18} className="text-sage-accent shrink-0 mt-0.5" />
              <span>334 343 4747</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-cream-bg/80">
              <Mail size={18} className="text-sage-accent shrink-0 mt-0.5" />
              <span>info@alcelone.it</span>
            </div>
            <div className="bg-white/4 border-l-2 border-sage-accent p-4 rounded-r mt-2">
              <p className="font-serif font-medium text-cream-bg text-sm">
                Ristorante Al Celone
              </p>
              <p className="text-xs text-cream-bg/70 mt-1">
                Il ristorante è chiuso la domenica sera e il lunedì a pranzo. La prenotazione è consigliata.
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-cream-bg/10 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center text-xs text-cream-bg/50 gap-4 max-w-6xl mx-auto">
        <div>
          &copy; {new Date().getFullYear()} Agriturismo Ristorante Al Celone. Tutti i diritti riservati. P.IVA 01234567890
        </div>
        <div className="flex gap-6">
          <button
            onClick={() => handleNavClick('privacy')}
            className="hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => handleNavClick('cookie')}
            className="hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none"
          >
            Cookie Policy
          </button>
        </div>
      </div>
    </footer>
  );
}
