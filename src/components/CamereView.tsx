/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, Wind, ShieldCheck, Heart, Coffee, CalendarCheck, Check, Info, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface RoomGalleryItem {
  id: string;
  src: string;
  fallbackSrc: string;
  title: string;
}

const GALLERY_ROOMS: RoomGalleryItem[] = [
  {
    id: 'camera-1',
    src: '/images/camera1.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800',
    title: 'La quiete dell’alba'
  },
  {
    id: 'camera-2',
    src: '/images/camera2.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800',
    title: 'Luce e pietra'
  },
  {
    id: 'camera-3',
    src: '/images/camera3.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800',
    title: 'Biancheria d’altri tempi'
  },
  {
    id: 'camera-4',
    src: '/images/camera4.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800',
    title: 'Il lusso del silenzio'
  },
  {
    id: 'camera-5',
    src: '/images/camera5.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800',
    title: 'Sguardo sulla campagna'
  },
  {
    id: 'camera-6',
    src: '/images/camera6.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800',
    title: 'Dettagli di benessere'
  }
];

export default function CamereView() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    periodo: '',
    ospiti: 2,
    note: '',
    privacy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, privacy: checked }));
      if (errors.privacy) {
        setErrors((prev) => ({ ...prev, privacy: undefined }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
      if (errors[id as keyof typeof formData]) {
        setErrors((prev) => ({ ...prev, [id]: undefined }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nome.trim()) {
      newErrors.nome = 'Il nome completo è richiesto';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L’email è richiesta';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Inserisci un indirizzo email valido';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Il numero di telefono è richiesto';
    }
    if (!formData.periodo) {
      newErrors.periodo = 'Indica il periodo desiderato';
    }
    if (!formData.privacy) {
      newErrors.privacy = 'È necessario acconsentire alla privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      const el = document.getElementById('camera-booking-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx + 1) % GALLERY_ROOMS.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx - 1 + GALLERY_ROOMS.length) % GALLERY_ROOMS.length);
    }
  };

  return (
    <div className="pt-[95px] md:pt-[110px] bg-cream-bg min-h-screen">
      
      {/* Editorial Header */}
      <section className="relative py-24 px-6 md:px-16 bg-[#261f1b] text-cream-bg text-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/camere-hero.png"
            alt="Atmosfera rilassante e soffusa delle camere rurali dell'Agriturismo Al Celone"
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              if (e.currentTarget.src !== 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200') {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200';
              }
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="font-sans text-xs tracking-[0.3em] text-sage-accent uppercase block mb-3 font-semibold">
            Atmosfere di Charme e Quiete Rurale
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#F7F1E8] mb-6 font-light tracking-wide">
            Le Nostre Camere
          </h1>
          <div className="w-16 h-[1.5px] bg-sage-accent/60 mx-auto mb-6" />
          <p className="font-serif italic text-cream-bg/95 leading-relaxed text-lg max-w-xl mx-auto">
            “Riscoprite il lusso intangibile del silenzio faticoso della città. Ogni camera è un rifugio intimo custodito dalle mura storiche del nostro agriturismo.”
          </p>
        </div>
      </section>

      {/* Narrative & Poetic Introduction */}
      <section className="py-16 px-6 md:px-16 max-w-4xl mx-auto text-center">
        <div className="space-y-6 text-[#2A1C1C]/90 font-light leading-relaxed">
          <p className="text-base md:text-lg font-serif italic text-primary-dark">
            Un’accoglienza genuina basata su dettagli naturali, biancheria di cotone puro lavata al sole e profumo di lavanda selvatica raccolto all’alba.
          </p>
          <p className="text-sm md:text-base">
            Le nostre camere non sono semplici stanze, ma spazi di decompressione. Abbiamo preservato l’originaria fisionomia architettonica delle antiche rimesse contadine, dove le fresche volte a botte in pietra locale si fondono con arredi artigianali in legno massello curati nei minimi dettagli. 
          </p>
        </div>
      </section>

      {/* Visual Image Gallery (6 Images) */}
      <section className="pb-24 px-6 md:px-16 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ROOMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md border border-primary-dark/5 hover:shadow-xl transition-all duration-300"
              onClick={() => setActivePhotoIdx(index)}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1c1010]">
                <img
                  src={item.src}
                  alt={item.title}
                  onError={(e) => {
                    if (e.currentTarget.src !== item.fallbackSrc) {
                      e.currentTarget.src = item.fallbackSrc;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-primary-dark/20 transition-colors" />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-primary-dark p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <ZoomIn size={16} />
                </div>
              </div>
              <div className="p-5 text-center">
                <h3 className="font-serif text-base text-primary-dark font-medium group-hover:text-sage-accent transition-colors">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX FOR DETAILS */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#120a0a]/95 backdrop-blur-md flex flex-col justify-center items-center p-4"
            onClick={() => setActivePhotoIdx(null)}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-cream-bg transition-colors"
            >
              <X size={24} />
            </button>

            {/* Left Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-cream-bg transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Realtime Modal Frame */}
            <div className="relative max-w-4xl w-full flex flex-col items-center select-none" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={activePhotoIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={GALLERY_ROOMS[activePhotoIdx].src}
                alt={GALLERY_ROOMS[activePhotoIdx].title}
                onError={(e) => {
                  if (e.currentTarget.src !== GALLERY_ROOMS[activePhotoIdx].fallbackSrc) {
                    e.currentTarget.src = GALLERY_ROOMS[activePhotoIdx].fallbackSrc;
                  }
                }}
                className="max-h-[650px] max-w-full object-contain rounded border border-white/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="text-center mt-5 max-w-xl">
                <h4 className="font-serif text-xl md:text-2xl text-cream-bg">
                  {GALLERY_ROOMS[activePhotoIdx].title}
                </h4>
              </div>
            </div>

            {/* Right Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-cream-bg transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>

            {/* Counter bottom */}
            <div className="absolute bottom-6 text-xs text-cream-bg/40 font-mono">
              {activePhotoIdx + 1} / {GALLERY_ROOMS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAY BOOKING FORM */}
      <section className="py-20 px-6 md:px-16 bg-sand-surface" id="camera-booking-section">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl font-serif text-primary-dark mb-4">
              Richiedi la tua Sosta in Campagna
            </h2>
            <div className="w-12 h-[1px] bg-sage-accent mx-auto mb-4" />
            <p className="text-charcoal-text/80 font-light text-sm">
              Inviaci una richiesta di contatto indicandoci le tue date preferite e le tue esigenze. Organizziamo soggiorni personalizzati ed esclusivi all’insegna del buon cibo biologico e del riposo contadino.
            </p>
          </div>

          <div className="bg-white p-6 md:p-12 rounded-lg shadow-xl border border-primary-dark/10">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nome" className="text-xs font-bold tracking-widest text-primary-dark uppercase">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="es. Giulia Bianchi"
                      className={`w-full p-3 text-sm rounded border bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark ${
                        errors.nome ? 'border-terracotta' : 'border-[#3d2525]/20'
                      }`}
                    />
                    {errors.nome && <span className="text-[11px] text-terracotta mt-0.5">{errors.nome}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold tracking-widest text-primary-dark uppercase">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="es. nome@esempio.it"
                      className={`w-full p-3 text-sm rounded border bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark ${
                        errors.email ? 'border-terracotta' : 'border-[#3d2525]/20'
                      }`}
                    />
                    {errors.email && <span className="text-[11px] text-terracotta mt-0.5">{errors.email}</span>}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="telefono" className="text-xs font-bold tracking-widest text-primary-dark uppercase">
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="es. 333 456 7890"
                      className={`w-full p-3 text-sm rounded border bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark ${
                        errors.telefono ? 'border-terracotta' : 'border-[#3d2525]/20'
                      }`}
                    />
                    {errors.telefono && <span className="text-[11px] text-terracotta mt-0.5">{errors.telefono}</span>}
                  </div>

                  {/* Period Desired */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="periodo" className="text-xs font-bold tracking-widest text-primary-dark uppercase">
                      Periodo indicativo / Mese e Anno *
                    </label>
                    <input
                      type="text"
                      id="periodo"
                      value={formData.periodo}
                      onChange={handleInputChange}
                      placeholder="es. Metà Settembre 2026, Weekend specifico..."
                      className={`w-full p-3 text-sm rounded border bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark ${
                        errors.periodo ? 'border-terracotta' : 'border-[#3d2525]/20'
                      }`}
                    />
                    {errors.periodo && <span className="text-[11px] text-terracotta mt-0.5">{errors.periodo}</span>}
                  </div>

                  {/* Guests Number */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="ospiti" className="text-xs font-bold tracking-widest text-primary-dark uppercase">
                      Numero Ospiti *
                    </label>
                    <input
                      type="number"
                      id="ospiti"
                      min="1"
                      max="10"
                      value={formData.ospiti}
                      onChange={handleInputChange}
                      className="w-full p-3 text-sm rounded border border-[#3d2525]/20 bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark"
                    />
                  </div>

                </div>

                {/* Notes & Special Needs */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="note" className="text-xs font-bold tracking-widest text-primary-dark uppercase">
                    Esigenze speciali o informazioni aggiuntive
                  </label>
                  <textarea
                    id="note"
                    rows={3}
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Facci sapere se hai preferenze particolari per letti singoli, lettini, restrizioni dietetiche per la colazione bio..."
                    className="w-full p-3 text-sm rounded border border-[#3d2525]/20 bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark"
                  />
                </div>

                {/* Privacy check */}
                <div className="flex flex-col gap-1">
                  <label className="flex items-start gap-2.5 text-xs text-charcoal-text/80 cursor-pointer user-select-none">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={formData.privacy}
                      onChange={handleInputChange}
                      className="mt-0.5 accent-primary-dark"
                    />
                    <span>
                      Acconsento al trattamento dei dati personali secondo la{' '}
                      <a href="#" className="underline text-primary-dark font-medium">
                        Privacy Policy
                      </a>
                      . *
                    </span>
                  </label>
                  {errors.privacy && <span className="text-[11px] text-terracotta">{errors.privacy}</span>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded bg-primary-dark border border-primary-dark hover:bg-transparent hover:text-primary-dark text-cream-bg font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow cursor-pointer text-center"
                  >
                    Invia Richiesta Disponibilità
                  </button>
                </div>

              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-sage-accent/15 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CalendarCheck className="w-8 h-8 text-sage-accent" />
                </div>
                <h3 className="text-2xl font-serif text-primary-dark font-semibold mb-3">
                  Richiesta Ricevuta con Successo
                </h3>
                <p className="text-sm text-charcoal-text max-w-md mx-auto leading-relaxed mb-4">
                  Grazie, <strong>{formData.nome}</strong>! Abbiamo ricevuto la tua richiesta per un soggiorno rurale relativo al periodo: <strong>{formData.periodo}</strong> per <strong>{formData.ospiti} ospiti</strong>.
                </p>
                <div className="p-4 rounded bg-[#edf7ed] border border-[#2e7d32]/20 max-w-sm mx-auto text-xs text-[#1b5e20]">
                  Il nostro Staff verificherà la disponibilità del nostro alloggio biologico e ti risponderà via email all’indirizzo <strong>{formData.email}</strong> fornendoti i dettagli e soluzioni ideali entro 24 ore.
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-xs font-bold tracking-widest text-[#3d2525] border-b border-[#3d2525] hover:text-sage-accent hover:border-sage-accent transition-colors pb-0.5 uppercase cursor-pointer"
                >
                  Fai un'altra richiesta
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
