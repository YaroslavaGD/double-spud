import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/models/card';
import { CardControllerService } from 'src/app/services/card-controller.service';

@Component({
  selector: 'app-card-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-pop-up.component.html',
  styleUrl: './card-pop-up.component.scss',
})
export class CardPopUpComponent implements OnInit, OnDestroy {
  private clickSound = new Audio('/assets/sounds/start-button.wav');
  private endSound = new Audio('/assets/sounds/end-game.wav');
  card: Card | null = null;
  isOpen: boolean = false;
  lastCards: Card[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private cardControllerService: CardControllerService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cardControllerService.lastMatchedPair$.subscribe((cards) => {
        this.lastCards = cards;
      })
    );

    this.subscriptions.add(
      this.cardControllerService.isEndGame$.subscribe((isEnd) => {
        if (isEnd) {
          this.playEndSound();
          this.card = this.lastCards[this.lastCards.length - 1] || null;
          this.isOpen = true;
        }
      })
    );
  }

  onClose() {
    this.isOpen = false;
    this.resetGame();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private resetGame() {
    this.playClickSound();
    this.cardControllerService.resetGame();
  }

  private playEndSound() {
    this.endSound.currentTime = 0;
    this.endSound.play();
  }

  private playClickSound() {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
  }
}
