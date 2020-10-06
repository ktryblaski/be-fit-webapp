import { Pipe, PipeTransform } from '@angular/core';
import { DayOfEatingLite } from '../../../../shared/model/domain/day-of-eating';
import * as moment from 'moment';

@Pipe({
  name: 'isToday'
})
export class IsTodayPipe implements PipeTransform {

  transform(dayOfEating: DayOfEatingLite): boolean {
    return moment(dayOfEating.dayDate).isSame(moment(), 'day');
  }

}
