import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../../../shared/model/domain/product';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'product',
})
export class ProductPipe implements PipeTransform {
  transform(formControl: AbstractControl): Product {
    return formControl.value as Product;
  }
}
