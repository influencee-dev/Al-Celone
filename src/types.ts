/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppView = 'home' | 'cucina' | 'camere' | 'contatti' | 'privacy' | 'cookie';

export interface TableBooking {
  nome: string;
  email: string;
  telefono: string;
  persone: number;
  data: string;
  ora: string;
  note: string;
  privacy: boolean;
}

export interface RoomBooking {
  nome: string;
  email: string;
  telefono: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  ospiti: number;
  note: string;
  privacy: boolean;
}

export interface ContactMessage {
  nome: string;
  email: string;
  oggetto: string;
  messaggio: string;
  privacy: boolean;
}

export interface Dish {
  id: string;
  category: 'antipasti' | 'primi' | 'secondi' | 'dolci' | 'bevande';
  name: string;
  description: string;
  isBio?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: string;
  pricePerNight: string;
  amenities: string[];
  imageUrl: string;
  fallbackUrl?: string;
}
