import { Component } from '@angular/core';
import { Attribution } from '../../models';
import { FireworksService } from '../../services';

@Component({
  selector: 'fireworks-route',
  templateUrl: 'fireworks.route.html',
  providers: [FireworksService]
})
export class FireworksRoute {
  attribution: Attribution = {
    title: 'Challenge: Fireworks',
    link: {
      url: 'https://www.youtube.com/watch?v=CKeyIbT3vXI',
      label: 'The Coding Train Challenge: Fireworks'
    }
  }

  constructor(
    public fireworks: FireworksService
  ) { }
}
