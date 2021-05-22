import { Component } from '@angular/core';
import { Link } from '../../models';

@Component({
  selector: 'home-route',
  templateUrl: 'home.route.html'
})
export class HomeRoute {
  links: Array<Link> = [
    { url: 'pixel-array', label: 'Pixel Array' },
    { url: 'noise', label: 'Perlin Noise' },
    { url: 'introduction', label: 'Nature of Code: Introduction' },
    { url: 'vectors', label: 'Nature of Code: Vectors' },
    { url: 'forces', label: 'Nature of Code: Forces' }
  ]
}
