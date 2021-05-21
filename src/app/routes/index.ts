import { Route } from '@angular/router';
import { ForcesRoute } from './forces';
import { HomeRoute } from './home';
import { IntroRoute } from './introduction';
import { PixelArrayRoute } from './pixel-array';
import { VectorsRoute } from './vectors';

import {
  NoiseRoute,
  NoiseChildren,
  NoiseRoutes
} from './noise';

export const RouteComponents = [
  ForcesRoute,
  HomeRoute,
  IntroRoute,
  ...NoiseChildren,
  NoiseRoute,
  PixelArrayRoute,
  VectorsRoute
]

export const Routes: Route[] = [
  { path: '', component: HomeRoute },
  { path: 'forces', component: ForcesRoute },
  { path: 'introduction', component: IntroRoute },
  { path: 'noise', component: NoiseRoute, children: NoiseRoutes },
  { path: 'pixel-array', component: PixelArrayRoute },
  { path: 'vectors', component: VectorsRoute },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]
