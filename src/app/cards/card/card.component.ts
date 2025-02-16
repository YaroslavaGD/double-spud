import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Card } from '../../models/card';
import { CardsCommands } from '../../models/cardsCommands';
import { CardControllerService } from '../../services/card-controller.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card!: Card;
  private clickSound = new Audio('assets/sounds/menu-button-click.wav');
  private chewSound = new Audio('assets/sounds/chew.ogg');
  private hmphSound = new Audio('assets/sounds/hmph.wav');

  constructor(private cardControllerService: CardControllerService) {}

  displayDetails() {
    this.playClickSound();

    const command = this.cardControllerService.checkCard(this.card);

    switch (command) {
      case CardsCommands.OPEN_FIRST:
        break;
      case CardsCommands.FOUND_IDENTICAL:
        this.playChewSound();
        break;
      case CardsCommands.CLOSE_BOTH:
        this.playHmphSound();
        break;
      case CardsCommands.FIRST_CARD_ALREADY_OPEN:
        break;
      default:
        break;
    }
  }

  private playClickSound() {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
  }

  private playChewSound() {
    this.chewSound.currentTime = 0;
    this.chewSound.play();
  }

  private playHmphSound() {
    this.hmphSound.currentTime = 0;
    this.hmphSound.play();
  }
}
