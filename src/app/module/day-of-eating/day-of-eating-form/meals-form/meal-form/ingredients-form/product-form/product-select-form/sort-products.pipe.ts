import { Pipe, PipeTransform } from '@angular/core';
import { stringCompare } from '../../../../../../../../shared/util/commons';
import { Product } from '../../../../../../../product/-model/product';

@Pipe({
  name: 'sortProducts',
})
export class SortProductsPipe implements PipeTransform {
  transform(products: Product[]): Product[] {
    return [...products].sort(this.compare);
  }

  private compare(a: Product, b: Product): number {
    return stringCompare(a.name, b.name);
  }
}
