import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm.dialog.html'
})
export class ConfirmDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }
  ) { }

  ngOnInit() {
    if (this.data) {
      this.data.title = this.data.title
        ? this.data.title
        : 'Confirm Action?';

      this.data.content = this.data.content
        ? this.data.content
        : 'Are you sure you would like to perform this action?';
    } else {
      this.data = {
        title: 'Confirm Action?',
        content: 'Are you sure you would like to perform this action?'
      };
    }
  }
}
