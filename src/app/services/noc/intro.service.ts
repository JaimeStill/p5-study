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

  noiseWalker = (element: ElementRef, width: number, height: number): p5 => {
    class Walker {
      x: number = 0;
      y: number = 0;
      tx: number = 0;
      ty: number = 10000;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }

      display = (s: p5) => {
        s.colorMode(s.HSB, 360, 100, 100);

        const hue = s.map(this.x, 0, s.width, 0, 360);
        const saturation = s.map(this.y, 0, s.height, 30, 100);

        s.stroke(hue, saturation, 60);
        s.fill(hue, saturation, 100);
        s.ellipse(this.x, this.y, 8, 8);
      }

      step = (s: p5) => {
        this.x = s.map(s.noise(this.tx), 0, 1, 0, s.width);
        this.y = s.map(s.noise(this.ty), 0, 1, 0, s.height);

        this.tx += 0.01;
        this.ty += 0.01;
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

  noiseLandscape = (element: ElementRef, width: number, height: number): p5 => {
    class Landscape {
      w: number = 0;
      h: number = 0;
      scl: number = 0;
      cols: number = 0;
      rows: number = 0;
      z: number[][];
      zoff = 0.0;

      constructor(w: number, h: number, scl: number) {
        this.w = w;
        this.h = h;
        this.scl = scl;
        this.cols = w / scl;
        this.rows = h / scl;
        this.z = new Array(this.cols).fill(0).map(() => new Array(this.rows).fill(0));
      }

      calculate = (s: p5) => {
        let xoff = 0;

        for (let i = 0; i < this.cols; i++) {
          let yoff = 0;

          for (let j = 0; j < this.rows; j++) {
            this.z[i][j] = s.map(s.noise(xoff, yoff, this.zoff), 0, 1, -120, 120);

            yoff += 0.1;
          }

          xoff += 0.1;
        }

        this.zoff += 0.01;
      }

      render = (s: p5) => {
        for (let x = 0; x < this.z.length - 1; x++) {
          s.beginShape(s.TRIANGLE_STRIP);

          for (let y = 0; y < this.z[x].length; y++) {
            const currentElevation = this.z[x][y];
            const currentShade = s.map(currentElevation, -120, 120, 280, 0);
            const xCoordinate = x * this.scl - this.w / 2;
            const yCoordinate = y * this.scl - this.h / 2;

            s.stroke(0);
            s.fill(currentShade, 100, 100);
            s.vertex(xCoordinate, yCoordinate, this.z[x][y]);
            s.vertex(xCoordinate + this.scl, yCoordinate, this.z[x + 1][y]);
          }

          s.endShape();
        }
      }
    }

    const land = new Landscape(width, height, 20);
    let theta = 0.0;

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height, s.WEBGL);
        s.frameRate(60);
      }

      s.draw = () => {
        s.background(255);
        s.colorMode(s.HSB, 360, 100, 100);
        s.push();
        s.scale(0.8);
        s.rotateX(s.PI / 3);
        s.rotateZ(theta);
        land.render(s);
        s.pop();

        land.calculate(s);

        theta += 0.0025;
      }
    }, element.nativeElement);
  }
}
