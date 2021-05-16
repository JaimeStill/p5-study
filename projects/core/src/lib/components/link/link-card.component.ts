import {
  Component,
  Input
} from '@angular/core';

import { Link } from '../../models';

@Component({
  selector: 'link-card',
  templateUrl: 'link-card.component.html'
})
export class LinkCardComponent {
  @Input() link: Link = { } as Link;
  @Input() size = 120;
}
