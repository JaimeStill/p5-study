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
      const generateMover = (i: number) => new Mover(
        30, 30, i
      );

      const initMovers = () => {
        movers = new Array<Mover>();

        for (let i = 0; i < 6; i++)
          movers.push(generateMover((i + 2) * 2));
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
      const generateMover = (i: number) => new Mover(
        30, 30, i
      );

      const initMovers = () => {
        movers = new Array<Mover>();

        for (let i = 0; i < 6; i++)
          movers.push(generateMover((i + 2) * 2));
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
      const generateMover = (i: number) => new Mover(
        30, 30, i
      );

      const initMovers = () => {
        movers = new Array<Mover>();

        for (let i = 0; i < 6; i++)
          movers.push(generateMover((i + 2) * 2));
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
        const c = 0.07;
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
        gravity.y = 0.1 * mass;

      const drawLabel = () => {
        s.noStroke();
        s.fill(0);
        s.text('Click to reset', 8, 20);
      }

      s.setup = () => {
        initLiquid();
        initMovers();
        const canvas = s.createCanvas(width, height);
        canvas.mousePressed(initMovers);
        gravity.set(0, 0.1);
      }

      s.draw = () => {
        s.background(255);
        drawLabel();
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

  gravity = (element: ElementRef, width: number, height: number): p5 => {
    class Mover {
      position = new p5.Vector();
      velocity = new p5.Vector();
      acceleration = new p5.Vector();
      mass: number = 0;
      size: number = 0;

      constructor(x: number, y: number, m: number) {
        this.position.set(x, y);
        this.velocity.set(1, 0);
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
        s.fill(240, 240, 240, 255);

        s.ellipse(
          this.position.x,
          this.position.y,
          16, 16
        )

        s.fill(240, 240, 240, 120);

        s.ellipse(
          this.position.x,
          this.position.y,
          22, 22
        )
      }
    }

    class Attractor {
      mass = 20;
      g = 1;
      position = new p5.Vector();

      constructor() {
        this.position.set(width / 2, height / 2);
      }

      attract = (m: Mover, s: p5): p5.Vector => {
        const f = p5.Vector.sub(this.position, m.position);
        let distance = f.mag();
        distance = s.constrain(distance, 5, 25);

        f.normalize();
        const strength = (this.g * this.mass * m.mass) / (distance * distance);
        f.mult(strength);
        return f;
      }

      display = (s: p5) => {
        s.fill(80, 255, 80, 255);
        s.ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
        s.fill(40, 80, 255, 120);
        s.ellipse(this.position.x, this.position.y, this.mass * 2 + 10, this.mass * 2 + 10);
      }
    }

    let m: Mover;
    let a: Attractor;

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
        s.noStroke();
        m = new Mover(width / 2, height / 2 - 60, 1);
        a = new Attractor();
      }

      s.draw = () => {
        s.background(0);

        const f = a.attract(m, s);
        m.applyForce(f);
        m.update();

        a.display(s);
        m.display(s);
      }
    }, element.nativeElement);
  }

  movingAttractors = (element: ElementRef, width: number, height: number): p5 => {
    class Body {
      position = new p5.Vector();
      velocity = new p5.Vector();
      acceleration = new p5.Vector();
      id: number = 0;
      g: number = Math.floor(Math.random() * 4 + 1);
      mass: number = 0;
      size: number = 0;
      xoff: number = 0;
      seed: number = 0;
      hue: number = 0;

      constructor(id: number, x: number, y: number, mass: number, seed: number) {
        this.id = id;
        this.position.set(x, y);
        this.velocity.set(0, 0);
        this.acceleration.set(0, 0);
        this.mass = mass;
        this.size = mass * 4;
        this.seed = seed;
      }

      private setColor = (s: p5) => {
        s.noiseSeed(this.seed);
        this.hue = s.map(s.noise(this.xoff), 0, 1, 0, 360);
        s.fill(this.hue, 100, 100, 0.8);

        this.xoff += 0.01;
      }

      attract = (b: Body, s: p5): p5.Vector => {
        const f = p5.Vector.sub(this.position, b.position);
        let distance = f.mag();
        distance = s.constrain(distance, 5, 30);

        f.normalize();
        const strength = (this.g * this.mass * b.mass) / (distance * distance);
        f.mult(strength);
        return f;
      }

      applyForce = (force: p5.Vector, s: p5) => {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
      }

      update = (s: p5) => {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      display = (s: p5) => {
        this.setColor(s);

        s.ellipse(
          this.position.x,
          this.position.y,
          this.size - 8, this.size - 8
        )

        const shade = this.hue + 60 > 360
          ? this.hue + 60 - 360
          : this.hue + 60;

        s.fill(shade, 100, 100, 0.4);

        s.ellipse(
          this.position.x,
          this.position.y,
          this.size, this.size
        )
      }

      checkEdges = () => {
        if (this.position.x < this.size / 2)
          this.position.x = width - this.size / 2;
        else if (this.position.x > width - this.size / 2)
          this.position.x = this.size / 2;

        if (this.position.y < this.size / 2)
          this.position.y = height - this.size / 2;
        else if (this.position.y > height - this.size / 2)
          this.position.y = this.size / 2;
      }
    }

    let bodies: Array<Body>;

    return new p5((s: p5) => {
      const generateBody = (s: p5, id: number) => new Body(
        id,
        s.random(20, width - 19),
        s.random(20, height - 19),
        s.random(4, 13),
        s.random(0, 50000)
      );

      const initBodies = () => {
        bodies = new Array<Body>();

        for (let i = 0; i < 3; i++)
          bodies.push(generateBody(s, i + 1));
      }

      s.setup = () => {
        s.createCanvas(width, height);
        s.colorMode(s.HSB, 360, 100, 100);
        s.noStroke();
        initBodies();
      }

      s.draw = () => {
        s.background(0);

        bodies.forEach(body => {
          bodies
            .filter(b =>b.id !== body.id)
            .forEach(b => {
              const f = body.attract(b, s);
              b.applyForce(f, s);
            });

          body.update(s);
          body.display(s);
          body.checkEdges();
        })
      }
    }, element.nativeElement);
  }
}
