import { Component } from '@angular/core';
import { Attribution } from '../../../models';
import { NoiseService } from '../../../services';

@Component({
  selector: 'noise-vs-random-route',
  templateUrl: 'noise-vs-random.route.html',
  providers: [ NoiseService ]
})
export class NoiseVsRandomRoute {
  attribution: Attribution = {
    title: 'noise() vs. random()',
    link: {
      url: 'https://thecodingtrain.com/learning/noise/0.3-noise-vs-random.html',
      label: 'The Coding Train - Perlin Noise Lesson #0.3'
    }
  } as Attribution;

  constructor(
    public noise: NoiseService
  ) { }
}
