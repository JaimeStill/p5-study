import {
  Injectable,
  ElementRef
} from '@angular/core';

import * as p5 from 'p5';

@Injectable()
export class FireworksService {
  run = (element: ElementRef, width: number, height: number): p5 => {
    const fireworks = new Array<Firework>();
    const gravity = new p5.Vector();

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
        s.colorMode(s.HSB, 360, 100, 100, 255);
        s.stroke(255);
        s.strokeWeight(4);
        s.background(0);

        gravity.set(0, s.map(s.height, 100, 1440, 0.2, 0.005));
      }

      s.draw = () => {
        s.blendMode(s.BLEND);
        s.background(0, 25);
        s.blendMode(s.ADD);

        if (s.random(1) < 0.03) {
          fireworks.push(new Firework(
            s.random(width),
            height,
            s.random(360),
            s,
            gravity
          ));
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {
          fireworks[i].update();
          fireworks[i].show(s);

          if (fireworks[i].done())
            fireworks.splice(i, 1);
        }
      }
    }, element.nativeElement);
  }
}

class Particle extends p5.Vector {
  hue: number = 0;
  lifespan: number = 255;
  vel = new p5.Vector();
  acc = new p5.Vector();
  rocket = false;

  constructor(x: number, y: number, hue: number, s: p5, rocket: boolean) {
    super();
    this.set(x, y);
    this.hue = hue;
    this.rocket = rocket;

    if (this.rocket) {
      this.vel.set(0, s.random(-10, -6));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(s.random(2, 10));
    }
  }

  applyForce = (force: p5.Vector) => this.acc.add(force);

  update = () => {
    if (!this.rocket) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }

    this.vel.add(this.acc);
    this.add(this.vel);
    this.acc.mult(0);
  }

  done = () => this.lifespan < 0
    ? true
    : false;

  show = (s: p5) => {
    if (!this.rocket) {
      s.strokeWeight(2);
      s.stroke(this.hue, 100, 100, this.lifespan);
    } else {
      s.strokeWeight(4);
      s.stroke(this.hue, 100, 100, 255);
    }

    s.point(this.x, this.y);
  }
}

class Firework {
  exploded = false;
  rocket: Particle;
  particles = new Array<Particle>();
  gravity = new p5.Vector();
  s: p5;

  constructor(x: number, y: number, hue: number, s: p5, gravity: p5.Vector) {
    this.rocket = new Particle(x, y, hue, s, true);
    this.gravity = gravity;
    this.s = s;
  }

  done = () => this.exploded && this.particles.length === 0
    ? true
    : false;

  explode = () => {
    const multi = this.s.random(1) < 0.2;

    for (var i = 0; i < 100; i++) {
      const p = new Particle(
        this.rocket.x,
        this.rocket.y,
        multi
          ? this.s.random(360)
          : this.rocket.hue,
        this.s,
        false
      );

      this.particles.push(p);
    }
  }

  update = () => {
    if (!this.exploded) {
      this.rocket.applyForce(this.gravity);
      this.rocket.update();

      if (this.rocket.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(this.gravity);
      this.particles[i].update();

      if (this.particles[i].done())
        this.particles.splice(i, 1);
    }
  }

  show = (s: p5) => {
    if (!this.exploded)
      this.rocket.show(s);

    this.particles.forEach(p => p.show(s));
  }
}
