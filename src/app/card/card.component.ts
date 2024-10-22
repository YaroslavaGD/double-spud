import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Card } from '../models/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card!: Card;
  showDetails = false;

  displayDetails() {
    this.showDetails = !this.showDetails;
    // console.log('display details = ', this.card);
  }
}
