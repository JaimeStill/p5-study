import { Component } from '@angular/core';
import { Attribution } from 'core';
import { IntroService } from '../../services';

@Component({
  selector: 'intro-route',
  templateUrl: 'intro.route.html',
  providers: [IntroService]
})
export class IntroRoute {
  attribution: Attribution = {
    title: 'Introduction',
    link: {
      url: 'https://natureofcode.com/book/introduction/',
      label: 'Nature of Code - Introduction'
    }
  }

  constructor(
    public intro: IntroService
  ) { }
}
