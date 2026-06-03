/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dish, Room } from './types';

export const RESTAURANT_MENU: Dish[] = [
  {
    id: 'antipasto-1',
    category: 'antipasti',
    name: 'Il Gran Tagliere Al Celone',
    description: 'Selezione guidata di salumi artigianali di Capitanata, formaggi biologici a latte crudo della Daunia, bruschette all’olio extravergine d’oliva di nostra produzione e verdure sott’olio del nostro orto.',
    isBio: true
  },
  {
    id: 'antipasto-2',
    category: 'antipasti',
    name: 'Purea di Fave e Cicoria Selvatica',
    description: 'Il piatto simbolo della civiltà contadina pugliese: fave cotte a fuoco lento nella pignata di terracotta e cicoria selvatica scottata, condito con un generoso filo d’olio novello.',
    isBio: true,
    isVegetarian: true,
    isGlutenFree: true
  },
  {
    id: 'antipasto-3',
    category: 'antipasti',
    name: 'Fiori di Zucca in Pastella Leggera',
    description: 'Fiori di zucca freschi raccolti all’alba, ripieni di ricotta di pecora locale ed erbe aromatiche, fritti in pastella croccante all’acqua gassata.',
    isBio: true,
    isVegetarian: true
  },
  {
    id: 'primo-1',
    category: 'primi',
    name: 'Orecchiette di Grano Arso alle Cime di Rapa',
    description: 'Pasta fresca fatta a mano secondo l’antica ricetta di Foggia, con cime di rapa coltivate nel nostro terreno biologico, aglio, un tocco di peperoncino e filetti di acciughe saltate.',
    isBio: true
  },
  {
    id: 'primo-2',
    category: 'primi',
    name: 'Trofie al Pesto di Mandorle di Capitanata e Basilico',
    description: 'Pasta fresca con pesto artigianale di basilico fresco del nostro orto, mandorle tostate della Daunia, pecorino grattugiato e olio d’oliva biologico Al Celone.',
    isBio: true,
    isVegetarian: true
  },
  {
    id: 'primo-3',
    category: 'primi',
    name: 'Cavatelli della Nonna con Ragù della Capitanata',
    description: 'Pasta di semola di grano duro tirata a mano, condita con un saporito ragù misto cotto lentamente per oltre sei ore con pomodori pelati nostrani.',
    isBio: true
  },
  {
    id: 'secondo-1',
    category: 'secondi',
    name: 'Agnello al Forno con Patate e Lampascioni',
    description: 'Costolette e spalla di agnello nostrano aromatizzate al rosmarino e aglio, cotte lentamente al forno con patate di campagna e lampascioni pugliesi dal tipico gusto amarognolo.',
    isGlutenFree: true
  },
  {
    id: 'secondo-2',
    category: 'secondi',
    name: 'Arrosto Misto alla Brace del Tavoliere',
    description: 'Grigliata mista di carne locale cotta esclusivamente su legna d’ulivo: bombette pugliesi ripiene, salsiccia di maialino nero e capocollo marinato alle erbe.',
    isGlutenFree: true
  },
  {
    id: 'secondo-3',
    category: 'secondi',
    name: 'Torcinelli Foggiani alla Griglia',
    description: 'La specialità foggiana per eccellenza: involtini di fegato e animelle avvolti in budello naturale, grigliati su brace viva e profumati col limone del Gargano.',
    isGlutenFree: true
  },
  {
    id: 'dolce-1',
    category: 'dolci',
    name: 'Cartellate al Vincotto di Fichi',
    description: 'Sfoglia croccante al profumo di cannella e anice, fritta e immersa nel prelibato vincotto di fichi caldi di nostra produzione rurale.',
    isBio: true,
    isVegetarian: true
  },
  {
    id: 'dolce-2',
    category: 'dolci',
    name: 'Torta del Contadino con Crema e Amarene selvatiche',
    description: 'Frolla morbida fatta in casa con uova fresche del nostro pollaio, ripiena di una delicata crema pasticcera e amarene sciroppate locali.',
    isVegetarian: true
  },
  {
    id: 'dolce-3',
    category: 'dolci',
    name: 'Semifreddo alla Mandorla di Puglia',
    description: 'Dolce al cucchiaio fresco e vellutato con mandorle pugliesi pralinate tritate e colata di cioccolato fondente caldo.',
    isVegetarian: true,
    isGlutenFree: true
  }
];

