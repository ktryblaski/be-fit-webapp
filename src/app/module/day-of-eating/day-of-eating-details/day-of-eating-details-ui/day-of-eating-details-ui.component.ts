import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { DayOfEating } from '../../../../shared/model/domain/day-of-eating';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-day-of-eating-details-ui',
  templateUrl: './day-of-eating-details-ui.component.html',
  styleUrls: ['./day-of-eating-details-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayOfEatingDetailsUiComponent {

  @Input() dayOfEating: DayOfEating;
  @ViewChild(MatAccordion) accordion: MatAccordion;

}
