import {
  Component,
  Input
} from '@angular/core';

import { Attribution } from '../../models';

@Component({
  selector: 'attribution-card',
  templateUrl: 'attribution-card.component.html'
})
export class AttributionCardComponent {
  @Input() attribution: Attribution = { } as Attribution;
  @Input() size = 436;
}
