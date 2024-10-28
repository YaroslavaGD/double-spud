import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Card } from '../models/card';
import { CardsCommands } from '../models/cardsCommands';
import { CardControllerService } from '../services/card-controller.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card!: Card;
  constructor(private cardControllerService: CardControllerService) {}

  displayDetails() {
    const command = this.cardControllerService.checkCard(this.card);

    switch (command) {
      case CardsCommands.OPEN_FIRST:
        break;
      case CardsCommands.FOUND_IDENTICAL:
        break;
      case CardsCommands.CLOSE_BOTH:
        break;
      case CardsCommands.FIRST_CARD_ALREADY_OPEN:
        break;
      default:
        break;
    }
  }
}
