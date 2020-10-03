import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../../../../../../shared/model/domain/product';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: Product[], chosen: string | Product): Product[] {
    if (typeof chosen !== 'string' || chosen.trim() === '') {
      return [...products];
    }

    return [...products].filter(p => p.name.toLowerCase().indexOf(chosen.trim().toLowerCase()) !== -1);
  }

}
