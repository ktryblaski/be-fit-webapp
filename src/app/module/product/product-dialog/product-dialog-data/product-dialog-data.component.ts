import {Component, Input} from '@angular/core';
import {Product} from "../../../../shared/model/domain/product";

@Component({
  selector: 'app-product-dialog-data',
  templateUrl: './product-dialog-data.component.html',
  styleUrls: ['./product-dialog-data.component.scss']
})
export class ProductDialogDataComponent {

  @Input()
  product: Product;

  constructor() { }

}
