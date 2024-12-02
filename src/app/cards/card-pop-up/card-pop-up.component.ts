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
  card: Card | null = null;
  isOpen: boolean = false;
  lastCards: Card[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private cardControllerService: CardControllerService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cardControllerService.matchedCards$.subscribe((cards) => {
        this.lastCards = cards;
      })
    );

    this.subscriptions.add(
      this.cardControllerService.isEndGame$.subscribe((isEnd) => {
        if (isEnd) {
          this.card = this.lastCards[this.lastCards.length - 1] || null;
          this.isOpen = true;
        }
      })
    );
  }

  onClose() {
    this.isOpen = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
