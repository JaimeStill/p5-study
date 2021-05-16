import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'core';
import { AppComponent } from './app.component';

import {
  RouteComponents,
  Routes
} from './routes';

@NgModule({
  declarations: [
    AppComponent,
    ...RouteComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
