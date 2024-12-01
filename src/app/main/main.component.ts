import { Component } from '@angular/core';

import { CardListComponent } from '../cards/card-list/card-list.component';
import { CardPopUpComponent } from '../cards/card-pop-up/card-pop-up.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, CardListComponent, CardPopUpComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
