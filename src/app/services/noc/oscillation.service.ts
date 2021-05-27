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
      let xoff = 0;
      s.setup = () => {
        s.createCanvas(width, height);
        s.colorMode(s.HSB, 360, 100, 100);
      }

      s.draw = () => {
        s.background(0);
        s.fill(s.map(s.noise(xoff), 0, 1, 0, 360), 50, 100);
        s.stroke(0, 0, 80);

        s.rectMode(s.CENTER);
        s.translate(width / 2, height / 2);
        s.rotate(angle);

        s.line(-50, 0, 50, 0);
        s.ellipse(50, 0, 12, 12);
        s.ellipse(-50, 0, 12, 12);

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
        xoff += 0.01;
      }
    }, element.nativeElement);
  }

  moverRotation = (element: ElementRef, width: number, height: number): p5 => {
    class Mover extends p5.Vector {
      velocity = new p5.Vector();
      acceleration = new p5.Vector();

      mass: number = 0;
      angle: number = 0;
      aVelocity: number = 0;
      aAcceleration: number = 0;
      hue: number = 0;

      constructor(x: number, y: number, m: number, s: p5) {
        super();
        this.set(x, y);
        this.mass = m;
        this.hue = s.random(0, 360);

        this.velocity.set(s.random(-1, 1), s.random(-1, 1));
        this.acceleration.set(0, 0);
      }

      applyForce = (force: p5.Vector) => {
        const f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
      }

      update = (s: p5) => {
        this.velocity.add(this.acceleration);
        this.add(this.velocity);

        this.aAcceleration = this.acceleration.x / 10.0;
        this.aVelocity += this.aAcceleration;
        this.aVelocity = s.constrain(this.aVelocity, -0.1, 0.1);
        this.angle += this.aVelocity;

        this.acceleration.mult(0);
      }

      display = (s: p5) => {
        s.stroke(this.hue, 100, 100);
        s.fill(this.hue, 50, 100, .5);
        s.rectMode(s.CENTER);
        s.push();
        s.translate(this.x, this.y);
        s.rotate(this.angle);
        s.rect(0, 0, this.mass * 16, this.mass * 16);
        s.pop();
      }
    }

    class Attractor extends p5.Vector {
      mass: number = 0;
      g: number = 0;

      constructor(s: p5) {
        super();
        this.set(s.width / 2, s.height / 2);
        this.mass = 20;
        this.g = 0.4;
      }

      attract = (m: Mover, s: p5) => {
        const force = p5.Vector.sub(this, m);
        let distance = force.mag();
        distance = s.constrain(distance, 3.0, 20.0);
        force.normalize();
        const strength = (this.g * this.mass * m.mass) / (distance * distance);
        force.mult(strength);

        return force;
      }

      display = (s: p5) => {
        s.stroke(50, 30, 100);
        s.strokeWeight(2);
        s.fill(50, 50, 100, 0.6);
        s.ellipse(this.x, this.y, 48, 48);
      }
    }

    const movers = new Array<Mover>();
    let a: Attractor;

    return new p5((s: p5) => {
      s.setup = () => {
        s.colorMode(s.HSB, 360, 100, 100);
        s.createCanvas(width, height);
        s.background(0);

        for (let i = 0; i < 12; i++) {
          movers.push(new Mover(
            s.random(s.width),
            s.random(s.height),
            s.random(0.3, 2),
            s
          ))
        }

        a = new Attractor(s);
      }

      s.draw = () => {
        s.background(0, 0.25);

        a.display(s);

        movers.forEach(mover => {
          const force = a.attract(mover, s);
          mover.applyForce(force);

          mover.update(s);
          mover.display(s);
        });
      }
    }, element.nativeElement);
  }
}
