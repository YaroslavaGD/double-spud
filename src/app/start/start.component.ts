import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  private audio = new Audio('assets/sounds/start-button.wav');

  constructor() {
    this.audio.load();
  }

  playSound(): void {
    this.audio.currentTime = 0;
    this.audio.play();
  }
}
