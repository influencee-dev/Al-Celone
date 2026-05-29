/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Eye, Lock, FileText, UserCheck } from 'lucide-react';

export default function PrivacyView() {
  return (
    <div className="bg-[#F7F1E8] min-h-screen pt-24 text-[#2A1C1C]">
      
      {/* Policy Hero Header */}
      <section className="py-16 px-6 md:px-16 bg-gradient-to-br from-[#1c1010] to-[#3d2525] text-[#F7F1E8]">
        <div className="container mx-auto max-w-4xl text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-[#7C8B6F]" />
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Informativa sulla Privacy
          </h1>
          <p className="font-serif italic text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            La trasparenza prima di tutto: come proteggiamo e valorizziamo i vostri dati personali
          </p>
          <div className="inline-block mt-4 bg-[#7C8B6F]/10 border border-[#7C8B6F]/20 rounded-full px-4 py-1 text-xs text-[#7C8B6F] font-mono tracking-wider uppercase">
            Ultimo aggiornamento: Maggio 2026
          </div>
        </div>
      </section>

      {/* Main content body */}
      <main className="py-20 px-6 md:px-16 container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Quick Summary Sidebar */}
          <aside className="md:col-span-4 bg-[#EDE3D4] p-6 rounded-lg sticky top-28 border border-[#3d2525]/10 shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-[#3d2525] font-semibold border-b border-[#3d2525]/10 pb-2">
              Punti Chiave
            </h3>
            
            <ul className="space-y-4 text-xs font-light leading-relaxed">
              <li className="flex gap-2 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C8B6F] shrink-0 mt-1.5" />
                <div>
                  <strong className="text-[#3d2525]">Nessun abuso:</strong> Usiamo i vostri contatti solo per gestire pranzi, cene o pernottamenti.
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C8B6F] shrink-0 mt-1.5" />
                <div>
                  <strong className="text-[#3d2525]">Sicurezza:</strong> Crittografia e protocolli moderni per non disperdere le informazioni personali.
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C8B6F] shrink-0 mt-1.5" />
                <div>
                  <strong className="text-[#3d2525]">I vostri diritti:</strong> Potete richiedere l'eliminazione dei vostri dati personali in qualsiasi momento inviando una mail.
                </div>
              </li>
            </ul>

            <div className="bg-white/40 p-4 rounded text-xs gap-3 flex flex-col font-normal text-[#2A1C1C]">
              <span className="font-bold text-[#3d2525] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <Lock size={14} className="text-[#C36B4B]" /> Titolare del Trattamento
              </span>
              <p className="leading-relaxed opacity-90">
                Agriturismo Al Celone<br />
                Via San Severo km.4<br />
                71121 Foggia (FG)<br />
                E-mail: <a href="mailto:info@alcelone.it" className="underline hover:text-[#7C8B6F] transition-colors">info@alcelone.it</a>
              </p>
            </div>
          </aside>

          {/* Full Legal Text */}
          <article className="md:col-span-8 space-y-8 text-charcoal-text font-light text-sm md:text-base leading-relaxed">
            
            {/* Sec 1 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#3d2525] flex items-center gap-2">
                <FileText size={20} className="text-[#7C8B6F]" /> 1. Introduzione
              </h2>
              <p>
                Benvenuti su Agriturismo Al Celone. Per noi, la protezione dei vostri dati personali è di fondamentale importanza. Questa informativa descrive le modalità con cui raccogliamo, conserviamo, utilizziamo e proteggiamo i dati personali forniti dagli utenti che visitano il nostro sito web o compilano form di prenotazione di tavoli e camere.
              </p>
              <p>
                Rispettiamo l'attuale normativa vigente sul trattamento dei dati personali, incluso il Regolamento Generale sulla Protezione dei Dati dell'Unione Europea (GDPR, Regolamento UE 2016/679).
              </p>
            </section>

            {/* Sec 2 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#3d2525] flex items-center gap-2">
                <Eye size={20} className="text-[#7C8B6F]" /> 2. Dati che Raccogliamo
              </h2>
              <p>
                Il corretto funzionamento della nostra gestione dei servizi contadini richiede la raccolta di alcuni dati personali limitandosi esclusivamente a quanto necessario per soddisfare le vostre richieste:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong className="text-[#3d2525]">Modulo Prenotazione Tavoli:</strong> Nome, E-mail, Numero di telefono, Numero di persone, Data e ora del pranzo/cena, eventuali note/allergie fornite spontaneamente.
                </li>
                <li>
                  <strong className="text-[#3d2525]">Modulo Prenotazione Camere:</strong> Nome, E-mail, Numero di telefono, Tipo di camera preferita, Date di check-in e check-out, Numero di ospiti, eventuali note.
                </li>
                <li>
                  <strong className="text-[#3d2525]">Modulo Richiesta Informazioni / Contatti:</strong> Nome, E-mail, Numero di telefono, Messaggio formulato liberamente dall'utente.
                </li>
                <li>
                  <strong className="text-[#3d2525]">Dati tecnici di navigazione:</strong> Indirizzi IP o nomi a dominio dei computer utilizzati dagli utenti, dettagli di navigazione attraverso l'uso di cookie (si veda la specifica Informativa Cookie).
                </li>
              </ul>
            </section>

            {/* Sec 3 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#3d2525] flex items-center gap-2">
                <Lock size={20} className="text-[#7C8B6F]" /> 3. Finalità del Trattamento
              </h2>
              <p>
                I dati raccolti saranno utilizzati esclusivamente per le seguenti finalità:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>
                  Gestire le vostre prenotazioni dei tavoli della cucina e l'assegnazione delle camere per i soggiorni, nonché inviare le comunicazioni di conferma.
                </li>
                <li>
                  Rispondere prontamente alle richieste inviate tramite il modulo di contatto o tramite i canali mail ufficiali dell'Agriturismo.
                </li>
                <li>
                  Adempiere ad obblighi legali e fiscali derivanti dall'attività ricettiva o volti a garantire la sicurezza del nostro sistema informatico.
                </li>
              </ol>
              <p>
                Non utilizzeremo mai i vostri dati personali per attività di spamming o invio di materiale promozionale invasivo senza il vostro esplicito consenso preventivo.
              </p>
            </section>

            {/* Sec 4 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-serif text-[#3d2525] flex items-center gap-2">
                <UserCheck size={20} className="text-[#7C8B6F]" /> 4. I Vostri Diritti (GDPR)
              </h2>
              <p>
                In ogni momento, avete pieno controllo sui dati personali in nostro possesso. In conformità con le norme del GDPR, avete il diritto di:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong className="text-[#3d2525]">Accesso:</strong> Richiedere la conferma dell'esistenza dei vostri dati e ottenerne una copia stampabile o leggibile.
                </li>
                <li>
                  <strong className="text-[#3d2525]">Rettifica:</strong> Ottenere la correzione tempestiva di dati inesatti o non aggiornati.
                </li>
                <li>
                  <strong className="text-[#3d2525]">Cancellazione (Diritto all'Oblio):</strong> Richiedere che i vostri dati personali archiviati vengano rimossi definitivamente dai nostri sistemi d'archivio informatici o cartacei.
                </li>
                <li>
                  <strong className="text-[#3d2525]">Limitazione:</strong> Opporvi al trattamento per motivi legittimi o richiederne la limitazione d'uso.
                </li>
              </ul>
              <p className="mt-4">
                Per esercitare questi diritti, vi basterà scrivere un'e-mail a <a href="mailto:info@alcelone.it" className="underline font-medium hover:text-[#7C8B6F]">info@alcelone.it</a>, indicando chiaramente la vostra richiesta. Risponderemo entro i tempi di legge previsti in materia di privacy.
              </p>
            </section>

          </article>
          
        </div>
      </main>

    </div>
  );
}
