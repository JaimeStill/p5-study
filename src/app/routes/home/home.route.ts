import { Component } from '@angular/core';
import { Link } from 'core';

@Component({
  selector: 'home-route',
  templateUrl: 'home.route.html'
})
export class HomeRoute {
  links: Array<Link> = [
    { url: 'pixel-array', label: 'Pixel Array' },
    { url: 'noise', label: 'Perlin Noise' },
    { url: 'introduction', label: 'Nature of Code: Introduction' }
  ]
}
