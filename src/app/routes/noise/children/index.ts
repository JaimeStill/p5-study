import { Route } from '@angular/router';

import { Graphing1dRoute } from './graphing-1d.route';
import { Noise2dRoute } from './noise-2d.route';
import { NoiseVsRandomRoute } from './noise-vs-random.route';

export const NoiseChildren = [
  Graphing1dRoute,
  Noise2dRoute,
  NoiseVsRandomRoute
];

export const NoiseRoutes: Route[] = [
  { path: 'noise-vs-random', component: NoiseVsRandomRoute },
  { path: 'graphing-1d', component: Graphing1dRoute },
  { path: 'noise-2d', component: Noise2dRoute },
  { path: '', redirectTo: 'noise-vs-random', pathMatch: 'prefix' },
  { path: '**', redirectTo: 'noise-vs-random', pathMatch: 'prefix' }
];
