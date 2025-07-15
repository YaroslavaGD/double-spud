import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ScoreComponent } from './score/score.component';
import { StartComponent } from './start/start.component';

export const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    title: 'StartScreen',
  },
  {
    path: 'game',
    component: MainComponent,
    title: 'MainGame',
  },
  {
    path: 'score',
    component: ScoreComponent,
    title: 'Score',
  },
];
