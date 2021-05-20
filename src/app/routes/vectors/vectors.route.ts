import { Component } from '@angular/core';
import { Attribution } from 'core';
import { VectorService } from '../../services';

@Component({
  selector: 'vectors-route',
  templateUrl: 'vectors.route.html',
  providers: [VectorService]
})
export class VectorsRoute {
  attribution: Attribution = {
    title: 'Vectors',
    link: {
      url: 'https://natureofcode.com/book/chapter-1-vectors/',
      label: 'Nature of Code: Vectors'
    }
  }

  constructor(
    public vector: VectorService
  ) { }
}
