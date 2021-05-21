import {
  Injectable,
  ElementRef
} from '@angular/core';

import * as p5 from 'p5';

@Injectable()
export class ForceService {
  bounce = (element: ElementRef, width: number, height: number): p5 => {
    class Mover {
      position = new p5.Vector();
      velocity = new p5.Vector();
      acceleration = new p5.Vector();
      mass = 2;
      size = 8;

      constructor() {
        this.position.set(30, 30);
        this.velocity.set(0, 0);
        this.acceleration.set(0, 0);
      }

      applyForce = (force: p5.Vector) => {
        const f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
      }

      update = () => {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      display = (s: p5) => {
        s.stroke(0);
        s.fill(127);
        s.ellipse(
          this.position.x,
          this.position.y,
          this.size,
          this.size
        );
      }

      checkEdges = () => {
        if (this.position.x > width - this.size / 2) {
          this.position.x = width - this.size / 2;
          this.velocity.x *= -1;
        } else if (this.position.x < this.size / 2) {
          this.velocity.x *= -1;
          this.position.x = this.size / 2;
        }

        if (this.position.y > height - this.size / 2) {
          this.velocity.y *= -1;
          this.position.y = height - this.size / 2;
        }
      }
    }

    const m = new Mover();
    const wind = new p5.Vector();
    const gravity = new p5.Vector();
    let xoff = 0;

    return new p5((s: p5) => {
      const setupWindMagnitude = () => {
        const windMag = s.map(wind.x, 0, 0.05, 0, width);
        s.rect(0, 0, windMag, 4);
        s.fill(51);
        s.noStroke();
        s.text('Wind Force Magnitude', 4, 20);
      }

      const adjustWind = () => {
        wind.x = s.map(s.noise(xoff), 0, 1, 0, 0.05);
        xoff += 0.01;
        setupWindMagnitude();
      }

      s.setup = () => {
        s.createCanvas(width, height);
        wind.set(0, 0);
        gravity.set(0, 0.5);
      }

      s.draw = () => {
        s.background(255);
        adjustWind();

        m.applyForce(wind);
        m.applyForce(gravity);

        m.update();
        m.display(s);
        m.checkEdges();
      }
    }, element.nativeElement);
  }

  bounceMultiple = (element: ElementRef, width: number, height: number): p5 => {
    class Mover {
      position = new p5.Vector();
      velocity = new p5.Vector();
      acceleration = new p5.Vector();
      mass: number = 0;
      size: number = 0;

      constructor(x: number, y: number, m: number) {
        this.position.set(x, y);
        this.velocity.set(0, 0);
        this.acceleration.set(0, 0);
        this.mass = m;
        this.size = m * 2;
      }

      applyForce = (force: p5.Vector) => {
        const f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
      }

      update = () => {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      display = (s: p5) => {
        s.stroke(0);
        s.fill(127);
        s.ellipse(
          this.position.x,
          this.position.y,
          this.size,
          this.size
        );
      }

      checkEdges = () => {
        if (this.position.x > width - this.size / 2) {
          this.position.x = width - this.size / 2;
          this.velocity.x *= -1;
        } else if (this.position.x < this.size / 2) {
          this.velocity.x *= -1;
          this.position.x = this.size / 2;
        }

        if (this.position.y > height - this.size / 2) {
          this.velocity.y *= -1;
          this.position.y = height - this.size / 2;
        }
      }
    }

    const wind = new p5.Vector();
    const gravity = new p5.Vector();
    let movers: Array<Mover>;
    let xoff = 0;

    return new p5((s: p5) => {
      const generateMover = () => new Mover(
        30, 30,
        s.random(2, 11)
      );

      const initMovers = () => {
        movers = new Array<Mover>();

        for (let i = 0; i < 60; i++)
          movers.push(generateMover());
      }

      const setupWindMagnitude = () => {
        const windMag = s.map(wind.x, 0, 0.05, 0, width);
        s.rect(0, 0, windMag, 4);
        s.fill(51);
        s.noStroke();
        s.text('Wind Force Magnitude', 4, 20);
      }

      const adjustWind = () => {
        wind.x = s.map(s.noise(xoff), 0, 1, 0, 0.05);
        xoff += 0.01;
        setupWindMagnitude();
      }

      s.setup = () => {
        s.createCanvas(width, height);
        initMovers();
        wind.set(0, 0);
        gravity.set(0, 0.3);
      }

      s.draw = () => {
        s.background(255);
        adjustWind();

        movers.forEach(mover => {
          mover.applyForce(wind);
          mover.applyForce(gravity);

          mover.update();
          mover.display(s);
          mover.checkEdges();
        })
      }
    }, element.nativeElement);
  }

  massGravity = (element: ElementRef, width: number, height: number): p5 => {
    class Mover {
      position = new p5.Vector();
      velocity = new p5.Vector();
      acceleration = new p5.Vector();
      mass: number = 0;
      size: number = 0;

      constructor(x: number, y: number, m: number) {
        this.position.set(x, y);
        this.velocity.set(0, 0);
        this.acceleration.set(0, 0);
        this.mass = m;
        this.size = m * 2;
      }

      applyForce = (force: p5.Vector) => {
        const f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
      }

      update = () => {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      display = (s: p5) => {
        s.stroke(0);
        s.fill(127);
        s.ellipse(
          this.position.x,
          this.position.y,
          this.size,
          this.size
        );
      }

      checkEdges = () => {
        if (this.position.x > width - this.size / 2) {
          this.position.x = width - this.size / 2;
          this.velocity.x *= -1;
        } else if (this.position.x < this.size / 2) {
          this.velocity.x *= -1;
          this.position.x = this.size / 2;
        }

        if (this.position.y > height - this.size / 2) {
          this.velocity.y *= -1;
          this.position.y = height - this.size / 2;
        }
      }
    }

    const wind = new p5.Vector();
    const gravity = new p5.Vector();
    let movers: Array<Mover>;
    let xoff = 0;

    return new p5((s: p5) => {
      const generateMover = () => new Mover(
        30, 30,
        s.random(2, 11)
      );

      const initMovers = () => {
        movers = new Array<Mover>();

        for (let i = 0; i < 12; i++)
          movers.push(generateMover());
      }

      const setupWindMagnitude = () => {
        const windMag = s.map(wind.x, 0, 0.05, 0, width);
        s.rect(0, 0, windMag, 4);
        s.fill(51);
        s.noStroke();
        s.text('Wind Force Magnitude', 4, 20);
      }

      const adjustWind = () => {
        wind.x = s.map(s.noise(xoff), 0, 1, 0, 0.05);
        xoff += 0.01;
        setupWindMagnitude();
      }

      const adjustGravity = (mass: number) =>
        gravity.y = 0.3 * mass;

      s.setup = () => {
        s.createCanvas(width, height);
        initMovers();
        wind.set(0, 0);
        gravity.set(0, 0.3);
      }

      s.draw = () => {
        s.background(255);
        adjustWind();

        movers.forEach(mover => {
          adjustGravity(mover.mass);
          mover.applyForce(wind);
          mover.applyForce(gravity);

          mover.update();
          mover.display(s);
          mover.checkEdges();
        })
      }
    }, element.nativeElement);
  }

  friction = (element: ElementRef, width: number, height: number): p5 => {
    class Mover {
      position = new p5.Vector();
      velocity = new p5.Vector();
      acceleration = new p5.Vector();
      mass: number = 0;
      size: number = 0;

      constructor(x: number, y: number, m: number) {
        this.position.set(x, y);
        this.velocity.set(0, 0);
        this.acceleration.set(0, 0);
        this.mass = m;
        this.size = m * 2;
      }

      applyForce = (force: p5.Vector) => {
        const f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
      }

      update = () => {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      display = (s: p5) => {
        s.stroke(0);
        s.fill(127);
        s.ellipse(
          this.position.x,
          this.position.y,
          this.size,
          this.size
        );
      }

      checkEdges = () => {
        if (this.position.x > width - this.size / 2) {
          this.position.x = width - this.size / 2;
          this.velocity.x *= -1;
        } else if (this.position.x < this.size / 2) {
          this.velocity.x *= -1;
          this.position.x = this.size / 2;
        }

        if (this.position.y > height - this.size / 2) {
          this.velocity.y *= -1;
          this.position.y = height - this.size / 2;
        }
      }
    }

    const wind = new p5.Vector();
    const gravity = new p5.Vector();
    let movers: Array<Mover>;
    let xoff = 0;

    return new p5((s: p5) => {
      const generateMover = () => new Mover(
        30, 30,
        s.random(2, 11)
      );

      const initMovers = () => {
        movers = new Array<Mover>();

        for (let i = 0; i < 12; i++)
          movers.push(generateMover());
      }

      const setupWindMagnitude = () => {
        const windMag = s.map(wind.x, 0, 0.05, 0, width);
        s.rect(0, 0, windMag, 4);
        s.fill(51);
        s.noStroke();
        s.text('Wind Force Magnitude', 4, 20);
      }

      const adjustWind = () => {
        wind.x = s.map(s.noise(xoff), 0, 1, 0, 0.05);
        xoff += 0.01;
        setupWindMagnitude();
      }

      const adjustGravity = (mass: number) =>
        gravity.y = 0.3 * mass;

      const getFriction = (v: p5.Vector): p5.Vector => {
        const c = 0.05;
        const friction = s.createVector(v.x, v.y);
        friction.mult(-1);
        friction.normalize();
        friction.mult(c);
        return friction;
      }

      s.setup = () => {
        s.createCanvas(width, height);
        initMovers();
        wind.set(0, 0);
        gravity.set(0, 0.3);
      }

      s.draw = () => {
        s.background(255);
        adjustWind();

        movers.forEach(mover => {
          const f = getFriction(mover.velocity);
          adjustGravity(mover.mass);
          mover.applyForce(f);
          mover.applyForce(wind);
          mover.applyForce(gravity);

          mover.update();
          mover.display(s);
          mover.checkEdges();
        })
      }
    }, element.nativeElement);
  }

  fluidResistance = (element: ElementRef, width: number, height: number): p5 => {
    class Mover {
      position = new p5.Vector();
      velocity = new p5.Vector();
      acceleration = new p5.Vector();
      mass: number = 0;

      constructor(x: number, y: number, m: number) {
        this.position.set(x, y);
        this.velocity.set(0, 0);
        this.acceleration.set(0, 0);
        this.mass = m;
      }

      applyForce = (force: p5.Vector) => {
        const f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
      }

      update = () => {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      display = (s: p5) => {
        s.stroke(0);
        s.strokeWeight(2);
        s.fill(127, 200);

        s.ellipse(
          this.position.x,
          this.position.y,
          this.mass * 8,
          this.mass * 8
        )
      }

      checkEdges = () => {
        if (this.position.y > height - (this.mass * 8) / 2) {
          this.velocity.y *= -0.9;
          this.position.y = height - (this.mass * 8) / 2;
        }
      }
    }

    class Liquid {
      x: number = 0;
      y: number = 0;
      w: number = 0;
      h: number = 0;
      c: number = 0;

      constructor(
        x: number,
        y: number,
        w: number,
        h: number,
        c: number
      ) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
      }

      contains = (mover: Mover) => {
        const l = mover.position;

        return l.x > this.x
          && l.x < this.x + this.w
          && l.y > this.y
          && l.y < this.y + this.h;
      }

      drag = (mover: Mover): p5.Vector => {
        const speed = mover.velocity.mag();
        const dragMag = this.c * speed * speed;

        const dragForce = new p5.Vector()
          .set(
            mover.velocity.x,
            mover.velocity.y
          );

        dragForce.mult(-1);
        dragForce.normalize();
        dragForce.mult(dragMag);

        return dragForce;
      }

      display(s: p5) {
        s.noStroke();
        s.fill(0, 160, 255, 180);
        s.rect(this.x, this.y, this.w, this.h);
      }
    }

    const gravity = new p5.Vector();
    let movers: Array<Mover>;
    let liquid: Liquid;

    return new p5((s: p5) => {
      const initLiquid = () => liquid = new Liquid(
        0,
        height / 2,
        width,
        height / 2,
        0.1
      );

      const generateMover = (i: number) => new Mover(
        20 + i * 35,
        0,
        s.random(0.5, 3)
      );

      const initMovers = () => {
        movers = new Array<Mover>();

        for (let i = 0; i < 9; i++)
          movers.push(generateMover(i));
      }

      const adjustGravity = (mass: number) =>
        gravity.y = 0.3 * mass;

      s.setup = () => {
        initLiquid();
        initMovers();
        const canvas = s.createCanvas(width, height);
        canvas.mousePressed(initMovers);
        gravity.set(0, 0.3);
      }

      s.draw = () => {
        s.background(255);
        liquid.display(s);

        movers.forEach(mover => {
          if (liquid.contains(mover))
            mover.applyForce(liquid.drag(mover));

          adjustGravity(mover.mass);
          mover.applyForce(gravity);

          mover.update();
          mover.display(s);
          mover.checkEdges();
        })
      }
    }, element.nativeElement);
  }
}
