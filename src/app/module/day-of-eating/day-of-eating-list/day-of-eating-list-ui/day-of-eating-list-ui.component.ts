import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DayOfEatingLite } from '../../../../shared/model/domain/day-of-eating';

@Component({
  selector: 'app-day-of-eating-list-ui',
  templateUrl: './day-of-eating-list-ui.component.html',
  styleUrls: ['./day-of-eating-list-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayOfEatingListUiComponent {

  readonly DATE_FORMAT = 'dd-MM-yyy';

  @Input() daysOfEating: DayOfEatingLite[];
  @Output() clickRow = new EventEmitter<DayOfEatingLite>();

  handleClick(dayOfEating: DayOfEatingLite): void {
    this.clickRow.next(dayOfEating);
  }
}
