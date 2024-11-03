import { Component } from '@angular/core';

import { CardListComponent } from './card-list/card-list.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, CardListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
