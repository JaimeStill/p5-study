import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { Components } from './components';
import { Dialogs } from './dialogs';
import { Directives } from './directives';
import { Pipes } from './pipes';

@NgModule({
  declarations: [
    ...Components,
    ...Dialogs,
    ...Directives,
    ...Pipes
  ],
  imports: [
    MaterialModule,
    RouterModule
  ],
  exports: [
    ...Components,
    ...Dialogs,
    ...Directives,
    ...Pipes,
    MaterialModule
  ]
})
export class CoreModule { }
