/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TableBooking, AppView } from '../types';
import { Coffee, Utensils, Sprout, Bed, Calendar, CheckCircle, Clock } from 'lucide-react';

interface HomeViewProps {
  onViewChange: (view: AppView) => void;
}

export default function HomeView({ onViewChange }: HomeViewProps) {
  // Booking Form State
  const [formData, setFormData] = useState<TableBooking>({
    nome: '',
    email: '',
    telefono: '',
    persone: 2,
    data: '',
    ora: '',
    note: '',
    privacy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TableBooking, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      if (errors[id as keyof TableBooking]) {
        setErrors((prev) => ({ ...prev, [id]: undefined }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TableBooking, string>> = {};
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
    if (!formData.data) {
      newErrors.data = 'La data della prenotazione è richiesta';
    }
    if (!formData.ora) {
      newErrors.ora = 'L’orario è richiesto';
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
      // Smooth scroll to results
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToBooking = () => {
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-x-hidden min-h-screen">
      
      {/* HERO REGION (FULLSCREEN) */}
      <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden bg-[#1c1010] px-4">
        {/* Soft atmospheric rustic overlay & background */}
        <div className="absolute inset-0 z-0">
          <img
            src="./images/home-hero.png"
            alt="Paesaggio rurale e uliveti pugliesi dell'Agriturismo Al Celone"
            className="w-full h-full object-cover opacity-70 scale-105"
            onError={(e) => {
              if (e.currentTarget.src !== 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920') {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920';
              }
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-[#1c1010]/45 to-[#1c1010]/10" />
        </div>

        {/* Content Box with stagger motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 max-w-5xl flex flex-col items-center"
        >
          {/* Centered Brand Logo Mark */}
          <div className="flex flex-col items-center justify-center mb-10 md:mb-14 select-none">
            {/* Custom Logo Image with fallback */}
            <img 
              src="./images/logo.png" 
              alt="Logo Al Celone" 
              className="max-h-80 md:max-h-[380px] lg:max-h-[460px] w-auto max-w-[90%] object-contain filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.65)]"
              onError={(e) => {
                // If logo.png doesn't exist yet, we show a clean message/placeholder
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = parent.querySelector('.logo-placeholder-message');
                  if (fallback) fallback.classList.remove('hidden');
                }
              }}
            />
            {/* Fallback placeholder message that displays only if /logo.png fails to load */}
            <div className="logo-placeholder-message hidden flex flex-col items-center justify-center text-center p-6 border border-dashed border-sage-accent/30 bg-primary-dark/20 backdrop-blur-sm rounded-lg">
              <span className="font-serif text-[#F7F1E8] text-2xl tracking-[0.2em] uppercase">Al Celone</span>
              <div className="w-12 h-[1px] bg-sage-accent my-3" />
              <p className="text-[10px] text-cream-bg/40 uppercase tracking-widest leading-none">
                Inserisci qui il logo (GitHub)
              </p>
            </div>
          </div>

          <button
            onClick={scrollToBooking}
            className="btn btn-primary bg-primary-dark border-primary-dark text-cream-bg hover:bg-transparent hover:text-cream-bg hover:border-cream-bg text-sm px-8 py-3.5 tracking-wider uppercase rounded cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
          >
            Prenota un tavolo
          </button>
        </motion.div>


      </section>

      {/* ROW OSPITALITÀ (STORY & BEAUTIFUL GRAPHIC) */}
      <section className="py-20 md:py-28 px-6 md:px-16 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col text-left"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-primary-dark mb-4 after:content-[''] after:block after:w-10 after:h-[2px] after:bg-sage-accent after:mt-3">
              L'Ospitalità della Famiglia
            </h2>
            <p className="text-lg md:text-xl font-serif italic text-primary-dark mb-6 leading-relaxed">
              Un'accoglienza sincera nel cuore del Tavoliere delle Puglie.
            </p>
            
            <p className="text-charcoal-text font-light text-base md:text-lg mb-6 leading-relaxed">
              All'Agriturismo Al Celone apriamo le porte della nostra casa contadina per condividere i sapori genuini della nostra terra biologica. Ogni piatto, ogni stanza e ogni percorso di quiete raccontano la passione e la cura di una famiglia unita dall'amore per le tradizioni rurali della Capitanata.
            </p>
            
            <div>
              <button
                onClick={() => onViewChange('camere')}
                className="btn btn-secondary border-primary-dark hover:bg-primary-dark hover:text-cream-bg text-xs px-6 py-3 tracking-widest uppercase rounded cursor-pointer transition-all duration-300"
              >
                Scopri le nostre stanze
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded overflow-hidden shadow-xl group border border-primary-dark/5">
              <img
                src="./images/home-ospitalita.png"
                alt="Dettaglio ospitale ed accogliente dell'Agriturismo Al Celone"
                className="w-full h-[380px] md:h-[480px] object-cover block group-hover:scale-105 transition-all duration-700"
                onError={(e) => {
                  if (e.currentTarget.src !== 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1200') {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1200';
                  }
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-4 border border-white/20 pointer-events-none z-10" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* RUSTIC PILLS & EXPERIENCES */}
      <section className="py-20 md:py-24 bg-sand-surface px-6 md:px-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-cream-bg rounded-lg p-8 md:p-14 text-center max-w-4xl mx-auto shadow-lg border border-primary-dark/5 relative"
          >
            {/* Elegant massive quotation mark */}
            <span className="font-serif text-7xl text-sage-accent/25 absolute -top-4 left-1/2 -translate-x-1/2 select-none pointer-events-none">
              “
            </span>

            <p className="text-xl md:text-2xl font-serif text-charcoal-text leading-relaxed mb-10 pt-4">
              Immerso nel Tavoliere delle Puglie, a pochi minuti da Foggia, l'Agriturismo Al Celone è un rifugio rurale di assoluta quiete. Un'oasi di verde abbastanza vicina alla città da raggiungersi in un attimo, ma abbastanza lontana per dimenticarne il rumore.
            </p>

            {/* Experience list */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 pt-4">
              <span className="flex items-center gap-2 font-serif text-lg italic text-primary-dark hover:text-terracotta transition-colors duration-200">
                <Coffee size={18} className="text-sage-accent" /> Colazione
              </span>
              <span className="flex items-center gap-2 font-serif text-lg italic text-primary-dark hover:text-terracotta transition-colors duration-200">
                <Utensils size={18} className="text-sage-accent" /> Ristorante
              </span>
              <span className="flex items-center gap-2 font-serif text-lg italic text-primary-dark hover:text-terracotta transition-colors duration-200">
                <Sprout size={18} className="text-sage-accent" /> Giardino Bio
              </span>
              <span className="flex items-center gap-2 font-serif text-lg italic text-primary-dark hover:text-terracotta transition-colors duration-200">
                <Bed size={18} className="text-sage-accent" /> Stanze
              </span>
              <span className="flex items-center gap-2 font-serif text-lg italic text-primary-dark hover:text-terracotta transition-colors duration-200">
                <Calendar size={18} className="text-sage-accent" /> Eventi rurali
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TABLE RESERVATION FORM */}
      <section className="py-20 px-6 md:px-16 bg-cream-bg" id="booking-section">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-primary-dark mb-4">
              Prenota un Tavolo
            </h2>
            <div className="w-12 h-[1px] bg-sage-accent mx-auto mb-4" />
            <p className="text-charcoal-text/80 font-light text-base md:text-lg">
              Vivi un viaggio sensoriale nella vera cucina contadina pugliese, preparata con le verdure biologiche del nostro orto e carni locali selezionate.
            </p>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-12 rounded-lg overflow-hidden shadow-xl border border-primary-dark/10 bg-sand-surface">
            
            {/* Form Column */}
            <div className="md:col-span-7 bg-white p-5 md:p-8 flex flex-col justify-center">
              <div id="brevo-prenota-tavolo">
                
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="nome" className="text-[11px] font-bold tracking-widest text-primary-dark uppercase">
                          Nome *
                        </label>
                        <input
                          type="text"
                          id="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          placeholder="es. Mario Rossi"
                          className={`w-full p-2.5 text-sm rounded border bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark ${
                            errors.nome ? 'border-terracotta' : 'border-[#3d2525]/20'
                          }`}
                        />
                        {errors.nome && <span className="text-[10px] text-terracotta mt-0.5">{errors.nome}</span>}
                      </div>
 
                      {/* Email */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-[11px] font-bold tracking-widest text-primary-dark uppercase">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="es. nome@esempio.it"
                          className={`w-full p-2.5 text-sm rounded border bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark ${
                            errors.email ? 'border-terracotta' : 'border-[#3d2525]/20'
                          }`}
                        />
                        {errors.email && <span className="text-[10px] text-terracotta mt-0.5">{errors.email}</span>}
                      </div>
 
                      {/* Phone */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="telefono" className="text-[11px] font-bold tracking-widest text-primary-dark uppercase">
                          Telefono *
                        </label>
                        <input
                          type="tel"
                          id="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          placeholder="es. +39 345 678 9101"
                          className={`w-full p-2.5 text-sm rounded border bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark ${
                            errors.telefono ? 'border-terracotta' : 'border-[#3d2525]/20'
                          }`}
                        />
                        {errors.telefono && <span className="text-[10px] text-terracotta mt-0.5">{errors.telefono}</span>}
                      </div>

                      {/* Guests number */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="persone" className="text-[11px] font-bold tracking-widest text-primary-dark uppercase">
                          Persone *
                        </label>
                        <input
                          type="number"
                          id="persone"
                          min="1"
                          max="50"
                          value={formData.persone}
                          onChange={handleInputChange}
                          className="w-full p-2.5 text-sm rounded border border-[#3d2525]/20 bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark"
                        />
                      </div>
 
                      {/* Booking Date */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="data" className="text-[11px] font-bold tracking-widest text-primary-dark uppercase">
                          Data *
                        </label>
                        <input
                          type="date"
                          id="data"
                          value={formData.data}
                          onChange={handleInputChange}
                          className={`w-full p-2.5 text-sm rounded border bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark ${
                            errors.data ? 'border-terracotta' : 'border-[#3d2525]/20'
                          }`}
                        />
                        {errors.data && <span className="text-[10px] text-terracotta mt-0.5">{errors.data}</span>}
                      </div>
 
                      {/* Orario / Slot */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="ora" className="text-[11px] font-bold tracking-widest text-primary-dark uppercase">
                          Orario *
                        </label>
                        <select
                          id="ora"
                          value={formData.ora}
                          onChange={handleInputChange}
                          className={`w-full p-2.5 text-sm rounded border bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark ${
                            errors.ora ? 'border-terracotta' : 'border-[#3d2525]/20'
                          }`}
                        >
                          <option value="">Seleziona...</option>
                          <option value="12:30">12:30 (Pranzo)</option>
                          <option value="13:00">13:00 (Pranzo)</option>
                          <option value="13:30">13:30 (Pranzo)</option>
                          <option value="20:00">20:00 (Cena)</option>
                          <option value="20:30">20:30 (Cena)</option>
                          <option value="21:00">21:00 (Cena)</option>
                          <option value="21:30">21:30 (Cena)</option>
                        </select>
                        {errors.ora && <span className="text-[10px] text-terracotta mt-0.5">{errors.ora}</span>}
                      </div>
 
                    </div>
 
                    {/* Note / Allergies */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="note" className="text-[11px] font-bold tracking-widest text-primary-dark uppercase">
                        Note o Allergie
                      </label>
                      <textarea
                        id="note"
                        rows={2}
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="Allergie, intolleranze o preferenze di posizionamento..."
                        className="w-full p-2.5 text-sm rounded border border-[#3d2525]/20 bg-[#FDFCFA] text-charcoal-text focus:outline-none focus:ring-1 focus:ring-primary-dark"
                      />
                    </div>
 
                    {/* Privacy check */}
                    <div className="flex flex-col gap-1">
                      <label className="flex items-start gap-2 text-xs text-charcoal-text/80 cursor-pointer user-select-none">
                        <input
                          type="checkbox"
                          id="privacy"
                          checked={formData.privacy}
                          onChange={handleInputChange}
                          className="mt-0.5 accent-primary-dark"
                        />
                        <span>
                          Acconsento al trattamento dei dati personali. *
                        </span>
                      </label>
                      {errors.privacy && <span className="text-[10px] text-terracotta">{errors.privacy}</span>}
                    </div>
 
                    {/* Submit */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full py-3 px-6 rounded bg-primary-dark border border-primary-dark hover:bg-transparent hover:text-primary-dark text-cream-bg hover:brightness-105 font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow cursor-pointer text-center"
                      >
                        Invia Richiesta di Prenotazione
                      </button>
                    </div>
 
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 px-4"
                  >
                    <CheckCircle className="w-12 h-12 text-sage-accent mx-auto mb-4" />
                    <h3 className="text-xl font-serif text-primary-dark font-semibold mb-2">
                      Richiesta Ricevuta
                    </h3>
                    <p className="text-sm text-charcoal-text max-w-sm mx-auto leading-relaxed">
                      Grazie, <strong>{formData.nome}</strong>! La tua richiesta per <strong>{formData.persone} persone</strong> del giorno <strong>{formData.data}</strong> alle ore <strong>{formData.ora}</strong> è stata salvata con successo.
                    </p>
                    <div className="mt-3 p-3 rounded bg-sage-accent/10 border border-sage-accent/25 max-w-sm mx-auto text-xs text-charcoal-text/90">
                      Ti abbiamo inviato un’email a <strong>{formData.email}</strong>. Attendi l’email di conferma finale dello staff.
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-xs font-bold tracking-widest text-[#3d2525] border-b border-[#3d2525] hover:text-sage-accent hover:border-sage-accent transition-colors pb-0.5 uppercase cursor-pointer"
                    >
                      Nuova Prenotazione
                    </button>
                  </motion.div>
                )}
 
              </div>
            </div>
 
            {/* Sidebar Column (Image & Info Box) */}
            <div className="md:col-span-5 relative min-h-[350px] flex flex-col justify-end bg-[#1c1010]">
              <img
                src="./images/home-form.png"
                alt="Tavola imbandita con pietanze tradizionali fatte in casa"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                onError={(e) => {
                  if (e.currentTarget.src !== 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200') {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200';
                  }
                }}
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/25 to-transparent pointer-events-none" />
 
              {/* Informative Floating Hours Badge */}
              <div className="relative z-10 p-5 m-5 bg-primary-dark/85 rounded border border-white/10 backdrop-blur-md shadow-md">
                <h4 className="text-[#FAF5EF] font-serif font-semibold mb-1.5 tracking-wide flex items-center gap-2 text-base">
                  <Clock size={16} className="text-sage-accent" /> Chiusure Ristorante
                </h4>
                <p className="text-cream-bg/90 text-xs leading-relaxed font-light">
                  Il ristorante è chiuso la <strong>domenica sera</strong> e il <strong>lunedì a pranzo</strong>. La prenotazione tramite form o telefono al <span className="font-semibold text-sage-accent">334 343 4747</span> è vivamente consigliata.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
