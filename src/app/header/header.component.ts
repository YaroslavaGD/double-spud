import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardsStatusComponent } from '../cards/cards-status/cards-status.component';
import { CardControllerService } from '../services/card-controller.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CardsStatusComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private cardControllerService: CardControllerService) {}

  onResetGame() {
    console.log('reset game');
    this.cardControllerService.resetGame();
  }
}
