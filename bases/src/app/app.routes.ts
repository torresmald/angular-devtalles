import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';
import { DragonBallComponent } from './pages/dragon-ball/dragon-ball.component';
import { DragonBallSuperComponent } from './pages/dragon-ball-super/dragon-ball-super.component';

export const routes: Routes = [
  {
    path: '',
    component: CounterPageComponent,
  },
  {
    path: 'hero',
    component: HeroPageComponent,
  },
  {
    path: 'dragonball',
    component: DragonBallComponent,
  },
  {
    path: 'dragonball-super',
    component: DragonBallSuperComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
