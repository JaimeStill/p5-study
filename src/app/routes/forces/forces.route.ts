import { Component } from '@angular/core';
import { Attribution } from '../../models';
import { ForceService } from '../../services';

@Component({
  selector: 'forces-route',
  templateUrl: 'forces.route.html',
  providers: [ForceService]
})
export class ForcesRoute {
  attribution = {
    title: 'Forces',
    link: {
      url: 'https://natureofcode.com/book/chapter-2-forces/',
      label: 'Nature of Code: Forces'
    }
  } as Attribution;

  constructor(
    public force: ForceService
  ) { }
}
