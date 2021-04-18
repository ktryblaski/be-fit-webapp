import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canMoveDown',
})
export class CanMoveDownPipe implements PipeTransform {
  transform(idx: number, mealsNumber: number): boolean {
    return idx !== mealsNumber - 1;
  }
}
