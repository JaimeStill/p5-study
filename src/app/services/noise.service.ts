import {
  Injectable,
  ElementRef
} from '@angular/core';

import * as p5 from 'p5';

@Injectable()
export class NoiseService {
  createRandom = (element: ElementRef) => {
    new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(400, 400)
      }

      s.draw = () => {
        s.background(51);

        let x = s.random(s.width);

        s.ellipse(x, 200, 24, 24);
      }
    }, element.nativeElement);
  }

  createNoise = (element: ElementRef) => {
    let xoff = 0;

    new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(400, 400)
      }

      s.draw = () => {
        s.background(51);

        let x = s.map(s.noise(xoff), 0, 1, 0, s.width);

        xoff += 0.01;

        s.ellipse(x, 200, 24, 24);
      }
    }, element.nativeElement);
  }
}
