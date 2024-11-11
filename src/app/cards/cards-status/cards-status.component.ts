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

  constructor(private cardControllerService: CardControllerService) {}

  ngOnInit(): void {
    this.cardControllerService.matchedCards$.subscribe((cards) => {
      this.cardsStatus = cards;
    });
  }
}
