/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Sparkles, Award } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  fallbackSrc: string;
  caption: string;
  isTall?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'piatto-1',
    src: '/images/cucina1.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200',
    caption: 'Orecchiette fatte a mano con cime di rapa pugliesi coltivate biologicamente',
    isTall: true
  },
  {
    id: 'piatto-2',
    src: '/images/cucina2.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1573145959956-e9fae6b8845d?q=80&w=1200',
    caption: 'Focaccia pugliese calda aromatizzata al rosmarino selvatico e pomodorini cotta al forno',
  },
  {
    id: 'piatto-3',
    src: '/images/cucina3.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200',
    caption: 'Antipasto rustico con formaggi a latte crudo e salumi stagionati del Tavoliere',
  },
  {
    id: 'piatto-4',
    src: '/images/cucina4.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200',
    caption: 'Grigliata mista saporita di carni locali della Capitanata cotte su legno d’ulivo',
  },
  {
    id: 'piatto-5',
    src: '/images/cucina5.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1563379926898-05f4575a4538?q=80&w=1200',
    caption: 'Cavatelli fatti in casa tirati a mano con sugo denso di pomodori nostrani e basilico dell’orto',
    isTall: true
  },
  {
    id: 'piatto-6',
    src: '/images/cucina6.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200',
    caption: 'Olio extravergine dorato novello ricavato per spremitura a freddo dai nostri ulivi foggiani',
  },
  {
    id: 'piatto-7',
    src: '/images/cucina7.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200',
    caption: 'Zuppa caldissima della tradizione foggiana con purea di fave e cicorie selvatiche campestri',
  },
  {
    id: 'piatto-8',
    src: '/images/cucina8.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200',
    caption: 'Verdure gratinate dell’orto foggiano, farcite con pangrattato profumato alle erbe e pepe',
  },
  {
    id: 'piatto-9',
    src: '/images/cucina9.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1200',
    caption: 'Cartellate e dolci tradizionali pugliesi cotti con uova del nostro pollaio e vincotto di fichi',
  },
  {
    id: 'piatto-10',
    src: '/images/cucina10.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200',
    caption: 'Pane rurale di grano duro cotto rigorosamente a legna secondo la secolare usanza contadina',
  }
];

