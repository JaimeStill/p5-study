import {
  AfterViewInit,
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';

import { NoiseService } from '../../../services';

@Component({
  selector: 'noise-vs-random-route',
  templateUrl: 'noise-vs-random.route.html',
  providers: [ NoiseService ]
})
export class NoiseVsRandomRoute implements AfterViewInit {
  @ViewChild('noiseCanvas', { static: true}) noiseCanvas!: ElementRef<HTMLElement>;
  @ViewChild('randomCanvas', { static: true }) randomCanvas!: ElementRef<HTMLElement>;

  constructor(
    private noise: NoiseService
  ) { }

  ngAfterViewInit() {
    this.noise.createRandom(this.randomCanvas);
    this.noise.createNoise(this.noiseCanvas);
  }
}
