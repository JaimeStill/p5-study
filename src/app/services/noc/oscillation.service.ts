import {
  Injectable,
  ElementRef
} from '@angular/core';

import * as p5 from 'p5';

@Injectable()
export class OscillationService {
  angularMotion = (element: ElementRef, width: number, height: number): p5 => {
    let angle = 0;
    let aVelocity = 0;
    let aAcceleration = 0.001;
    let ascend = true;

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
      }

      s.draw = () => {
        s.background(255);
        s.fill(175)
        s.stroke(0);

        s.rectMode(s.CENTER);
        s.translate(width / 2, height / 2);
        s.rotate(angle);

        s.line(-50, 0, 50, 0);
        s.ellipse(50, 0, 8, 8);
        s.ellipse(-50, 0, 8, 8);

        if (ascend) {
          if (aVelocity <= 0.2)
            aVelocity += aAcceleration;
          else {
            ascend = false;
            aVelocity -= aAcceleration;
          }
        } else {
          if (aVelocity >= -0.2)
            aVelocity -= aAcceleration;
          else {
            ascend = true;
            aVelocity += aAcceleration;
          }
        }

        angle += aVelocity;
      }
    }, element.nativeElement);
  }

  moverRotation = (element: ElementRef, width: number, height: number): p5 => {
    
    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
      }

      s.draw = () => {
      }
    }, element.nativeElement);
  }
}
