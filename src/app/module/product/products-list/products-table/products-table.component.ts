import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../shared/model/domain/product";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {

  @Input() products: Product[]

  @Output() clickId: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  handleClickId(id: number) {
    this.clickId.next(id);
  }

}
