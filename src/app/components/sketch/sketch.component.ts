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
  @Input() init!: (element: ElementRef<HTMLElement>, width: number, height: number) => p5;
  @Input() title = 'Title';
  @Input() sketchStyle = 'm4 p8 rounded elevated card-outline-accent';
  @Input() width = 320;
  @Input() height = 240;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.sketch = this.init(this.canvas, this.width, this.height);
  }

  ngOnDestroy() {
    this.sketch.remove();
  }

  refresh = () => {
    this.sketch.remove();
    this.sketch = this.init(this.canvas, this.width, this.height);
  }
}
