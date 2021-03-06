import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Product } from '../../../../product/-model/product';

@Pipe({
  name: 'product',
})
export class ProductPipe implements PipeTransform {

  transform(formControl: AbstractControl): Product {
    return formControl.value as Product;
  }

}
