import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Card } from '../models/card';
import { CardsCommands } from '../models/cardsCommands';

@Injectable({
  providedIn: 'root',
})
export class CardControllerService {
  private readonly initialCards: Card[] = [
    {
      id: 0,
      arrayId: 0,
      name: 'Prince Spudrick the Wise',
      houses: 100,
      description: `Мудрый, спокойный и добрый правитель 100 домов.
        Если тебе нужен заботливый принц, который слушает и понимает, Spudrick — твой выбор.
        Его королевство славится лучшими картофельными пирогами на свете!`,
      isOpen: false,
      isVisible: true,
    },
    {
      id: 1,
      arrayId: 1,
      name: 'Prince Chipoleon the Bold',
      houses: 10,
      description: `Маленькое королевство, но большие амбиции.
        Chipoleon готов рискнуть всем ради славы и богатства.
        Он любит вызовы, но может оказаться слишком дерзким для некоторых.
        Ты готова к приключениям?`,
      isOpen: false,
      isVisible: true,
    },
    {
      id: 2,
      arrayId: 2,
      name: 'Prince Hashmund the Adventurer',
      houses: 88,
      description: `Бесстрашный воин, который жаждет приключений.
        Его 88 домов под его защитой, и он всегда в поисках новых побед.
        Хочешь присоединиться к его приключениям и разделить его славу?`,
      isOpen: false,
      isVisible: true,
    },
    {
      id: 3,
      arrayId: 3,
      name: 'Prince Friesian the Golden',
      houses: 347,
      description: `Успех, богатство и золото — его мир.
        Friesian управляет 347 домами и точно знает, как достичь вершин.
        Но может ли он предложить что-то, кроме богатства? Только ты сможешь узнать.`,
      isOpen: false,
      isVisible: true,
    },
    {
      id: 4,
      arrayId: 4,
      name: 'Prince Bakedan the Feastmaster',
      houses: 875,
      description: `Добродушный и весёлый принц, который обожает устраивать пиры.
        Его королевство из 875 домов — рай для гурманов.
        Если тебе нравятся уют и веселье, Bakedan приглашает тебя разделить с ним его роскошные застолья!`,
      isOpen: false,
      isVisible: true,
    },
    {
      id: 5,
      arrayId: 5,
      name: 'Prince Russeton the Strong',
      houses: 1577,
      description: `Суровый и могучий правитель, который не знает поражений.
        Его королевство из 1577 домов — настоящая крепость.
        Russeton может защитить тебя от любых угроз, но готов ли ты к его холодной строгости?`,
      isOpen: false,
      isVisible: true,
    },
    {
      id: 6,
      arrayId: 6,
      name: 'Prince Taterkins the Charming',
      houses: 6,
      description: `Маленькое королевство и большое обаяние.
        Taterkins знает, как добиться своего, несмотря на свои скромные 6 домов.
        Он полагается на хитрость и шарм. Может, меньше значит больше?`,
      isOpen: false,
      isVisible: true,
    },
    {
      id: 7,
      arrayId: 7,
      name: 'Prince Totaro the Mysterious',
      houses: 34,
      description: `Загадочный принц из земель, о которых ходят легенды.
        Его королевство из 34 домов скрыто в тумане, а его прошлое покрыто тайнами.
        Тебе интересно узнать его секреты?`,
      isOpen: false,
      isVisible: true,
    },
    {
      id: 8,
      arrayId: 8,
      name: 'Prince Pommes the Curious',
      houses: 42,
      description: `Prince Pommes, известный своей неуемной любознательностью, управляет 42 домами в живописной долине.
       Помме всегда готов на приключения и открытие чего-то нового.
       Его страсть к знаниям делает его отличным собеседником, но его постоянные вопросы могут иногда утомлять.
       Готова ли ты помочь ему в поисках захватывающих историй?`,
      isOpen: false,
      isVisible: true,
    },
  ];

  private gamesCardsSubject = new BehaviorSubject<Card[]>(
    this.shuffleAndDublicateCards(this.initialCards)
  );
  private isChecking = false;
  private isHidingPair = false;
  private firstCard: Card | null = null;
  private secondCard: Card | null = null;

