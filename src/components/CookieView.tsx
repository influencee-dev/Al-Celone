/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, Shield, CheckCircle, Info, Settings } from 'lucide-react';

export default function CookieView() {
  return (
    <div className="bg-[#F7F1E8] min-h-screen pt-[95px] md:pt-[110px] text-[#2A1C1C]">
      
      {/* Policy Hero Header */}
      <section className="py-16 px-6 md:px-16 bg-gradient-to-br from-[#1c1010] to-[#3d2525] text-[#F7F1E8]">
        <div className="container mx-auto max-w-4xl text-center">
          <Settings className="w-16 h-16 mx-auto mb-4 text-[#7C8B6F]" />
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Informativa sui Cookie
          </h1>
          <p className="font-serif italic text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            Trasparenza sull'uso di file temporanei e impostazioni del browser
          </p>
          <div className="inline-block mt-4 bg-[#7C8B6F]/10 border border-[#7C8B6F]/20 rounded-full px-4 py-1 text-xs text-[#7C8B6F] font-mono tracking-wider uppercase">
            Ultimo aggiornamento: Maggio 2026
          </div>
        </div>
      </section>

      {/* Main content body */}
      <main className="py-20 px-6 md:px-16 container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Quick Info Sidebar */}
          <aside className="md:col-span-4 bg-[#EDE3D4] p-6 rounded-lg sticky top-28 border border-[#3d2525]/10 shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-[#3d2525] font-semibold border-b border-[#3d2525]/10 pb-2">
              Cos'è un Cookie?
            </h3>
            <p className="text-xs font-light leading-relaxed">
              Un cookie è un piccolo file di testo che un sito web salva sul tuo computer o dispositivo mobile quando lo visiti. Consente al sito di ricordare le tue azioni e preferenze (come, ad esempio, il consenso dato in precedenza) per evitare di doverle reinserire ogni volta.
            </p>

            <div className="bg-white/40 p-4 rounded text-xs gap-3 flex flex-col font-normal text-[#2A1C1C]">
              <span className="font-bold text-[#3d2525] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <Info size={14} className="text-[#C36B4B]" /> Sicurezza & Navigazione
              </span>
              <p className="leading-relaxed opacity-90">
                I nostri cookie tecnici non salvano informazioni sensibili (come password o carte di credito) e sono strettamente legati al funzionamento della pagina.
              </p>
            </div>
          </aside>

          {/* Full Policy Text */}
          <article className="md:col-span-8 space-y-8 text-charcoal-text font-light text-sm md:text-base leading-relaxed">
            
            {/* Sec 1 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#3d2525] flex items-center gap-2">
                <Shield size={20} className="text-[#7C8B6F]" /> 1. Uso dei Cookie su questo Sito
              </h2>
              <p>
                L'Agriturismo Al Celone utilizza cookie per rendere l'esperienza d'uso del sito semplice, sicura e rapida. Non utilizziamo cookie di profilazione volti a tracciare i comportamenti degli utenti a fini pubblicitari esterni su terze piattaforme commerciali.
              </p>
            </section>

            {/* Sec 2 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#3d2525] flex items-center gap-2">
                <CheckCircle size={20} className="text-[#7C8B6F]" /> 2. Tipologie di Cookie Utilizzate
              </h2>
              <p>
                Utilizziamo esclusivamente le seguenti tipologie di cookie:
              </p>
              
              <div className="space-y-4 mt-4">
                <div className="p-4 bg-white/50 border border-[#3d2525]/5 rounded">
                  <h3 className="font-serif text-base text-[#3d2525] font-semibold mb-1">
                    Cookie Tecnici Necessari (Sempre Attivi)
                  </h3>
                  <p className="text-xs md:text-sm">
                    Questi cookie sono indispensabili per consentire la corretta consultazione del sito web e abilitare il funzionamento dei form di prenotazione tavoli e camere. Ad esempio, memorizziamo le vostre preferenze di accettazione cookie espresse attraverso il popup/banner affinché la richiesta non si ripresenti ad ogni cambio di vista o ricaricamento di pagina.
                  </p>
                </div>

                <div className="p-4 bg-white/50 border border-[#3d2525]/5 rounded">
                  <h3 className="font-serif text-base text-[#3d2525] font-semibold mb-1">
                    Cookie di Terze Parti (Mappa Interattiva)
                  </h3>
                  <p className="text-xs md:text-sm">
                    La pagina Contatti ospita un iframe integrato ufficiale fornito da Google Maps a scopi informativi, per mostrare la geolocalizzazione dell'Agriturismo a Foggia. Google Maps potrebbe registrare statistiche anonime di visualizzazione o memorizzare preferenze geografiche sul vostro browser secondo le proprie politiche interne sui dati.
                  </p>
                </div>
              </div>
            </section>

            {/* Sec 3 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#3d2525] flex items-center gap-2">
                <Eye size={20} className="text-[#7C8B6F]" /> 3. Come Gestire o Cancellare i Cookie
              </h2>
              <p>
                La maggior parte dei browser internet consente di bloccare, gestire o eliminare i cookie memorizzati sul proprio computer in modo del tutto autonomo. Potete modificare le impostazioni del vostro browser per rifiutare l'installazione di nuovi cookie o cancellarli definitivamente.
              </p>
              <p>
                Scegliere di disattivare totalmente i cookie tecnici essenziali potrebbe compromettere l'esperienza fluida di navigazione e impedire il corretto completamento informatico dell'invio dei moduli di prenotazione nel nostro ristorante.
              </p>
              
              <div className="bg-[#EDE3D4]/40 p-4 rounded mt-4 border-l-2 border-[#7C8B6F]">
                <p className="text-xs">
                  Per saperne di più sulle opzioni di configurazione, consultate la guida di aiuto del vostro browser di navigazione di riferimento (Safari, Google Chrome, Mozilla Firefox, Microsoft Edge).
                </p>
              </div>
            </section>

          </article>
          
        </div>
      </main>

    </div>
  );
}
