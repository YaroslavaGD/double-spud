import { Injectable } from '@angular/core';

import { Card } from './models/card';

@Injectable({
  providedIn: 'root',
})
export class CardControllerService {
  cards: Card[] = [
    {
      id: 0,
      name: 'first card',
      houses: 100,
    },
    {
      id: 1,
      name: 'second card',
      houses: 10,
    },
    {
      id: 2,
      name: 'third card',
      houses: 88,
    },
    {
      id: 3,
      name: 'fourth card',
      houses: 347,
    },
    {
      id: 4,
      name: 'fifth card',
      houses: 875,
    },
    {
      id: 5,
      name: 'sixth card',
      houses: 1577,
    },
    {
      id: 6,
      name: 'seventh card',
      houses: 6,
    },
    {
      id: 8,
      name: 'eighth card',
      houses: 34,
    },
  ];

  getAllCards(): Card[] {
    return this.cards;
  }

  getCardById(id: number): Card | undefined {
    return this.cards.find((card) => card.id === id);
  }
}
