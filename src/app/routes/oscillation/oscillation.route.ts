import { Component } from '@angular/core';
import { Attribution } from '../../models';
import { OscillationService } from '../../services';

@Component({
  selector: 'oscillation-route',
  templateUrl: 'oscillation.route.html',
  providers: [OscillationService]
})
export class OscillationRoute {
  attribution = {
    title: 'Oscillation',
    link: {
      url: 'https://natureofcode.com/book/chapter-3-oscillation/',
      label: 'Nature of Code: Oscillation'
    }
  } as Attribution;

  constructor(
    public oscillation: OscillationService
  ) { }
}
