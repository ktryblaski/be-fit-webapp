import { Pipe, PipeTransform } from '@angular/core';
import { DayOfEatingBeginFormDataSource } from './-shared/day-of-eating-begin-form-data-source';
import { DayOfEatingBeginOrigin } from '../../../../shared/model/dto/day-of-eating-begin-dto';

@Pipe({
  name: 'isCopyFormDateVisible'
})
export class IsCopyFormDateVisiblePipe implements PipeTransform {

  transform(origin: any, dataSource: DayOfEatingBeginFormDataSource): boolean {
    return dataSource.dayOfEatings.length > 0 && DayOfEatingBeginOrigin.AS_COPY === origin;
  }

}
