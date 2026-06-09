/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Compass, CheckCircle } from 'lucide-react';

interface LocalContactForm {
  nome: string;
  email: string;
  telefono: string;
  messaggio: string;
  privacy: boolean;
}

export default function ContattiView() {
  const [formData, setFormData] = useState<LocalContactForm>({
    nome: '',
    email: '',
    telefono: '',
    messaggio: '',
    privacy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LocalContactForm, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      if (errors[id as keyof LocalContactForm]) {
        setErrors((prev) => ({ ...prev, [id]: undefined }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LocalContactForm, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nome.trim()) {
      newErrors.nome = 'Il nome completo è richiesto';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L’indirizzo e-mail è richiesto';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Inserisci un indirizzo e-mail valido';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Il numero di telefono è richiesto';
    }
    if (!formData.messaggio.trim()) {
      newErrors.messaggio = 'Il messaggio o richiesta è richiesto';
    }
    if (!formData.privacy) {
      newErrors.privacy = 'È necessario acconsentire al trattamento dei dati personali';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const getWhatsAppUrl = () => {
    const text = `Ciao Agriturismo Al Celone! Vi ho appena inviato una richiesta di contatto tramite il vostro sito web:
- Nome: ${formData.nome || ''}
- Email: ${formData.email || ''}
- Telefono: ${formData.telefono || ''}
- Messaggio: ${formData.messaggio || ''}

Grazie!`;
    return `https://wa.me/393343434747?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const response = await fetch('/api/brevo/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            tipoForm: 'contatti',
          }),
        });

        const resData = await response.json();
        if (response.ok && resData.success) {
          setIsSubmitted(true);

          // Auto-open WhatsApp with the structured message
          try {
            const waUrl = getWhatsAppUrl();
            window.open(waUrl, '_blank');
          } catch (waErr) {
            console.error("Popup window.open blocked by browser restriction", waErr);
          }

          // Optional: Smooth scroll to form section
          const formSection = document.getElementById('info-section');
          if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          setSubmitError(resData.error || "Errore durante l'invio della richiesta di contatto.");
        }
      } catch (err: any) {
        console.error("Submission error:", err);
        setSubmitError("Errore di connessione. Verificare la rete e riprovare.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="pt-[95px] md:pt-[110px] bg-[#F7F1E8] min-h-screen text-[#2A1C1C]">
      
      {/* Hero Interna */}
      <section className="relative w-full h-[50vh] min-h-[380px] flex items-center justify-center text-center overflow-hidden bg-[#1c1010]">
        <div className="absolute inset-0 z-0">
          <img
            src="./images/contatti-hero.png"
            alt="I contatti e l'accoglienza dell'Agriturismo Al Celone a Foggia"
            className="w-full h-full object-cover opacity-65 scale-103 object-center"
            onError={(e) => {
              if (e.currentTarget.src !== 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200') {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200';
              }
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-[#1c1010]/35 to-[#1c1010]/10" />
        </div>
        
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="font-serif text-[#F7F1E8] text-4xl md:text-5xl font-light tracking-wide mb-4">
            Contatti e Dove Siamo
          </h1>
          <div className="w-16 h-[1.5px] bg-sage-accent/60 mx-auto mb-4" />
          <p className="font-serif text-white/90 italic text-base md:text-lg leading-relaxed">
            La porta di casa nostra è sempre aperta per accoglierti
          </p>
        </div>
      </section>

      {/* Sezione contatti a due colonne */}
      <main>
        <section className="py-20 px-6 md:px-16 container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            
            {/* Colonna A: Spazio Mappa Google Maps */}
            <div className="relative flex flex-col rounded-md overflow-hidden shadow-lg border border-[#3d2525]/5 min-h-[440px] lg:min-h-[480px] bg-[#EDE3D4]">
              <div className="w-full h-full flex-grow relative" id="[[GOOGLE_MAPS_EMBED]]">
                
                {/* Fallback visuale mappa con interazione ad alta estetica */}
                <AnimatePresence>
                  {!isMapLoaded && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-[#EDE3D4] flex flex-col items-center justify-center text-center p-8 z-10"
                      id="map-fallback"
                    >
                      <MapPin className="text-[#C36B4B] w-14 h-14 mb-4 animate-bounce" />
                      <h3 className="font-serif text-2xl text-[#3d2525] font-medium mb-1">Mappa Interattiva</h3>
                      <p className="text-sm text-[#2A1C1C] max-w-xs mb-6 opacity-80">
                        Fai click per caricare la posizione reale dell'Agriturismo Al Celone a Foggia.
                      </p>
                      <button
                        onClick={() => setIsMapLoaded(true)}
                        className="btn bg-[#3d2525] text-[#F7F1E8] py-2.5 px-6 rounded text-xs font-semibold tracking-wider uppercase cursor-pointer hover:bg-transparent hover:text-[#3d2525] border border-[#3d2525] transition-all duration-300"
                        id="load-map-btn"
                      >
                        Carica Mappa Fallback
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Iframe reale della posizione dell'Agriturismo Al Celone */}
                <iframe
                  id="maps-iframe-real"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.851722306233!2d15.515865376510344!3d41.49863807128507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13372e1281cb965d%3A0x867fc4dcdc43df2c!2sAgriturismo%20Al%20Celone!5e0!3m2!1sit!2sit!4v1716983000000!5m2!1sit!2sit"
                  className="w-full h-full border-0 absolute inset-0"
                  loading="lazy"
                  title="Posizione Agriturismo Al Celone Foggia"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Colonna B: Indicazioni stradali scritte + contatti */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#3d2525] mb-4 pb-1 after:content-[''] after:block after:w-10 after:h-[1.5px] after:bg-[#7C8B6F] after:mt-3">
                  Vieni a trovarci
                </h2>
                <p className="text-[#2A1C1C] opacity-90 font-light text-base md:text-lg leading-relaxed">
                  Ci troviamo nell'autentico Tavoliere delle Puglie, in una posizione silenziosa ma strategica per raccordare tutta la Capitanata.
                </p>
              </div>
              
              <div className="flex flex-col gap-6">
                {/* Indirizzo */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-[#EDE3D4] text-[#3d2525] rounded-full flex items-center justify-center shrink-0 border border-[#3d2525]/10 group-hover:bg-[#3d2525] group-hover:text-[#F7F1E8] group-hover:scale-105 transition-all duration-300">
                    <MapPin size={20} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-[#3d2525] mb-1">
                      Indirizzo
                    </h4>
                    <p className="text-base text-[#2A1C1C] font-normal leading-relaxed">
                      Via San Severo km.4, 71121 Foggia (FG)
                    </p>
                  </div>
                </div>

                {/* Telefono */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-[#EDE3D4] text-[#3d2525] rounded-full flex items-center justify-center shrink-0 border border-[#3d2525]/10 group-hover:bg-[#3d2525] group-hover:text-[#F7F1E8] group-hover:scale-105 transition-all duration-300">
                    <Phone size={20} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-[#3d2525] mb-1">
                      Telefono
                    </h4>
                    <p className="text-base text-[#2A1C1C] font-semibold">
                      334 343 4747
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-[#EDE3D4] text-[#3d2525] rounded-full flex items-center justify-center shrink-0 border border-[#3d2525]/10 group-hover:bg-[#3d2525] group-hover:text-[#F7F1E8] group-hover:scale-105 transition-all duration-300">
                    <Mail size={20} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-[#3d2525] mb-1">
                      E-mail
                    </h4>
                    <p className="text-base text-[#2A1C1C] font-semibold">
                      info@alcelone.it
                    </p>
                  </div>
                </div>

                {/* Orari con evidenza della chiusura del ristorante */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-[#EDE3D4] text-[#3d2525] rounded-full flex items-center justify-center shrink-0 border border-[#3d2525]/10 group-hover:bg-[#3d2525] group-hover:text-[#F7F1E8] group-hover:scale-105 transition-all duration-300">
                    <Clock size={20} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-[#3d2525] mb-1">
                      Orari Ristorante & Chiusure
                    </h4>
                    <p className="font-medium text-[#3d2525] text-base">
                      Il ristorante è chiuso la domenica sera e il lunedì a pranzo
                    </p>
                    <p className="text-xs text-[#2A1C1C] opacity-80 mt-1 leading-relaxed">
                      Aperto da Martedì a Sabato (sia pranzo che cena) e Domenica a pranzo. La prenotazione è consigliata e gradita, ma non obbligatoria.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#EDE3D4] p-6 md:p-8 rounded border-l-3 border-[#7C8B6F] shadow-sm">
                <h3 className="font-serif text-lg md:text-xl text-[#3d2525] mb-2 flex items-center gap-2">
                  <Compass className="text-[#C36B4B]" size={20} /> Come raggiungerci
                </h3>
                <p className="text-xs md:text-sm text-[#2A1C1C] opacity-95 leading-relaxed">
                  Dall'uscita autostradale di Foggia o dalla circonvallazione cittadina, imbocca la Strada Statale 16 (Via San Severo) in direzione San Severo. Prosegui lungo la statale per circa 4 km: troverai l'Agriturismo Al Celone sulla destra, immerso tra viali alberati ricchi di ulivi secolari e ben segnalato dalla nostra insegna rurale all'ingresso.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* FORM RICHIESTA INFORMAZIONI */}
        <section className="py-20 px-6 md:px-16 bg-[#EDE3D4]" id="info-section">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-[#3d2525] mb-4 pb-1 after:content-[''] after:block after:w-10 after:h-[1.5px] after:bg-[#7C8B6F] after:mt-3">
                Chiedi Informazioni
              </h2>
              <p className="text-[#2A1C1C] opacity-90 font-light text-base">
                Inserisci i tuoi recapiti e scrivici un messaggio: risponderemo con premura ad ogni tuo dubbio
              </p>
            </div>

            <div className="max-w-[850px] mx-auto bg-white rounded-md p-6 md:p-16 shadow-lg border border-[#3d2525]/5">
              <div id="brevo-info">
                
                {!isSubmitted ? (
                  <form id="info-form" onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-xs font-semibold uppercase tracking-wider text-[#3d2525]">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          className="w-full padding-3 p-3.5 text-sm text-[#2A1C1C] bg-[#F7F1E8] border border-[#3d2525]/15 rounded outline-none focus:border-[#3d2525] focus:bg-white focus:ring-1 focus:ring-[#3d2525]/10 transition-all duration-200"
                          placeholder="es. Mario Rossi"
                          required
                        />
                        {errors.nome && <span className="text-xs text-[#C36B4B] mt-0.5">{errors.nome}</span>}
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-[#3d2525]">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full padding-3 p-3.5 text-sm text-[#2A1C1C] bg-[#F7F1E8] border border-[#3d2525]/15 rounded outline-none focus:border-[#3d2525] focus:bg-white focus:ring-1 focus:ring-[#3d2525]/10 transition-all duration-200"
                          placeholder="es. nome@esempio.it"
                          required
                        />
                        {errors.email && <span className="text-xs text-[#C36B4B] mt-0.5">{errors.email}</span>}
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="telefono" className="text-xs font-semibold uppercase tracking-wider text-[#3d2525]">
                          Telefono *
                        </label>
                        <input
                          type="tel"
                          id="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          className="w-full padding-3 p-3.5 text-sm text-[#2A1C1C] bg-[#F7F1E8] border border-[#3d2525]/15 rounded outline-none focus:border-[#3d2525] focus:bg-white focus:ring-1 focus:ring-[#3d2525]/10 transition-all duration-200"
                          placeholder="es. +39 345 678910"
                          required
                        />
                        {errors.telefono && <span className="text-xs text-[#C36B4B] mt-0.5">{errors.telefono}</span>}
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="messaggio" className="text-xs font-semibold uppercase tracking-wider text-[#3d2525]">
                          Messaggio o Richiesta *
                        </label>
                        <textarea
                          id="messaggio"
                          rows={5}
                          value={formData.messaggio}
                          onChange={handleInputChange}
                          className="w-full padding-3 p-3.5 text-sm text-[#2A1C1C] bg-[#F7F1E8] border border-[#3d2525]/15 rounded outline-none focus:border-[#3d2525] focus:bg-white focus:ring-1 focus:ring-[#3d2525]/10 transition-all duration-200 resize-none"
                          placeholder="Scrivi qui i dettagli della tua richiesta di informazioni..."
                          required
                        />
                        {errors.messaggio && <span className="text-xs text-[#C36B4B] mt-0.5">{errors.messaggio}</span>}
                      </div>

                      {/* Privacy checkbox */}
                      <div className="md:col-span-2 mt-2">
                        <label htmlFor="privacy" className="flex items-start gap-3 text-xs md:text-sm text-[#2A1C1C]/80 cursor-pointer user-select-none">
                          <input
                            type="checkbox"
                            id="privacy"
                            checked={formData.privacy}
                            onChange={handleInputChange}
                            className="mt-1 accent-[#3d2525]"
                            required
                          />
                          <span>
                            Acconsento al trattamento dei dati personali secondo la{' '}
                            <span className="underline text-[#3d2525] font-medium hover:text-[#7C8B6F] transition-colors">
                              Privacy Policy
                            </span>
                            . *
                          </span>
                        </label>
                        {errors.privacy && <p className="text-xs text-[#C36B4B] mt-1">{errors.privacy}</p>}
                      </div>

                      {/* Submit */}
                      <div className="md:col-span-2 mt-4">
                        {submitError && (
                          <div className="p-3 mb-4 rounded bg-[#C36B4B]/10 border border-[#C36B4B]/25 text-xs text-[#C36B4B] font-medium text-center">
                            {submitError}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-4 px-6 bg-[#3d2525] text-[#F7F1E8] border border-[#3d2525] rounded font-semibold text-xs tracking-wider uppercase cursor-pointer hover:bg-transparent hover:text-[#3d2525] transition-all duration-300 focus:outline-none ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {isSubmitting ? 'Inscrizione/Invio in corso...' : 'Invia Messaggio di Richiesta'}
                        </button>
                      </div>

                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12 px-4 bg-[#FDFCFA] border border-[#7C8B6F]/20 rounded"
                    id="info-success"
                  >
                    <CheckCircle className="w-14 h-14 text-[#7C8B6F] mx-auto mb-4" />
                    <h3 className="font-serif text-2xl text-[#3d2525] font-semibold mb-3">Richiesta Ricevuta</h3>
                    <p className="text-sm md:text-base text-[#2A1C1C] max-w-lg mx-auto leading-relaxed mb-6">
                      Grazie! La tua richiesta è stata ricevuta. A breve riceverai un'email di conferma: ti chiediamo di attenderla per completare la richiesta.
                    </p>
                    <div className="mt-5 max-w-sm mx-auto flex flex-col gap-3">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow hover:scale-[1.01]"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.49-4.22c1.554.912 3.197 1.393 4.925 1.396 5.617 0 10.187-4.57 10.191-10.191.002-2.724-1.055-5.282-2.976-7.205C16.736 1.859 14.181.803 11.45.803c-5.626 0-10.2 4.574-10.203 10.194-.001 1.83.479 3.619 1.39 5.166L1.583 22l6.02-1.579zM17.17 14.18c-.28-.141-1.65-.814-1.905-.907-.255-.094-.44-.141-.626.141-.186.281-.72.907-.882 1.092-.162.186-.324.21-.605.068-.282-.14-.1.18-.783-.706-2.527-2.254-4.143-5.11-4.636-5.955-.162-.282-.017-.433.123-.574.127-.127.282-.329.424-.492.14-.162.187-.281.281-.469.095-.187.047-.351-.023-.492-.07-.141-.627-1.513-.859-2.074-.227-.546-.456-.472-.626-.48-.161-.008-.347-.01-.532-.01-.185 0-.486.07-.741.352-.255.281-.974.952-.974 2.321 0 1.369.996 2.69 1.112 2.846.115.156 1.954 2.985 4.735 4.187.661.286 1.178.457 1.581.585.664.211 1.268.181 1.745.11.533-.08 1.651-.676 1.883-1.328.232-.651.232-1.21.162-1.328-.07-.118-.255-.187-.536-.328z"/>
                        </svg>
                        Invia Messaggio su WhatsApp
                      </a>

                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ nome: '', email: '', telefono: '', messaggio: '', privacy: false });
                        }}
                        className="text-xs font-bold tracking-widest text-[#3d2525] hover:text-[#7C8B6F] transition-all duration-200 pb-0.5 uppercase cursor-pointer"
                      >
                        Invia un'altra richiesta
                      </button>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
