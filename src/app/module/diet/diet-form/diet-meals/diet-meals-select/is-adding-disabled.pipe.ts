import { Pipe, PipeTransform } from '@angular/core';
import { MealView } from '../../../../../shared/model/domain/meal';

@Pipe({
  name: 'isAddingDisabled',
})
export class IsAddingDisabledPipe implements PipeTransform {
  transform(value: any): boolean {
    return !(value && typeof value === 'object' && (value as MealView).id);
  }
}
