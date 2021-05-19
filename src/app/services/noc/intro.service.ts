import {
  Injectable,
  ElementRef
} from '@angular/core';

import * as p5 from 'p5';

@Injectable()
export class IntroService {
  walker = (element: ElementRef, width: number, height: number): p5 => {
    class Walker {
      x: number = 0;
      y: number = 0;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }

      display = (s: p5) => {
        s.stroke(this.x, 0, this.y, 180);
        s.ellipse(this.x, this.y, 8, 8);
      }

      step = (s: p5) => {
        this.x += s.random(-1, 1);
        this.y += s.random(-1, 1);
      }
    }

    const w = new Walker(width / 2, height / 2);

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
        s.background(220);
      }

      s.draw = () => {
        w.step(s);
        w.display(s);
      }
    }, element.nativeElement);
  }

  steppingWalker = (element: ElementRef, width: number, height: number): p5 => {
    class Walker {
      x: number = 0;
      y: number = 0;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }

      keepInBounds = (value: number, size: number): number =>
        value < 0
          ? 0
          : value > size
            ? size
            : value;

      display = (s: p5) => {
        s.colorMode(s.HSB, 360, 100, 100);

        const hue = s.map(this.x, 0, s.width, 0, 360);
        const saturation = s.map(this.y, 0, s.height, 30, 100);

        s.stroke(hue, saturation, 100);
        s.fill(hue, saturation, 100, 0.5);
        s.ellipse(this.x, this.y, 4, 4);
      }

      step = (s: p5) => {
        const stepsize = s.random(0, 10);
        let stepx = s.random(-stepsize, stepsize);
        let stepy = s.random(-stepsize, stepsize);

        this.x = this.keepInBounds(this.x + stepx, s.width);
        this.y = this.keepInBounds(this.y + stepy, height);
      }
    }

    const w = new Walker(width / 2, height / 2);

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
        s.background(51);
      }

      s.draw = () => {
        w.step(s);
        w.display(s);
      }
    }, element.nativeElement);
  }

  randomDistribution = (element: ElementRef, width: number, height: number): p5 => {
    const randomCounts = Array.from({ length: 20 }, () => 0);

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
      }

      s.draw = () => {
        s.background(220);
        const index = Math.floor(s.random(randomCounts.length));
        randomCounts[index]++;

        s.stroke(0);
        s.fill(175);
        const w = s.width / randomCounts.length;

        randomCounts.forEach((count, i) => s.rect(i * w, s.height - count, w - 1, count));
      }
    }, element.nativeElement);
  }

  gaussNormal = (element: ElementRef, width: number, height: number): p5 => {
    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
        s.background(0);
        s.noStroke();
      }

      s.draw = () => {
        const x = s.randomGaussian(s.width / 2, s.width / 10);
        s.fill(x, 50);
        s.ellipse(x, s.height / 2, 8, 8);
      }
    }, element.nativeElement);
  }

  gauss2dNormal = (element: ElementRef, width: number, height: number): p5 => {
    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
        s.background(0);
        s.noStroke();
        s.colorMode(s.HSB, 360, 100, 100);
      }

      s.draw = () => {
        const x = s.randomGaussian(s.width / 2, s.width / 10);
        const y = s.randomGaussian(s.height / 2, s.height / 10);

        const hue = s.map(x, 0, width, 360, 0);
        const saturation = s.map(y, 0, height, 100, 0);
        s.fill(hue, saturation, 100, 0.8);
        s.ellipse(x, y, 8, 8);
      }
    }, element.nativeElement);
  }
}
