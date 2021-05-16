import {
  Injectable,
  ElementRef
} from '@angular/core';

import * as p5 from 'p5';

@Injectable()
export class NoiseService {
  private setBackground = (s: p5) => s.background(51);
  private setFill = (s: p5) => s.fill(2, 165, 255);
  private setStroke = (s: p5) => s.stroke(2, 165, 255);

  createRandom = (element: ElementRef): p5 => {
    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(400, 400)
      }

      s.draw = () => {
        this.setBackground(s)
        this.setFill(s);

        let x = s.random(s.width);

        s.ellipse(x, 200, 24, 24);
      }
    }, element.nativeElement);
  }

  createNoise = (element: ElementRef): p5 => {
    let xoff = 0;

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(400, 400)
      }

      s.draw = () => {
        this.setBackground(s);
        this.setFill(s);

        let x = s.map(s.noise(xoff), 0, 1, 0, s.width);

        xoff += 0.01;

        s.ellipse(x, 200, 24, 24);
      }
    }, element.nativeElement);
  }

  noiseGraph = (element: ElementRef): p5 => {
    let inc = 0.01;
    let start = 0;

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(400, 400)
      }

      s.draw = () => {
        this.setBackground(s);
        s.noFill();
        s.beginShape();

        let xoff = start;

        for (let x = 0; x < s.width; x++) {
          this.setStroke(s);
          let y = s.noise(xoff) * s.height;
          s.vertex(x, y);

          xoff += inc;
        }

        s.endShape();

        start += inc;
      }
    }, element.nativeElement);
  }

  noisySin = (element: ElementRef): p5 => {
    let inc = 0.01;
    let start = 0;

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(400, 400);
      }

      s.draw = () => {
        this.setBackground(s);
        s.noFill();
        s.beginShape();

        let xoff = start;

        for (let x = 0; x < s.width; x++) {
          this.setStroke(s);

          let ns = s.map(s.noise(xoff), 0, 1, -50, 50);
          let sn = s.map(s.sin(xoff), -1, 1, 0, s.height);
          let y = sn + ns;

          s.vertex(x, y);

          xoff += inc;
        }

        s.endShape();

        start += inc;
      }
    }, element.nativeElement);
  }

  yAxis = (element: ElementRef): p5 => {
    let xoff1 = 0;
    let xoff2 = 10000;

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(400, 400);
      }

      s.draw = () => {
        this.setBackground(s);
        this.setFill(s);

        let x = s.map(s.noise(xoff1), 0, 1, 0, s.width);
        let y = s.map(s.noise(xoff2), 0, 1, 0, s.height);

        xoff1 += 0.01;
        xoff2 += 0.01;

        s.ellipse(x, y, 24, 24);
      }
    }, element.nativeElement);
  }

  tvStatic = (element: ElementRef): p5 => {
    let inc = 0.01;

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(400, 400);
        s.pixelDensity(1);
      }

      s.draw = () => {
        s.loadPixels();

        for (let x = 0; x < s.width; x++) {
          for (let y = 0; y < s.height; y++) {
            let index = (x + y * s.width) * 4;
            let r = s.random(255);

            s.pixels[index + 0] = r;
            s.pixels[index + 1] = r;
            s.pixels[index + 2] = r;
            s.pixels[index + 3] = 255;
          }
        }

        s.updatePixels();
      }
    }, element.nativeElement);
  }

  noise2d = (element: ElementRef): p5 => {
    let inc = 0.01;

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(400, 400);
        s.noiseSeed(s.random(0, 255));
        s.pixelDensity(1);
      }

      s.draw = () => {
        let yoff = 0;
        s.loadPixels();

        for (let y = 0; y < s.height; y++) {
          let xoff = 0;

          for (let x = 0; x < s.width; x++) {
            let index = (x + y * s.width) * 4;

            let r = s.noise(xoff, yoff) * 255;

            s.pixels[index + 0] = r;
            s.pixels[index + 1] = r;
            s.pixels[index + 2] = r;
            s.pixels[index + 3] = 255;

            xoff += inc;
          }

          yoff += inc;
        }

        s.updatePixels();
      }
    }, element.nativeElement);
  }
}
