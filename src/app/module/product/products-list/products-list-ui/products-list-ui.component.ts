import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../shared/model/domain/product";

@Component({
  selector: 'app-products-list-ui',
  templateUrl: './products-list-ui.component.html',
  styleUrls: ['./products-list-ui.component.scss']
})
export class ProductsListUiComponent {

  @Input() products: Product[]
  @Output() clickId: EventEmitter<number> = new EventEmitter<number>();

  handleClickId(id: number) {
    this.clickId.next(id);
  }

}
