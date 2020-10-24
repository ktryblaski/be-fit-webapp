import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../shared/model/domain/product';

@Component({
  selector: 'app-products-list-ui',
  templateUrl: './products-list-ui.component.html',
  styleUrls: ['./products-list-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListUiComponent {
  @Input() products: Product[];
  @Output() clickId: EventEmitter<Product> = new EventEmitter<Product>();

  handleClick(product: Product) {
    this.clickId.next(product);
  }
}