export default function CucinaView() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // Keybindings for smooth Lightbox scrolling
  useEffect(() => {
    if (activePhotoIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhotoIdx(null);
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIdx]);

  const showNext = () => {
    setActivePhotoIdx((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
  };

  const showPrev = () => {
    setActivePhotoIdx((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
  };

  return (
    <div className="pt-[95px] md:pt-[110px] bg-cream-bg min-h-screen">
      
      {/* COHERENT INNER COMPACT HERO */}
      <section className="relative w-full h-[50vh] min-h-[380px] flex items-center justify-center text-center overflow-hidden bg-[#1c1010]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/cucina-hero.png"
            alt="I segreti e la passione della cucina dell'Agriturismo Al Celone"
            className="w-full h-full object-cover opacity-65 scale-103 object-center"
            onError={(e) => {
              if (e.currentTarget.src !== 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200') {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200';
              }
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-[#1c1010]/35 to-[#1c1010]/10" />
        </div>
        
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="font-serif text-cream-bg text-4xl md:text-6xl font-medium tracking-tight">
            La nostra Cucina
          </h1>
          <p className="font-serif text-cream-bg/90 italic text-lg md:text-2.5xl mt-3 leading-relaxed">
            I sapori contadini della Capitanata, portati in tavola ogni giorno
          </p>
        </div>
      </section>

      {/* EDITORIAL CUCINA INTRO */}
      <section className="py-20 px-6 md:px-16 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main article */}
          <div className="lg:col-span-7 text-left space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-primary-dark pb-1 after:content-[''] after:block after:w-10 after:h-[2px] after:bg-sage-accent after:mt-3">
              L'Onestà del km Zero
            </h2>
            <p className="text-xl font-serif italic text-primary-dark leading-relaxed">
              Un patto sincero tra la terra e il piatto: raccogliamo la mattina ciò che serviamo a pranzo.
            </p>
            <p className="text-charcoal-text font-light text-base md:text-lg leading-relaxed">
              La nostra cucina non persegue le mode effimere, preferendo concentrarsi sull'onomastica pulita degli aromi della nostra terra pugliese. Ogni giorno impastiamo a mano la semola rimacinata del nostro grano per forgiare orecchiette ricche, troccoli ruvidi e cavatelli tradizionali. Gli ortaggi sono i custodi stagionali del nostro orto biologico: pomodori baciati dal sole del Tavoliere, melanzane striate, cime di rapa tenere ed erbe selvatiche raccolte all'alba. Un trionfo rurale coronato dall'olio extravergine d'oliva di nostra produzione e dai vini sinceri della Capitanata.
            </p>
            
            <div className="font-serif text-lg italic border-l-2 border-terracotta pl-4 py-1 text-primary-dark/95 mt-6">
              "La materia prima non ha bisogno di artifici quando è carica di sole, terra e vento pugliese."
            </div>
          </div>

          {/* Aside layout details */}
          <div className="lg:col-span-5 bg-sand-surface p-8 md:p-10 rounded-lg space-y-6 border border-primary-dark/5">
            <h3 className="font-serif text-2xl text-primary-dark leading-tight">
              Il Ritmo delle Stagioni
            </h3>
            <p className="text-[#2A1C1C]/90 font-light text-sm md:text-base leading-relaxed">
              Rispettiamo l'alternarsi naturale dei mesi dell'anno. Per questo il nostro menù cambia, seguendo docilmente il respiro del nostro campo e offrendo sempre le primizie più dolci.
            </p>
          </div>

        </div>
      </section>

      {/* RUSTIC PIATTI MASONRY GALLERY */}
      <section className="py-20 px-6 md:px-16 bg-sand-surface border-t border-b border-primary-dark/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-primary-dark mb-4">
              I piatti della Tradizione
            </h2>
            <p className="text-charcoal-text/80 font-light text-base md:text-lg">
              Un racconto visivo ravvicinato di profumi caldi, legna che arde e ricette tramandate con devozione familiare alle porte del Tavoliere.
            </p>
          </div>

          {/* Masonry Columns on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                onClick={() => setActivePhotoIdx(idx)}
                whileHover={{ y: -6, scale: 1.015 }}
                className={`group relative bg-cream-bg rounded overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 border border-primary-dark/5 ${
                  item.isTall ? 'row-span-2' : ''
                }`}
              >
                <div className="relative overflow-hidden w-full h-full bg-[#1c1010]">
                  <img
                    src={item.src}
                    alt=""
                    onError={(e) => {
                      if (e.currentTarget.src !== item.fallbackSrc) {
                        e.currentTarget.src = item.fallbackSrc;
                      }
                    }}
                    className={`w-full object-cover block group-hover:scale-105 transition-transform duration-700 ${
                      item.isTall ? 'h-[500px]' : 'h-[250px]'
                    }`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM SEAMLESS LIGHTBOX PORTAL */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActivePhotoIdx(null);
            }}
            className="fixed inset-0 bg-primary-dark/98 backdrop-blur-md z-[2000] flex items-center justify-center select-none"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 text-cream-bg/85 hover:text-white hover:scale-110 cursor-pointer p-3 z-50 transition-all focus:outline-none"
              aria-label="Chiudi galleria"
            >
              <X size={32} />
            </button>

            {/* Left Prev Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-6 text-cream-bg/75 hover:text-white hover:bg-white/5 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors focus:outline-none"
              aria-label="Immagine precedente"
            >
              <ChevronLeft size={36} />
            </button>

            {/* Content display container */}
            <div className="max-w-4xl max-h-[85vh] px-8 flex flex-col items-center justify-center">
              <motion.img
                key={GALLERY_ITEMS[activePhotoIdx].id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                src={GALLERY_ITEMS[activePhotoIdx].src}
                alt={GALLERY_ITEMS[activePhotoIdx].caption}
                onError={(e) => {
                  if (e.currentTarget.src !== GALLERY_ITEMS[activePhotoIdx].fallbackSrc) {
                    e.currentTarget.src = GALLERY_ITEMS[activePhotoIdx].fallbackSrc;
                  }
                }}
                className="max-w-full max-h-[70vh] object-contain rounded shadow-2xl border border-white/5"
                referrerPolicy="no-referrer"
              />
              
              <motion.div
                key={`cap-${GALLERY_ITEMS[activePhotoIdx].id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-6 max-w-2xl"
              >
                <p className="font-serif text-cream-bg text-xl md:text-2xl leading-relaxed font-light">
                  {GALLERY_ITEMS[activePhotoIdx].caption}
                </p>
                <span className="inline-block mt-2 font-mono text-[11px] tracking-widest text-sage-accent/90 uppercase">
                  Piatto {activePhotoIdx + 1} di {GALLERY_ITEMS.length}
                </span>
              </motion.div>
            </div>

            {/* Right Next Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-6 text-cream-bg/75 hover:text-white hover:bg-white/5 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors focus:outline-none"
              aria-label="Immagine successiva"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