  gamesCard$ = this.gamesCardsSubject.asObservable();

  /**
   * Main card check method - handles game card logic and state changes
   */
  checkCard(card: Card): CardsCommands {
    if (this.isCardCheckBlocked(card))
      return CardsCommands.FIRST_CARD_ALREADY_OPEN;

    this.openCard(card);

    if (!this.firstCard) {
      this.firstCard = card;
      this.isChecking = false;
      return CardsCommands.OPEN_FIRST;
    }

    if (!this.secondCard) {
      this.secondCard = card;
    }

    if (this.areIdenticalCards()) {
      this.hideMatchedCards(card);
      this.isChecking = false;
      return CardsCommands.FOUND_IDENTICAL;
    }

    if (this.secondCard!.id !== this.firstCard.id) {
      this.closeUnmatchedCards();
      return CardsCommands.CLOSE_BOTH;
    }

    return CardsCommands.ERROR_IN_DATA;
  }

  /**
   * Resets the game: reinitializes cards and clears selected state.
   */
  resetGame() {
    this.gamesCardsSubject.next(
      this.shuffleAndDublicateCards(this.initialCards)
    );
    this.isChecking = false;
    this.isHidingPair = false;
    this.firstCard = null;
    this.secondCard = null;
  }

  /**
   * Return all games cards
   */
  private getGamesCards(): Card[] {
    return this.gamesCardsSubject.value;
  }

  /**
   * Checks if two selected cards are identical
   */
  private areIdenticalCards(): boolean {
    return (
      this.secondCard?.id === this.firstCard?.id &&
      this.secondCard?.arrayId !== this.firstCard?.arrayId
    );
  }

  /**
   * Checks if card action is blocked
   */
  private isCardCheckBlocked(card: Card): boolean {
    return card.isOpen || this.isChecking || this.isHidingPair;
  }

  /**
   * Dublicates and shuffles initial cards to create game-ready cards
   */
  private shuffleAndDublicateCards(cards: Card[]): Card[] {
    return cards
      .flatMap((card) => [card, { ...card }])
      .sort(() => Math.random() - 0.5)
      .map((card, i) => ({ ...card, arrayId: i }));
  }

  /**
   * Clear both selected cards
   */
  private clearSelectedCards(): void {
    this.firstCard = null;
    this.secondCard = null;
    this.isChecking = false;
  }

  /**
   * Opens a given card and updates the game state
   */
  private openCard(card: Card): void {
    const updatedCard = { ...card, isOpen: true };

    this.isChecking = true;
    this.setCardsOpenState([updatedCard], true);
  }

  /**
   * Resets selected cards to their initial state if unmatched
   */
  private closeUnmatchedCards(): void {
    setTimeout(() => {
      if (this.firstCard && this.secondCard) {
        this.setCardsOpenState([this.firstCard, this.secondCard], false);
      }
      this.clearSelectedCards();
      this.isChecking = false;
    }, 1000);
  }

  /**
   * Updates the open state of specified cards and publishes the change
   * @param targetsCards - List of card for open
   * @param isOpen - Desired open state
   */
  private setCardsOpenState(targetsCards: Card[], isOpen: boolean): void {
    const updatedCards = this.getGamesCards().map((card) => {
      if (
        targetsCards.some((targetCard) => targetCard.arrayId === card.arrayId)
      ) {
        return { ...card, isOpen };
      }
      return card;
    });

    this.gamesCardsSubject.next(updatedCards);
  }

  /**
   * Hides matched cards from the game and updates the state
   */
  private hideMatchedCards(card: Card): void {
    if (this.isHidingPair) return; // предотвращаем вызов, если уже запущен процесс скрывания карт

    this.isHidingPair = true;
    setTimeout(() => {
      const updatedCards = this.getGamesCards().map((c) => {
        if (c.id === card.id) return { ...c, isVisible: false };
        return c;
      });
      this.gamesCardsSubject.next(updatedCards);
      this.clearSelectedCards();
      this.isHidingPair = false;
    }, 1000);
  }
}
