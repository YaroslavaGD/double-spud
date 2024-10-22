import { Injectable } from '@angular/core';

import { Card } from './models/card';

@Injectable({
  providedIn: 'root',
})
export class CardControllerService {
  cards: Card[] = [
    {
      id: 0,
      name: 'Prince Spudrick the Wise',
      houses: 100,
      description: `Мудрый, спокойный и добрый правитель 100 домов.
        Если тебе нужен заботливый принц, который слушает и понимает, Spudrick — твой выбор.
        Его королевство славится лучшими картофельными пирогами на свете!`,
    },
    {
      id: 1,
      name: 'Prince Chipoleon the Bold',
      houses: 10,
      description: `Маленькое королевство, но большие амбиции.
        Chipoleon готов рискнуть всем ради славы и богатства.
        Он любит вызовы, но может оказаться слишком дерзким для некоторых.
        Ты готова к приключениям?`,
    },
    {
      id: 2,
      name: 'Prince Hashmund the Adventurer',
      houses: 88,
      description: `Бесстрашный воин, который жаждет приключений.
        Его 88 домов под его защитой, и он всегда в поисках новых побед.
        Хочешь присоединиться к его приключениям и разделить его славу?`,
    },
    {
      id: 3,
      name: 'Prince Friesian the Golden',
      houses: 347,
      description: `Успех, богатство и золото — его мир.
        Friesian управляет 347 домами и точно знает, как достичь вершин.
        Но может ли он предложить что-то, кроме богатства? Только ты сможешь узнать.`,
    },
    {
      id: 4,
      name: 'Prince Bakedan the Feastmaster',
      houses: 875,
      description: `Добродушный и весёлый принц, который обожает устраивать пиры.
        Его королевство из 875 домов — рай для гурманов.
        Если тебе нравятся уют и веселье, Bakedan приглашает тебя разделить с ним его роскошные застолья!`,
    },
    {
      id: 5,
      name: 'Prince Russeton the Strong',
      houses: 1577,
      description: `Суровый и могучий правитель, который не знает поражений.
        Его королевство из 1577 домов — настоящая крепость.
        Russeton может защитить тебя от любых угроз, но готов ли ты к его холодной строгости?`,
    },
    {
      id: 6,
      name: 'Prince Taterkins the Charming',
      houses: 6,
      description: `Маленькое королевство и большое обаяние.
        Taterkins знает, как добиться своего, несмотря на свои скромные 6 домов.
        Он полагается на хитрость и шарм. Может, меньше значит больше?`,
    },
    {
      id: 8,
      name: 'Prince Totaro the Mysterious',
      houses: 34,
      description: `Загадочный принц из земель, о которых ходят легенды.
        Его королевство из 34 домов скрыто в тумане, а его прошлое покрыто тайнами.
        Тебе интересно узнать его секреты?`,
    },
  ];

  getAllCards(): Card[] {
    return this.cards;
  }

  getGamesCards(): Card[] {
    return this.cards
      .flatMap((card) => [card, { ...card }])
      .sort(() => Math.random() - 0.5);
  }

  getCardById(id: number): Card | undefined {
    return this.cards.find((card) => card.id === id);
  }
}
