import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notEmptyWeight'
})
export class NonEmptyWeightPipe implements PipeTransform {

  transform(weight: number | null): number {
    return weight ?? 0;
  }

}
