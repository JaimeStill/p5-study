import { Component } from '@angular/core';
import { Attribution } from '../../../models';
import { NoiseService } from '../../../services';

@Component({
  selector: 'noise-2d-route',
  templateUrl: 'noise-2d.route.html',
  providers: [ NoiseService ]
})
export class Noise2dRoute {
  attribution: Attribution = {
    title: '2D Noise',
    link: {
      url: 'https://thecodingtrain.com/learning/noise/0.5-2d-noise.html',
      label: 'The Coding Train - Perlin Noise Lesson #0.5'
    }
  } as Attribution;

  constructor(
    public noise: NoiseService
  ) { }
}
