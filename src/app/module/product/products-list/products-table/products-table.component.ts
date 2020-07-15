import {Component, Input} from '@angular/core';
import {Product} from "../../../../shared/model/domain/product";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {

  @Input()
  products: Product[]

  constructor() { }

}
