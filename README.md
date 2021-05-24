# p5.js Study

* https://jaimestill.github.io/p5-study/
* https://p5js.org/
* https://thecodingtrain.com/



## p5 Integration

### [sketch.component.html](https://github.com/JaimeStill/p5-study/blob/main/src/app/components/sketch/sketch.component.html)

A `<section ... #canvas>` element is created to manage the lifecycle of the **p5** generated `<canvas>`.

```html
<section fxLayout="column"
         [ngClass]="sketchStyle">
  <section fxLayout="row"
           fxLayoutAlign="space-between center">
    <p class="mat-title m8">{{title}}</p>
    <button mat-icon-button class="m8" (click)="refresh()">
      <mat-icon>replay</mat-icon>
    </button>
  </section>
  <section class="m8 elevated rounded"
           [style.width.px]="width"
           [style.height.px]="height"
           #canvas></section>
</section>
```

### [sketch.component.ts](https://github.com/JaimeStill/p5-study/blob/src/app/components/sketch/sketch.component.ts)

An `init: (element: ElementRef<HTMLElement>) => p5` function is input into the component. This function consists of the logic needed to generate a **p5** sketch.

In the `AfterViewInit()` lifecycle hook, sketch is initialized by passing the `<section #canvas>` element into the `init` function. The `sketch` field is used to maintain the lifecycle of the attached `<canvas>` element.

The sketch can be refreshed with the refresh button on the component. This removes the sketch, then reinitializes the `init` function.

> Calling `sketch.remove()` when the sketch is no longer needed is crucial for performance.

```ts
import {
  AfterViewInit,
  OnDestroy,
  Component,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import * as p5 from 'p5';

@Component({
  selector: 'sketch',
  templateUrl: 'sketch.component.html'
})
export class SketchComponent implements AfterViewInit, OnDestroy {
  private sketch!: p5;
  @Input() init!: (element: ElementRef<HTMLElement>) => p5;
  @Input() title = 'Title';
  @Input() sketchStyle = 'm4 p8 rounded elevated card-outline-accent';
  @Input() width = 320;
  @Input() height = 240;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.sketch = this.init(this.canvas);
  }

  ngOnDestroy() {
    this.sketch.remove();
  }

  refresh = () => {
    this.sketch.remove();
    this.sketch = this.init(this.canvas);
  }
}
```

### [noise.service.ts](https://github.com/JaimeStill/p5-study/blob/main/src/app/services/noise.service.ts)

Each service function is an independent **p5** sketch. The functions have the following characteristics:

* Receives an `element: ElementRef`, which **p5** attaches the generated `<canvas>` element to
* Returns the `p5` sketch

**Example Function**

```ts
  
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

  /* Additional functions */
}
```

### [noise-2d.route.html](https://github.com/JaimeStill/p5-study/blob/main/src/app/routes/noise/children/noise-2d.route.html)

The `noise2d()` function defined in `NoiseService` (see above) is provided to the `init` input property of the `<sketch>` component.

```html
<attribution-card [attribution]="attribution"></attribution-card>
<section fxLayout="row | wrap"
         fxLayoutAlign="start start">
  <sketch title="2D Noise"
          [init]="noise.noise2d"></sketch>
</section>
```

### [noise-2d.route.ts](https://github.com/JaimeStill/p5-study/blob/main/src/app/routes/noise/children/noise-2d.route.ts)

The `NoiseService` is registered with the route component's providers array for the purpose of initializing a `<sketch>` instance.

```ts  
import { Component } from '@angular/core';
import { Attribution } from '../../../models';
import { NoiseService } from '../../../services';

@Component({
  selector: 'noise-2d-route',
  templateUrl: 'noise-2d.route.html',
  providers: [ NoiseService ]
})
export class Noise2dRoute {
  attribution: Attribution = {
    title: '2D Noise',
    link: {
      url: 'https://thecodingtrain.com/learning/noise/0.5-2d-noise.html',
      label: 'The Coding Train - Perlin Noise Lesson #0.5'
    }
  } as Attribution;

  constructor(
    public noise: NoiseService
  ) { }
}
```
