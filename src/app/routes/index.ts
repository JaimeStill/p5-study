import { Route } from '@angular/router';
import { HomeRoute } from './home';
import { PixelArrayRoute } from './pixel-array';

import {
  NoiseRoute,
  NoiseChildren,
  NoiseRoutes
} from './noise';

export const RouteComponents = [
  HomeRoute,
  ...NoiseChildren,
  NoiseRoute,
  PixelArrayRoute
]

export const Routes: Route[] = [
  { path: '', component: HomeRoute },
  { path: 'noise', component: NoiseRoute, children: NoiseRoutes },
  { path: 'pixel-array', component: PixelArrayRoute },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]
