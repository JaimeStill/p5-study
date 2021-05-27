import {
  AfterViewInit,
  OnDestroy,
  Component,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { SketchDialog } from '../../dialogs';

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

  constructor(
    private dialog: MatDialog
  ) { }

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

  expand = () => this.dialog.open(SketchDialog, {
    data: {
      init: this.init,
      width: 1000 > window.innerWidth - 100 ? window.innerWidth - 100 : 1000,
      height: 720 > window.innerHeight - 100 ? window.innerHeight - 100 : 720,
      title: this.title
    }
  })
}
