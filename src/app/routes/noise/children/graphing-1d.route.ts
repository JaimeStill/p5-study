import { Component } from '@angular/core';
import { Attribution } from '../../../models';
import { NoiseService } from '../../../services';

@Component({
  selector: 'graphing-1d-route',
  templateUrl: 'graphing-1d.route.html',
  providers: [ NoiseService ]
})
export class Graphing1dRoute {
  attribution: Attribution = {
    title: 'Graphing 1D Perlin Noise',
    link: {
      url: 'https://thecodingtrain.com/learning/noise/0.4-graphing-1d.html',
      label: 'The Coding Train - Perlin Noise Lesson #0.4'
    }
  }

  constructor(
    public noise: NoiseService
  ) { }
}
