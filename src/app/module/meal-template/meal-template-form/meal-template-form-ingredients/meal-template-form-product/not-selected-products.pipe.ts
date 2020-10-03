import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../../../../../shared/model/domain/product';

@Pipe({
  name: 'notSelectedProducts'
})
export class NotSelectedProductsPipe implements PipeTransform {

  transform(products: Product[], selectedProducts: number[]): Product[] {
    return products.filter(product => selectedProducts.indexOf(product.id) === -1);
  }

}
