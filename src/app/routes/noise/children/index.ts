import { Route } from '@angular/router';

import { NoiseVsRandomRoute } from './noise-vs-random.route';

export const NoiseChildren = [
  NoiseVsRandomRoute
];

export const NoiseRoutes: Route[] = [
  { path: 'noise-vs-random', component: NoiseVsRandomRoute },
  { path: '', redirectTo: 'noise-vs-random', pathMatch: 'prefix' },
  { path: '**', redirectTo: 'noise-vs-random', pathMatch: 'prefix' }
];
