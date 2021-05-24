import {
  Injectable,
  ElementRef
} from '@angular/core';

import {
  fromEvent,
  BehaviorSubject,
  Observable
} from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  map
} from 'rxjs/operators';

import { Link } from '../models';

@Injectable()
export class AppService {
  private links: Array<Link> = [
    { url: 'pixel-array', label: 'Pixel Array' },
    { url: 'noise', label: 'Perlin Noise' },
    { url: 'introduction', label: 'Nature of Code: Introduction' },
    { url: 'vectors', label: 'Nature of Code: Vectors' },
    { url: 'forces', label: 'Nature of Code: Forces' },
    { url: 'oscillation', label: 'Nature of Code: Oscillation' },
    { url: 'fireworks', label: 'Challenge: Fireworks' }
  ]

  private linkStream = new BehaviorSubject<Array<Link>>(this.links);
  links$ = this.linkStream.asObservable();

  searchLinks = (search: string) => search
    ? this.linkStream.next(
        this.links.filter((link: Link) => link.label.toLowerCase().includes(search.toLowerCase()))
      )
    : this.linkStream.next(this.links)

  generateInputObservable = (input: ElementRef): Observable<string> =>
    fromEvent(input.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        map((event: any) => event.target.value),
        distinctUntilChanged()
      )
}
