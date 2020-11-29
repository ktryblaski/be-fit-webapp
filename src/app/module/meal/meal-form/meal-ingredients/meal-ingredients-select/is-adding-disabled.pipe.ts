import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../../product/-model/product';

@Pipe({
  name: 'isAddingDisabled',
})
export class IsAddingDisabledPipe implements PipeTransform {
  transform(value: any): boolean {
    return !(value && typeof value === 'object' && (value as Product).id);
  }
}
