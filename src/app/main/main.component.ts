import { Component } from '@angular/core';

import { CardListComponent } from './card-list/card-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
