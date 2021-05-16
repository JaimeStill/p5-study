import { Route } from '@angular/router';
import { HomeRoute } from './home';

import {
  NoiseRoute,
  NoiseChildren,
  NoiseRoutes
} from './noise';

export const RouteComponents = [
  HomeRoute,
  ...NoiseChildren,
  NoiseRoute
]

export const Routes: Route[] = [
  { path: '', component: HomeRoute },
  { path: 'noise', component: NoiseRoute, children: NoiseRoutes },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]
