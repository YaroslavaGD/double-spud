import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardControllerService } from 'src/app/services/card-controller.service';

@Component({
  selector: 'app-cards-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards-status.component.html',
  styleUrl: './cards-status.component.scss',
})
export class CardsStatusComponent implements OnInit {
  cardsStatus: Card[] = [];
  lastMatchedPair: Card[] | null = null; // Последняя пара

  constructor(private cardControllerService: CardControllerService) {}

  ngOnInit(): void {
    this.cardControllerService.matchedCards$.subscribe((cards) => {
      this.cardsStatus = cards;
    });

    this.cardControllerService.lastMatchedPair$.subscribe((pair) => {
      this.lastMatchedPair = pair;
    });
  }
}
