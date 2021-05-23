import {
  Injectable,
  ElementRef
} from '@angular/core';

import * as p5 from 'p5';

@Injectable()
export class PixelService {
  private setBackground = (s: p5) => s.background(51);

  pixelArray = (element: ElementRef, width: number, height: number): p5 => {
    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);

        /*
          Disable pixel scaling for high density
          displays
        */
        s.pixelDensity(1);
      }

      s.draw = () => {
        this.setBackground(s);

        /*
          indicate that you're working with the pixels
        */
        s.loadPixels();

        // iterate through each vertical pixel
        for (let y = 0; y < s.height; y++) {
          // iterate through each horizontal pixel
          for (let x = 0; x < s.width; x++) {

            /*
              in s.pixels, each pixel is represented by
              four array elements:
              R - Red channel
              G - Green channel
              B - Blue channel
              A - Alpha channel

              this formula allows you to access the first
              channel element for the target pixel
            */
            let index = (x + y * s.width) * 4;

            /*
              set each channel for the target pixel
              based on the random value check
            */

            s.pixels[index] = x;
            s.pixels[index + 1] = 0;
            s.pixels[index + 2] = y;
            s.pixels[index + 3] = 255;
          }
        }

        /*
          indicate that pixel modification is complete
          and that the pixels should be updated
        */
        s.updatePixels();
      }
    }, element.nativeElement);
  }

  colorNoise = (element: ElementRef, width: number, height: number): p5 => {
    let roff = 0;
    let goff = 10000;
    let boff = 20000;
    let r = 0;
    let g = 0;
    let b = 0;

    const setColors = (s: p5) => {
      r = s.map(s.noise(roff), 0, 1, 0, 255);
      g = s.map(s.noise(goff), 0, 1, 0, 255);
      b = s.map(s.noise(boff), 0, 1, 0, 255);

      roff += 0.01;
      goff += 0.01;
      boff += 0.01;
    }

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
        s.pixelDensity(1);
        setColors(s);
      }

      s.draw = () => {
        this.setBackground(s);

        s.loadPixels();

        for (let y = 0; y < s.height; y++) {
          for (let x = 0; x < s.width; x++) {
            let index = (x + y * s.width) * 4;

            s.pixels[index] = r;
            s.pixels[index + 1] = g;
            s.pixels[index + 2] = b;
            s.pixels[index + 3] = 255;
          }
        }

        setColors(s);

        s.updatePixels();
      }
    }, element.nativeElement);
  }
}
