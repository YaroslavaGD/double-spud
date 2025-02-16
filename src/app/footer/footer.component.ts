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
  private clickSound = new Audio('assets/sounds/start-button.wav');
  constructor(private cardControllerService: CardControllerService) {}

  onResetGame() {
    this.playClickSound();
    this.cardControllerService.resetGame();
  }

  private playClickSound() {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
  }
}
