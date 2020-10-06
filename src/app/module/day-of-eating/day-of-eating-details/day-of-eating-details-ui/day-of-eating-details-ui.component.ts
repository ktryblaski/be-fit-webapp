import { Component, Input } from '@angular/core';
import { DayOfEating } from '../../../../shared/model/domain/day-of-eating';

@Component({
  selector: 'app-day-of-eating-details-ui',
  templateUrl: './day-of-eating-details-ui.component.html',
  styleUrls: ['./day-of-eating-details-ui.component.scss']
})
export class DayOfEatingDetailsUiComponent {


  @Input() dayOfEating: DayOfEating;

}
