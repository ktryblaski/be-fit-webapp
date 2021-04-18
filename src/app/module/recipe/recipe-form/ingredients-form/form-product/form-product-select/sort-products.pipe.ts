import { Pipe, PipeTransform } from '@angular/core';
import { stringCompare } from '../../../../../../shared/util/commons';
import { ProductLite } from '../../../../../product/-model/product-lite';

@Pipe({
  name: 'sortProducts',
})
export class SortProductsPipe implements PipeTransform {

  transform(products: ProductLite[]): ProductLite[] {
    return [...products].sort(this.compare);
  }

  private compare(a: ProductLite, b: ProductLite): number {
    return stringCompare(a.name, b.name);
  }

}
