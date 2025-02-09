import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardControllerService } from '../services/card-controller.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private cardControllerService: CardControllerService) {}

  onResetGame() {
    console.log('reset game');
    this.cardControllerService.resetGame();
  }
}
