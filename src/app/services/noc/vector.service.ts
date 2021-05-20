import {
  Injectable,
  ElementRef
} from '@angular/core';

import * as p5 from 'p5';

@Injectable()
export class VectorService {
  noiseWalker = (element: ElementRef, width: number, height: number): p5 => {
    class Walker {
      position = new p5.Vector();
      offset = new p5.Vector();

      constructor(x: number, y: number) {
        this.position.set(x, y);
        this.offset.set(0, 10000);
      }

      display(s: p5) {
        s.colorMode(s.HSB, 360, 100, 100);

        const hue = s.map(this.position.x, 0, s.width, 0, 360);
        const saturation = s.map(this.position.y, 0, s.height, 30, 100);

        s.stroke(hue, saturation, 60);
        s.fill(hue, saturation, 100);
        s.ellipse(this.position.x, this.position.y, 8, 8);
      }

      step(s: p5) {
        this.position.x = s.map(s.noise(this.offset.x), 0, 1, 0, width);
        this.position.y = s.map(s.noise(this.offset.y), 0, 1, 0, height);

        this.offset.x += 0.01;
        this.offset.y += 0.01;
      }
    }

    const w = new Walker(width / 2, height / 2);

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
        s.background(0);
      }

      s.draw = () => {
        w.step(s);
        w.display(s);
      }
    }, element.nativeElement);
  }

  bouncingBall = (element: ElementRef, width: number, height: number): p5 => {
    let position = new p5.Vector().set(8, 8);
    let velocity = new p5.Vector().set(2, 3.5);

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
        s.colorMode(s.HSB, 360, 100, 100);
        s.background(255);
      }

      s.draw = () => {
        position.add(velocity);

        if ((position.x > width - 4) || (position.x < 4))
          velocity.x *= -1;

        if ((position.y > height - 4) || (position.y < 8))
          velocity.y *= -1;

        const hue = s.map(position.x, 0, s.width, 0, 360);
        const saturation = s.map(position.y, 0, s.height, 30, 100);

        s.stroke(0);
        s.fill(hue, saturation, 100);
        s.ellipse(position.x, position.y, 8, 8);
      }
    }, element.nativeElement);
  }

  magnitude = (element: ElementRef, width: number, height: number): p5 => {
    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
      }

      s.draw = () => {
        s.background(255);

        const mouse = new p5.Vector().set(s.mouseX, s.mouseY);
        const center = new p5.Vector().set(s.width / 2, s.height / 2);
        mouse.sub(center);

        const m = mouse.mag();
        s.fill(0);
        s.rect(0, 0, m, 10);

        s.translate(s.width / 2, s.height / 2);
        s.line(0, 0, mouse.x, mouse.y);
      }
    }, element.nativeElement);
  }

  normalization = (element: ElementRef, width: number, height: number): p5 => {
    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
      }

      s.draw = () => {
        s.background(255);

        const mouse = new p5.Vector().set(s.mouseX, s.mouseY);
        const center = new p5.Vector().set(s.width / 2, s.height / 2);
        mouse.sub(center);

        mouse.normalize();
        mouse.mult(50);

        s.translate(s.width / 2, s.height / 2);
        s.line(0, 0, mouse.x, mouse.y);
      }
    }, element.nativeElement);
  }

  velocity = (element: ElementRef, width: number, height: number): p5 => {
    class Mover {
      position = new p5.Vector();
      velocity = new p5.Vector();
      size: number = 0;
      xoff: number = 0;

      constructor(
        x: number, y: number,
        vx: number, vy: number,
        size: number, xoff: number
      ) {
        this.position.set(x, y);
        this.velocity.set(vx, vy);
        this.size = size;
        this.xoff = xoff;
      }

      setColor = (s: p5) => {
        const hue = s.map(s.noise(this.xoff), 0, 1, 0, 360);
        const saturation = s.map(this.position.y, 0, height, 30, 100);

        s.stroke(hue, saturation, 80);
        s.fill(hue, saturation, 100, 0.6);
      }

      update = () => this.position.add(this.velocity);

      display = (s: p5) => {
        this.setColor(s);
        s.ellipse(this.position.x, this.position.y, this.size, this.size);
        this.xoff += 0.01;
      }

      checkEdges = (s: p5) => {
        if (this.position.x > s.width)
          this.position.x = 0;
        else if (this.position.x < 0)
          this.position.x = width;

        if (this.position.y > height)
          this.position.y = 0;
        else if (this.position.y < 0)
          this.position.y = height;
      }
    }

    const movers = new Array<Mover>();
    const inc = 0.1;
    let daytime = true;
    let bright = 0;

    return new p5((s: p5) => {
      const createMover = () => new Mover(
        s.random(s.width),
        s.random(s.height),
        s.random(-2, 2),
        s.random(-2, 2),
        s.random(10, 40),
        s.random(0, 10000)
      );

      const generate = (count: number) => {
        for (let p = 0; p < count; p++) {
          movers.push(createMover());
        }
      }

      const setBackground = (s: p5) => {
        s.background(0, 0, bright);

        if (bright >= 100 && daytime) {
          daytime = false;
          bright -= inc;
        } else if (bright <= 0 && !daytime) {
          daytime = true;
          bright += inc;
        } else if (daytime)
          bright += inc;
        else
          bright -= inc;
      }

      s.setup = () => {
        s.createCanvas(width, height);
        s.colorMode(s.HSB, 360, 100, 100);
        generate(s.random(12, 28));
      }

      s.draw = () => {
        setBackground(s);

        movers.forEach(mover => {
          mover.update();
          mover.checkEdges(s);
          mover.display(s);
        });
      }
    }, element.nativeElement);
  }

  constantAcceleration = (element: ElementRef, width: number, height: number): p5 => {
    class Mover {
      position = new p5.Vector().set(width / 2, height / 2);
      velocity = new p5.Vector().set(0, 0);
      acceleration = new p5.Vector().set(-0.001, 0.01);

      update = () => {
        this.velocity.add(this.acceleration);
        this.velocity.limit(10);
        this.position.add(this.velocity);
      }

      display = (s: p5) => {
        s.stroke(255);
        s.fill(255);
        s.ellipse(this.position.x, this.position.y, 8, 8);
      }

      checkEdges = () => {
        if (this.position.x > width)
          this.position.x = 0;
        else if (this.position.x < 0)
          this.position.x = width;

        if (this.position.y > height)
          this.position.y = 0;
        else if (this.position.y < 0)
          this.position.y = height;
      }
    }

    const m = new Mover();

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
      }

      s.draw = () => {
        s.background(0);
        m.update();
        m.checkEdges();
        m.display(s);
      }
    }, element.nativeElement);
  }

  randomAcceleration = (element: ElementRef, width: number, height: number): p5 => {
    class Mover {
      position = new p5.Vector().set(width / 2, height / 2);
      velocity = new p5.Vector().set(0, 0);
      acceleration = p5.Vector.random2D();

      update = (s: p5) => {
        this.velocity.add(this.acceleration);
        this.velocity.limit(10);
        this.position.add(this.velocity);
        this.acceleration = p5.Vector.random2D();
        this.acceleration.mult(s.random(2));
      }

      display = (s: p5) => {
        s.stroke(255);
        s.fill(255);
        s.ellipse(this.position.x, this.position.y, 8, 8);
      }

      checkEdges = () => {
        if (this.position.x > width)
          this.position.x = 0;
        else if (this.position.x < 0)
          this.position.x = width;

        if (this.position.y > height)
          this.position.y = 0;
        else if (this.position.y < 0)
          this.position.y = height;
      }
    }

    const m = new Mover();

    return new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(width, height);
      }

      s.draw = () => {
        s.background(0);
        m.update(s);
        m.checkEdges();
        m.display(s);
      }
    }, element.nativeElement);
  }

  noiseAcceleration = (element: ElementRef, width: number, height: number): p5 => {
    class Mover {
      position = new p5.Vector().set(width / 2, height / 2);
      velocity = new p5.Vector().set(0, 0);
      acceleration = new p5.Vector();
      xoff = 0;
      yoff = 10000;

      constructor(s: p5) {
        this.setColor(s);
        this.setAcceleration(s);
      }

      setColor = (s: p5) => {
        const hue = s.map(s.noise(this.xoff), 0, 1, 0, 360);
        const saturation = s.map(s.noise(this.yoff), 0, 1, 20, 100);
        s.stroke(hue, saturation, 80);
        s.fill(hue, saturation, 100);
      }

      setAcceleration = (s: p5) => {
        this.xoff += 0.01;
        this.yoff += 0.01;

        this.acceleration.set(
          s.map(s.noise(this.xoff), 0, 1, -0.1, 0.1),
          s.map(s.noise(this.yoff), 0, 1, -0.1, 0.1)
        );
      }

      update = (s: p5) => {
        this.velocity.add(this.acceleration);
        this.velocity.limit(10);
        this.position.add(this.velocity);
        this.setAcceleration(s);
      }

      display = (s: p5) => {
        this.setColor(s);
        s.ellipse(this.position.x, this.position.y, 8, 8);
      }

      checkEdges = () => {
        if (this.position.x > width)
          this.position.x = 0;
        else if (this.position.x < 0)
          this.position.x = width;

        if (this.position.y > height)
          this.position.y = 0;
        else if (this.position.y < 0)
          this.position.y = height;
      }
    }

    return new p5((s: p5) => {
      let mover: Mover;

      s.setup = () => {
        s.createCanvas(width, height);
        s.colorMode(s.HSB, 360, 100, 100);
        mover = new Mover(s);
      }

      s.draw = () => {
        s.background(0);
        mover.update(s);
        mover.checkEdges();
        mover.display(s);
      }
    }, element.nativeElement);
  }

  mouseAcceleration = (element: ElementRef, width: number, height: number): p5 => {
    class Mover {
      position = new p5.Vector().set(width / 2, height / 2);
      velocity = new p5.Vector().set(0, 0);
      xoff = 0;
      yoff = 10000;
      size = 12;

      setColor = (s: p5) => {
        const hue = s.map(s.noise(this.xoff), 0, 1, 0, 360);
        const saturation = s.map(s.noise(this.yoff), 0, 1, 0, 100);
        s.stroke(hue, saturation, 80);
        s.fill(hue, saturation, 100);

        this.xoff += 0.01;
        this.yoff += 0.01;
      }

      update = (s: p5) => {
        const mouse = new p5.Vector().set(s.mouseX, s.mouseY);
        const dist = mouse.dist(this.position);

        if (dist > 0) {
          this.velocity.set(0, 0);
          const mag = s.map(dist, 0, 300, 1, 20);
          const dir = p5.Vector.sub(mouse, this.position);

          dir.normalize();
          dir.mult(mag);

          this.velocity.add(dir);
          this.velocity.limit(10);
          this.position.add(this.velocity);
        }
      }

      display = (s: p5) => {
        this.setColor(s);
        s.ellipse(this.position.x, this.position.y, this.size, this.size);
      }

      checkEdges = () => {
        if (this.position.x > width - this.size / 2)
          this.position.x = width - this.size / 2;
        else if (this.position.x < this.size / 2)
          this.position.x = this.size / 2;

        if (this.position.y > height - this.size / 2)
          this.position.y = height - this.size / 2;
        else if (this.position.y < this.size / 2)
          this.position.y = this.size / 2;
      }
    }
    return new p5((s: p5) => {
      let mover = new Mover();

      s.setup = () => {
        s.createCanvas(width, height);
        s.colorMode(s.HSB, 360, 100, 100);
      }

      s.draw = () => {
        s.background(0);
        mover.update(s);
        mover.checkEdges();
        mover.display(s);
      }
    }, element.nativeElement);
  }
}
