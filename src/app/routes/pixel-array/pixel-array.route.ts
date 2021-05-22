import { Component } from '@angular/core';
import { Attribution } from '../../models';
import { PixelService } from '../../services';

@Component({
  selector: 'pixel-array-route',
  templateUrl: 'pixel-array.route.html',
  providers: [PixelService]
})
export class PixelArrayRoute {
  attribution: Attribution = {
    title: 'The Pixel Array',
    link: {
      url: 'https://www.youtube.com/watch?v=nMUMZ5YRxHI',
      label: 'The Coding Train - The Pixel Array'
    }
  }

  constructor(
    public pixel: PixelService
  ) { }
}
