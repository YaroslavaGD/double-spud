import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Card } from '../../models/card';
import { CardControllerService } from '../../services/card-controller.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent implements OnInit {
  cardList: Card[] = [];

  constructor(private cardControllerService: CardControllerService) {}

  ngOnInit(): void {
    this.cardControllerService.gamesCard$.subscribe((cards) => {
      this.cardList = cards;
    });
  }
}
