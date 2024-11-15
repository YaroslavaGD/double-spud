import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardControllerService } from 'src/app/services/card-controller.service';

@Component({
  selector: 'app-card-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-pop-up.component.html',
  styleUrl: './card-pop-up.component.scss'
})
export class CardPopUpComponent {
  card: Card | null = null;

  constructor(private cardControllerService: CardControllerService) {}

}
