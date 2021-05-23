import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

import { Subscription } from 'rxjs';
import { AppService } from '../../services';

@Component({
  selector: 'home-route',
  templateUrl: 'home.route.html',
  providers: [AppService]
})
export class HomeRoute implements AfterViewInit, OnDestroy {
  private sub!: Subscription;

  constructor(
    public app: AppService
  ) { }

  @ViewChild('search', { static: false }) search!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.sub = this.app.generateInputObservable(this.search)
      .subscribe(value => this.app.searchLinks(value))
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