export const AGRITURISMO_ROOMS: Room[] = [
  {
    id: 'room-l-ulivo',
    name: 'Stanza L’Ulivo',
    description: 'Accogliente e riparata da spesse mura in tufo rurale, evoca la tranquillità delle nostre piante secolari. Dispone di un terrazzo privato coperto che si affaccia direttamente sul nostro uliveto biologico.',
    capacity: '2 Persone (Letto Matrimoniale)',
    pricePerNight: '€85 / Notte',
    amenities: ['Bagno Privato', 'Aria Condizionata', 'Wi-Fi Gratuito', 'Colazione Inclusa', 'Ingresso Indipendente'],
    imageUrl: './images/camera1.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200'
  },
  {
    id: 'room-il-grano',
    name: 'Stanza Il Grano',
    description: 'Ampia e luminosissima, caratterizzata da caldi arredi in legno antico e stoffe grezze color crema. Finestre panoramiche a battente offrono viste indimenticabili sulla distesa dorata del Tavoliere.',
    capacity: '2-3 Persone (Matrimoniale + Letto Singolo)',
    pricePerNight: '€95 / Notte',
    amenities: ['Bagno Privato', 'Aria Condizionata', 'Wi-Fi Gratuito', 'Colazione Inclusa', 'TV Flat Screen', 'Frigobar'],
    imageUrl: './images/camera2.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200'
  },
  {
    id: 'room-il-melograno',
    name: 'Stanza Il Melograno (Family)',
    description: 'La soluzione ideale per famiglie o piccoli gruppi che cercano il massimo comfort rurale. Composta da due ambienti separati comunicanti, rifiniti in pietra a vista e dotati di un giardino privato attrezzato.',
    capacity: '2-4 Persone (Matrimoniale + 2 Letti Singoli)',
    pricePerNight: '€130 / Notte',
    amenities: ['Doppio Bagno', 'Giardino Privato', 'Aria Condizionata', 'Wi-Fi Gratuito', 'Colazione Inclusa', 'Angolo Tisane', 'Cassaforte'],
    imageUrl: './images/camera3.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200'
  },
  {
    id: 'room-la-spiga',
    name: 'Junior Suite La Spiga',
    description: 'La stanza più romantica e spaziosa dell’Agriturismo, dotata di soffitto con travi a vista originali e un camino decorativo storico in pietra calcarea. Perfetta per coppie in fuga d’amore contadino.',
    capacity: '2 Persone (Letto King Size)',
    pricePerNight: '€110 / Notte',
    amenities: ['Bagno Suite con Vasca', 'Area Salotto', 'Aria Condizionata', 'Wi-Fi Gratuito', 'Colazione in camera', 'Macchina Caffè espresso', 'Ingresso Indipendente'],
    imageUrl: './images/camera4.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200'
  }
];

export const GALLERY_PHOTOS = [
  { url: './images/galleria-grano.jpg', fallback: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1200', title: 'I nostri campi di grano al tramonto' },
  { url: './images/galleria-antipasti.jpg', fallback: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200', title: 'Tavolozza rurale di antipasti genuini' },
  { url: './images/galleria-uliveto.jpg', fallback: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200', title: 'Uliveto secolare biologico' },
  { url: './images/galleria-orecchiette.jpg', fallback: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200', title: 'Le celebri orecchiette tirate a mano' },
  { url: './images/galleria-giardino.jpg', fallback: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1200', title: 'Il giardino fiorito dell’agriturismo' },
  { url: './images/galleria-camere.jpg', fallback: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200', title: 'Relax rustico nelle nostre camere' }
];
