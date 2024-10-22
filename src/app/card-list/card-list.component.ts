import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CardComponent } from '../card/card.component';
import { CardControllerService } from '../card-controller.service';
import { Card } from '../models/card';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  cardControllerService: CardControllerService = inject(CardControllerService);
  cardList: Card[] = [];

  constructor() {
    this.cardList = this.cardControllerService.getGamesCards();
  }
}
