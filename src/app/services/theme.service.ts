import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable()
export class ThemeService {
  isDark = false;

  toggleTheme = () => {
    this.isDark = !this.isDark;
    this.setOverlayContainerTheme();
  }

  constructor(
    private overlay: OverlayContainer
  ) {
    this.setOverlayContainerTheme();
  }

  setOverlayContainerTheme = () => {
    if (this.isDark) {
      this.overlay.getContainerElement().classList.remove('app-light');
      this.overlay.getContainerElement().classList.add('app-dark');
    } else {
      this.overlay.getContainerElement().classList.remove('app-dark');
      this.overlay.getContainerElement().classList.add('app-light');
    }
  }
}
