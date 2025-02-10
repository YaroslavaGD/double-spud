import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { initialCards } from '../data/cards-data';
import { Card } from '../models/card';
import { CardsCommands } from '../models/cardsCommands';

@Injectable({
  providedIn: 'root',
})
export class CardControllerService {
  private readonly initialCards: Card[] = initialCards;

  private gamesCardsSubject = new BehaviorSubject<Card[]>(
    this.shuffleAndDuplicateCards(this.initialCards)
  );
  private isChecking = false;
  private isHidingPair = false;
  private firstCard: Card | null = null;
  private secondCard: Card | null = null;

  private matchedCardsSubject = new BehaviorSubject<Card[]>([]);
  private lastMatchedPairSubject = new BehaviorSubject<Card[]>([]);
  private isEndGameSubject = new BehaviorSubject<boolean>(false);

  gamesCard$ = this.gamesCardsSubject.asObservable();
  matchedCards$ = this.matchedCardsSubject.asObservable();
  lastMatchedPair$ = this.lastMatchedPairSubject.asObservable();
  isEndGame$ = this.isEndGameSubject.asObservable();

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
      this.shuffleAndDuplicateCards(this.initialCards)
    );
    this.matchedCardsSubject.next([]);
    this.lastMatchedPairSubject.next([]);
    this.isChecking = false;
    this.isHidingPair = false;
    this.firstCard = null;
    this.secondCard = null;
    this.isEndGameSubject.next(false);
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
   * Duplicates and shuffles initial cards to create game-ready cards
   */
  private shuffleAndDuplicateCards(cards: Card[]): Card[] {
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
    }, 500);
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

      if (this.isLastPair()) {
        this.lastMatchedPairSubject.next([this.firstCard!]);
        this.checkEndGame();
      } else {
        this.addMatchedCard(card);
      }

      this.clearSelectedCards();
      this.isHidingPair = false;
    }, 500);
  }

  private isLastPair(): boolean {
    const matchedCount = this.matchedCardsSubject.value.length;
    return matchedCount === this.initialCards.length - 1;
  }
  private hasLastMatchedPair(): boolean {
    if (this.lastMatchedPairSubject.value.length > 0) {
      console.log('true has par');
      console.log(this.lastMatchedPairSubject.value);
      return true;
    }
    console.log('false has par');
    return false;
  }
  /**
   * Adds a card to the matched cards list if not already present
   * @param card - Card to add
   */
  private addMatchedCard(card: Card) {
    const matchedCards = this.matchedCardsSubject.value;

    if (!matchedCards.some((matchedCard) => matchedCard.id === card.id)) {
      this.matchedCardsSubject.next([...matchedCards, card]);
    }
  }

  /**
   * Checks if the game is over and updates the end game state
   */
  private checkEndGame() {
    if (this.hasLastMatchedPair()) {
      this.isEndGameSubject.next(true);
    }
  }
}
