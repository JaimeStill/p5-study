import { Route } from '@angular/router';
import { HomeRoute } from './home';
import { IntroRoute } from './introduction';
import { PixelArrayRoute } from './pixel-array';

import {
  NoiseRoute,
  NoiseChildren,
  NoiseRoutes
} from './noise';

export const RouteComponents = [
  HomeRoute,
  IntroRoute,
  ...NoiseChildren,
  NoiseRoute,
  PixelArrayRoute
]

export const Routes: Route[] = [
  { path: '', component: HomeRoute },
  { path: 'introduction', component: IntroRoute },
  { path: 'noise', component: NoiseRoute, children: NoiseRoutes },
  { path: 'pixel-array', component: PixelArrayRoute },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]
