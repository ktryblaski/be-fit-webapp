import { Pipe, PipeTransform } from '@angular/core';
import { ProductLite } from '../../../../../product/-model/product-lite';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(products: ProductLite[], chosen: string | ProductLite): ProductLite[] {
    if (typeof chosen !== 'string' || chosen.trim() === '') {
      return [...products];
    }

    return products.filter(p => p.name.toLowerCase().indexOf(chosen.trim().toLowerCase()) !== -1);
  }
}
