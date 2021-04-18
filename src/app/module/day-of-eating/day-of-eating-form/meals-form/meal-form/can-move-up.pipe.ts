import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canMoveUp',
})
export class CanMoveUpPipe implements PipeTransform {
  transform(idx: number): boolean {
    return idx !== 0;
  }
}
