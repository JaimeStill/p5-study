import {
  Component,
  Inject,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as p5 from 'p5';

@Component({
  selector: 'sketch-dialog',
  templateUrl: 'sketch.dialog.html'
})
export class SketchDialog implements AfterViewInit, OnDestroy {
  private sketch!: p5;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      init: (element: ElementRef<HTMLElement>, width: number, height: number) => p5,
      title: 'Title'
    }
  ) { }

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.sketch = this.data.init(this.canvas, this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight);
  }

  ngOnDestroy() {
    this.sketch.remove();
  }

  refresh = () => {
    this.sketch.remove();
    this.sketch = this.data.init(this.canvas, this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight);
  }
}
